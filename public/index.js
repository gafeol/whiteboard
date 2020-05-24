var color = "black";
var isDrawing = false;
var x, y;


document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');


    window.addEventListener('resize', onResize, false);
    onResize();

    canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });

    canvas.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
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
        const w = canvas.width, h = canvas.height;
        x1 = x1; x2 = x2;
        y1 = y1; y1 = y1;
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }

    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});