var color = "black";
var isDrawing = false;
const eraserSize = 50;
var x, y;

document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');
    var colorBoxes = document.querySelectorAll("#colors div");
    colorBoxes.forEach(box => {
        console.log(box);
        box.addEventListener('click', e => {
            color = box.id;
        });
    });

    var socket = io();
    socket.on('drawing', ({x, y, xx, yy, c}) => {
        x *= canvas.width; 
        y *= canvas.height; 
        xx *= canvas.width; 
        yy *= canvas.height;
        if (c === 'white') {
            ctx.fillStyle = c;
            ctx.fillRect(xx-eraserSize/2.0,yy-eraserSize/2.0,eraserSize,eraserSize);
        }
        else {
            ctx.beginPath();
            ctx.strokeStyle = c;
            ctx.lineWidth = 2;
            ctx.moveTo(x, y);
            ctx.lineTo(xx, yy);
        }
        ctx.stroke();
        ctx.closePath();
    });

    window.addEventListener('resize', onResize, false);
    onResize();

    canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });

    const moveMouse = (e) => {
        if (isDrawing === true) 
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    };

    canvas.addEventListener('mousemove', throttle(moveMouse, 10));


    canvas.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });

    function drawLine(context, x1, y1, x2, y2) {
        socket.emit('drawing', {
            x: x1/canvas.width,
            y: y1/canvas.height,
            xx: x2/canvas.width,
            yy: y2/canvas.height,
            c: color
        });
        if (color === 'white') {
            context.fillStyle = color;
            context.fillRect(x2-eraserSize/2.0,y2-eraserSize/2.0,eraserSize,eraserSize);
        }
        else {
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
        }
        context.stroke();
        context.closePath();
    }

    
  // limit the number of events per second
    function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function () {
            var time = new Date().getTime();
            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }


    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});