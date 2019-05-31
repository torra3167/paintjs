const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const saveBtn = document.getElementById("jsSave");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = INITIAL_COLOR;
context.lineWidth = 2.5;
context.fillStyle = INITIAL_COLOR;
// context.fillRect(50, 20, 100, 49);

let painting = false;
let filling = false;
function startPainting() {
    painting = true;
}

function onMouseMove(event){
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
    // console.log(x, y);
}

function stopPainting(){
    painting = false;
}

// function onMouseDown(event) {
//     console.log(event);
//     painting = true;
// }
//
// function onMouseUp(event) {
//     // painting = true;
//     stopPainting();
// }
//
// function onMouseLeave(event) {
//     painting = false;
// }

function handleColorClick(event) {
    console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    console.log(color);
    context.strokeStyle = color;
    context.fillStyle = color;

}

function handleRangeChange(event) {
    console.log(event.target.value);
    const size = event.target.value;
    context.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "fill"
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
    console.log(event);
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs[EXPORT BY PHIL]";
    link.click();
    console.log(link);
    // console.log(image);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
// console.log(Array.from(colors));
if(range) {
    console.log(range);
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    console.log(mode);
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}