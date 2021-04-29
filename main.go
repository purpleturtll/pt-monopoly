package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"
	"strings"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
)

type Msg struct {
	T    string          `json:"type"`
	Data json.RawMessage `json:"data"`
}

var (
	rooms    = []*Room{}
	upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}
)

type Client struct {
	room *Room           `json:"-"`
	conn *websocket.Conn `json:"-"`
	Seat int8            `json:"seat"`
	Name string          `json:"name"`
	ID   string          `json:"id"`
}

func (r *Room) deleteClient(id string) {
	i := 0
	for _, x := range r.Clients {
		if x.ID != id {
			r.Clients[i] = x
			i++
		}
	}
	r.Clients = r.Clients[:i]
	msg := &struct {
		Players []*Client `json:"players"`
	}{
		Players: r.Clients,
	}
	r.broadcast("players", msg)
}

func (c *Client) listen() {
	msg := new(Msg)
	fmt.Println("Client listening...")
	for {
		err := c.conn.ReadJSON(msg)
		if err != nil {
			// obsługa wyjścia danego klienta
			switch err.(type) {
			case *websocket.CloseError:
				fmt.Println("Client", c.Name, "left")
				c.room.deleteClient(c.ID)
				c.room.SitsTaken -= 1
			default:
				fmt.Println(err)
			}
			break
		}
		c.room.Messages <- *msg
	}
}

type Room struct {
	Name      string    `json:"name"`
	Password  string    `json:"-"`
	SitsTaken int8      `json:"sits_taken"`
	Clients   []*Client `json:"-"`
	Messages  chan Msg  `json:"-"`
}

func (r *Room) broadcast(t string, msg interface{}) {
	tempJson, err := json.Marshal(msg)
	if err != nil {
		fmt.Println(err)
	}
	typedMsg := Msg{t, tempJson}
	for i := 0; i < len(r.Clients); i++ {
		err := r.Clients[i].conn.WriteJSON(typedMsg)
		if err != nil {
			fmt.Println(err)
		}
	}
}

func (r *Room) listen() {
	for v := range r.Messages {
		switch v.T {
		case "ping":
			r.broadcast("pong", struct{}{})
		case "register_client":
			type registerClientMsg struct {
				Room string `json:"room"`
				Name string `json:"name"`
				ID   string `json:"id"`
			}
			data := registerClientMsg{}
			v.Data = v.Data[1:]
			v.Data = v.Data[:len(v.Data)-1]
			temp := strings.ReplaceAll(string(v.Data), "\\", "")
			err := json.Unmarshal([]byte(temp), &data)
			if err != nil {
				fmt.Println(err)
			}
			for i := 0; i < len(rooms); i++ {
				if rooms[i].Name == data.Room {
					if rooms[i].SitsTaken >= 4 {
						// TODO: wiadomosc dla klienta, ze pokoj jest pelny
						break
					}
					r.Clients[0].room = rooms[i]
					r.Clients[0].Name = data.Name
					rooms[i].Clients = append(rooms[i].Clients, r.Clients[0])
					rooms[i].newClient()
					break
				}
			}
		case "exit":
			type exitMsg struct {
				ID string `json:"id"`
			}
			data := exitMsg{}
			v.Data = v.Data[1:]
			v.Data = v.Data[:len(v.Data)-1]
			temp := strings.ReplaceAll(string(v.Data), "\\", "")
			err := json.Unmarshal([]byte(temp), &data)
			if err != nil {
				fmt.Println(err)
			}
			r.deleteClient(data.ID)
		}
	}
}

func (r *Room) newClient() {
	msg := &struct {
		Players []*Client `json:"players"`
	}{
		Players: r.Clients,
	}
	r.broadcast("players", msg)
	r.SitsTaken += 1
}

func ws(c echo.Context) error {
	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}

	//check if room exists in the future
	client := &Client{room: &Room{Name: "temp", Messages: make(chan Msg, 100)}, conn: conn}
	client.room.Clients = append(client.room.Clients, client)
	go client.listen()
	go client.room.listen()
	return nil
}

// func newRoom(c echo.Context) error {
// 	room := &Room{Name: fmt.Sprint(rand.Int()), Password: c.FormValue("password")}
// 	go room.broadcast()
// 	rooms = append(rooms, room)
// 	return nil
// }

func getRooms(c echo.Context) error {
	v, err := json.Marshal(rooms)
	if err != nil {
		return err
	}
	return c.JSON(200, string(v))
}

func newRoom(c echo.Context) error {
	name := c.Param("name")
	r := Room{Name: name}
	go r.listen()
	rooms = append(rooms, &r)
	return c.NoContent(http.StatusOK)
}

func main() {
	cmd := exec.Command("npm", "run", "watch")
	cmd.Dir = "./client"
	err := cmd.Start()
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Watcher running...")
	}

	e := echo.New()
	e.Use(middleware.Recover())
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{Format: "${host} ${method} ${path}\n"}))
	e.Logger.SetLevel(log.ERROR)
	e.Static("/", "./client/public")

	e.GET("/ws", ws)
	e.GET("/rooms", getRooms)
	e.POST("/room/:name", newRoom)

	e.Start("0.0.0.0:8080")
	exitCode := cmd.Wait()
	fmt.Println("Watcher shut down:", exitCode)
}
