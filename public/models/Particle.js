class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(bounce) {
        this.size -= 0.06;
        if(this.size < 0) {
            //Particles shrink
            this.x = (mouse.x + ((Math.random() * 20) -10));
            this.y = (mouse.y + ((Math.random() * 20) -10));
            this.size = (Math.random() * 20) + 2;
            this.weight = (Math.random() * 2) -0.05;
        }
        //The particle will fall based on weight
        this.y += this.weight;
        //Particles get heavier the more they fall
        this.weight += 0.2;

        //Bounce on the bottom
        if(bounce) {
            if(this.y > canvas.height - this.size) {
                this.weight *= -1; 
            }
        }
    }
}