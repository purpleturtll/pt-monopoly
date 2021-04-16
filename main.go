package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"os/exec"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var (
	rooms    = []*Room{}
	upgrader = websocket.Upgrader{}
)

type msg struct {
	Value []byte `json:"value"`
}

type Client struct {
	room *Room
	conn *websocket.Conn
	Seat int8   `json:"seat"`
	Name string `json:"name"`
}

func (c *Client) listen() {
	msg := new(msg)
	for {
		err := c.conn.ReadJSON(msg)
		if err != nil {
			continue
		}
		c.room.Messages <- []byte(msg.Value)
	}
}

type Room struct {
	Name      string      `json:"name"`
	Password  string      `json:"-"`
	SitsTaken int8        `json:"sits_taken"`
	Clients   []*Client   `json:"-"`
	Messages  chan []byte `json:"-"`
}

func (r *Room) broadcast() {
	for {
		select {
		case value := <-r.Messages:
			for i := 0; i < len(r.Clients); i++ {
				r.Clients[i].conn.WriteJSON(msg{value})
			}
		}
	}
}

func enterRoom(c echo.Context, room *Room) error {
	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	client := &Client{room: room, conn: conn}
	client.room.Clients = append(client.room.Clients, client)
	go client.listen()
	go room.broadcast()
	return nil
}

func newRoom(c echo.Context) error {
	room := &Room{Name: fmt.Sprint(rand.Int()), Password: c.FormValue("password")}
	rooms = append(rooms, room)
	enterRoom(c, room)
	return nil
}

func getRooms(c echo.Context) error {
	v, err := json.Marshal(rooms)
	if err != nil {
		return err
	}
	return c.JSON(200, v)
}

func copyOutput(r io.Reader) {
	scanner := bufio.NewScanner(r)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}

func main() {
	cmd := exec.Command("npm", "run", "watch")
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		panic(err)
	}
	cmd.Dir = "./client"
	err = cmd.Start()
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Watcher running...")
	}
	go copyOutput(stdout)

	rooms = append(rooms, &Room{Name: "Testowy 1"}, &Room{Name: "Testowy 2"})

	e := echo.New()
	e.Static("/", "./client/public")
	e.POST("/room", newRoom)
	e.GET("/rooms", getRooms)
	e.Start("0.0.0.0:8080")
	exitCode := cmd.Wait()
	fmt.Println("Watcher shut down:", exitCode)
}
