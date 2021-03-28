const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.use(express.static('./public/'));
app.use(express.static('./models/'));
const io = require('socket.io')(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "public/index.html");
});

let bgColor;
let particleColor;
let pAmount = 200;
let bounce;

io.on('connection', (socket) => {
    io.emit("new connect",
        {
            count: io.engine.clientsCount,
            bgColor: bgColor,
            particleColor: particleColor,
            pAmount: pAmount,
            bounce: bounce
        });

    socket.on("mouse moved", (data) => {
        io.emit("coordinates", data);
    });

    socket.on("bg changed", (data) => {
        io.emit("bgColor", data);
        bgColor = data.bgColor;
    });

    socket.on("particleColor changed", (data) => {
        io.emit("particleColor", data);
        particleColor = data.particleColor;
    });

    socket.on("pAmount changed", (data) => {
        io.emit("pAmount", data);
        pAmount = data.pAmount;
    });

    socket.on("bounce changed", (data) => {
        io.emit("bounce", data);
        bounce = data.bounce;
    });
});

server.listen(8080);