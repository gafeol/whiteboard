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
            console.log("clicked box "+box.id); 
            color = box.id;
        });
        console.log("added event listenetr to "+box.id);
    });

    window.addEventListener('resize', onResize, false);
    onResize();

    canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });

    canvas.addEventListener('mousemove', e => {
        if (isDrawing === true) 
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    });

    canvas.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });

    function drawLine(context, x1, y1, x2, y2) {
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

    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});