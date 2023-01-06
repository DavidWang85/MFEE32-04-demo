var ctx, thisImage;
$(function(){
    $("[type='date']").on("change",showDate);
    ctx = $("#myCanvas")[0].getContext("2d");
});

function showDate(){
    // console.log(this.value)
    var thisDate =this.value;
    thisDate = thisDate.replace(/-/g,'');  //找到有-號的，都換成"""
    console.log(thisDate)
    thisImage = new Image();
    thisImage.src = "./flipClockNumbers.png";
    thisImage.onload =function(){
        for(var x=0;x<thisDate.length;x++){ //用回圈的方式畫圖
                                            //一個寬度80 高度90  放上去的位置一個60
            ctx.drawImage(thisImage, thisDate[x]*80, 0, 90, 130, 60*x, 0, 60, 100);
        }
    }
}
