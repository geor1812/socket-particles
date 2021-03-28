const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let lastTime;
let requiredElapsed = 1000/66.666;

let mouse = {
    x: null,
    y: null
};

let particles;
let bgColor;

let particleColor;
let type;
let pAmount;
let bounce;

function setup() {
    type = document.getElementById("type").value;
    bgColor = document.getElementById("bgColor").value;
    if(type === "trail") {
        bgColor += "10";
    }
    particleColor = document.getElementById("particleColor").value;
    pAmount = document.getElementById("pAmount").value;
    bounce = document.getElementById("bounce").checked;
    console.log(bounce);

    particles = [];
    for(let i = 0; i < pAmount; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 5) + 2;
        let color = particleColor;
        let weight = 1;
        particles.push(new Particle(x, y, size, color, weight));
    }

    draw();
}

function draw(now) {
    requestAnimationFrame(draw);
    if (!lastTime) {lastTime = now;}
    let elapsed = now - lastTime;

    if (elapsed > requiredElapsed) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
       
       for(let i = 0; i < particles.length; i++) {
           particles[i].update(bounce);
           particles[i].draw();
       } 

        lastTime=now;
    }
}

window.addEventListener("mousemove", (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

//If mouse has stopped moving for longer than 200 miliseconds, particles stop appearing
/*
setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);
*/

document.getElementById("bgColor").addEventListener("change", () => {
    bgColor = document.getElementById("bgColor").value;
    if(type === "trail") {
        bgColor += "10";
    }
    draw();
});

document.getElementById("particleColor").addEventListener("change", () => {
    particleColor = document.getElementById("particleColor").value;
    particles = particles.map((particle) => {
        particle.color = particleColor;
        return particle;
    });
    draw();
});

document.getElementById("type").addEventListener("change", () => {
    type = document.getElementById("type").value;
    if(type === "trail") {
        bgColor += "10"
    } else {
        bgColor = bgColor.slice(0, -2);
    }
    draw();
});

document.getElementById("pAmount").addEventListener("change", () => {
    pAmount = document.getElementById("pAmount").value;
    setup();
});

document.getElementById("bounce").addEventListener("change", () => {
    bounce = document.getElementById("bounce").checked;
    draw();
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});

window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setup();
});


