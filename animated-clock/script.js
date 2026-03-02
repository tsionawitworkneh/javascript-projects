const canvas = document.getElementById("clock");

const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2;

ctx.translate(centerX, centerY);


function drawFace() {

    // Outer circle
    ctx.beginPath();
    ctx.arc(0, 0, radius - 5, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.lineWidth = 8;
    ctx.strokeStyle = "#333";
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();
}


function drawNumbers() {

    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let num = 1; num <= 12; num++) {

        let angle = num * Math.PI / 6; 
        

        ctx.rotate(angle);
        ctx.translate(0, -radius + 40);
        ctx.rotate(-angle);

        ctx.fillText(num.toString(), 0, 0);

        // Reset position back
        ctx.rotate(angle);
        ctx.translate(0, radius - 40);
        ctx.rotate(-angle);
    }
}

function drawHand(angle, length, width, color = "#333") {

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.rotate(angle);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-angle);
}

function drawTime() {

    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // Convert hour to radians
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
           (minute * Math.PI / (6 * 60)) +
           (second * Math.PI / (360 * 60));

    drawHand(hour, radius * 0.5, 8);

    // Convert minute to radians
    minute = (minute * Math.PI / 30) +
             (second * Math.PI / (30 * 60));

    drawHand(minute, radius * 0.75, 6);

    // Convert second to radians
    second = (second * Math.PI / 30);

    drawHand(second, radius * 0.85, 2, "red");
}

function drawClock() {

    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

    drawFace();
    drawNumbers();
    drawTime();
}

setInterval(drawClock, 1000);
drawClock();