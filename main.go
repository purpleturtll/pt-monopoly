package main

import (
	"fmt"
	"math/rand"
	"os"
	"os/exec"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var (
	rooms    = []*Room{}
	upgrader = websocket.Upgrader{}
)

type msg struct {
	value []byte `json:"value"`
}

type Client struct {
	room *Room
	conn *websocket.Conn
	seat int8
	name string
}

func (c *Client) listen() {
	msg := new(msg)
	for {
		err := c.conn.ReadJSON(msg)
		if err != nil {
			continue
		}
		c.room.messages <- []byte(msg.value)
	}
}

type Room struct {
	id       int
	password string
	capacity int8
	clients  []*Client
	messages chan []byte
}

func (r *Room) broadcast() {
	for {
		select {
		case value := <-r.messages:
			for i := 0; i < len(r.clients); i++ {
				r.clients[i].conn.WriteJSON(msg{value})
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
	client.room.clients = append(client.room.clients, client)
	go client.listen()
	go room.broadcast()
	return nil
}

func newRoomHandler(c echo.Context) error {
	room := &Room{id: rand.Int(), password: c.FormValue("password"), capacity: 4}
	rooms = append(rooms, room)
	enterRoom(c, room)
	return nil
}

func main() {
	go func() {
		cmd := exec.Command("npm", "run", "watch")
		cmd.Stdout = os.Stdout
		cmd.Dir = "./client"
		err := cmd.Start()
		if err != nil {
			fmt.Println("Error:", err)
		} else {
			fmt.Println("Watcher running...")
		}
		exitCode := cmd.Wait()
		fmt.Println("Watcher shut down:", exitCode)
	}()

	e := echo.New()
	e.Static("/", "./client/public")
	e.POST("/room", newRoomHandler)
	e.Start("0.0.0.0:8080")
}
