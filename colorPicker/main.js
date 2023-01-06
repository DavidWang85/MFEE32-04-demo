var ctx, thisImage;
$(function(){
    $("#1").on("change",setColor1);
    $("#2").on("change",setColor2);
    $("#go").on("click", showColor);
    ctx = $("#myCanvas")[0].getContext("2d");
});

let color1 ="";
let color2 = "";
function setColor1(){
    color1 = this.value
}
function setColor2() {
    color2 = this.value
}
function showColor(){
    // console.log(value);
    // var thisColor1 = this.value;
    // var my_gradient = ctx.createLinearGradient(0, 0, 170, 0);
    // my_gradient.addColorStop(0, `${color1}`);
    // my_gradient.addColorStop(1, `${color2}`);
    $('body').css("background", `linear-gradient(45deg, ${color1} 50%, ${color2} 50%)`)
    // ctx.fillStyle = my_gradient;
    // ctx.fillStyle = `${thisColor}`;
    // ctx.fillRect(0, 0, 480, 100);
}