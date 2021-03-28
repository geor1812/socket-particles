const socket = io();

socket.on("new connect", (data) => {
    document.getElementById("bgColor").value = data.bgColor;
    document.getElementById("particleColor").value = data.particleColor;
    document.getElementById("pAmount").value = data.pAmount;
    document.getElementById("bounce").checked = data.bounce;
    setup();
});

socket.on("coordinates", (data) => {
    mouse.x = data.x;
    mouse.y = data.y;
});

socket.on("bgColor", (data) => {
    bgColor = data.bgColor;
    if(type === "trail") {
        bgColor += "10";
    }
    document.getElementById("bgColor").value = bgColor;
});

socket.on("particleColor", (data) => {
    particles = particles.map((particle) => {
        particle.color = data.particleColor;
        return particle;
    });
    document.getElementById("particleColor").value = data.particleColor;
});

socket.on("pAmount", (data) => {
    pAmount = data.pAmount;
    document.getElementById("pAmount").value = data.pAmount;
    setup();
});

socket.on("bounce", (data) => {
    bounce = data.bounce;
    document.getElementById("bounce").checked = data.bounce;
});

//Client events
window.addEventListener("mousemove", (event) => {
    socket.emit("mouse moved", 
        { x: event.clientX, y: event.clientY });
});

document.getElementById("bgColor").addEventListener("change", () => {
    bgColor = document.getElementById("bgColor").value;
    socket.emit("bg changed", 
        {bgColor: bgColor});
});

document.getElementById("particleColor").addEventListener("change", () => {
    particleColor = document.getElementById("particleColor").value;
    socket.emit("particleColor changed", 
        {particleColor: particleColor});
});

document.getElementById("pAmount").addEventListener("change", () => {
    pAmount = document.getElementById("pAmount").value;
    socket.emit("pAmount changed", 
        {pAmount: pAmount});
});

document.getElementById("bounce").addEventListener("change", () => {
    bounce = document.getElementById("bounce").checked;
    socket.emit("bounce changed", 
        {bounce: bounce});
});

