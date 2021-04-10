package main

import (
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var rooms []Room

type Client struct {
	room *Room
	conn *websocket.Conn
	seat int8
	name string
}

type Room struct {
	id       int
	password string
	clients  []*Client
}

func main() {
	e := echo.New()
	e.Static("/", "client")
	e.Start("0.0.0.0:8080")
}
