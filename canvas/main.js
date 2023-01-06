let mapArray, ctx, currentImgMain; 
let imgMountain, imgMain, imgEnemy;
//mapArray-決定地圖中每個格子的元素
//ctx-HTML5Canvas用
//currentImgMainX,currentImgMainY-決定主角所在座標
//imgMountain,imgMain,imgEnemy-障礙物,主角,敵人的圖片物件
const gridLength = 200;//網頁載入完成後初始化動作

//寫一個loadImages的函式
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

$(function(){
    mapArray = [ //0-可走,1-障礙,2-終點,3-敵人
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");  //在#myCanvas拿出2D畫筆

    //把主角擺上畫面
    imgMain = new Image(); //new一個Image物件
    imgMain.src = "images/spriteSheet.png"; //主角大圖
    currentImgMain = {  //主角擺放的位置
        "x": 0,
        "y": 0
    }

    //要先載入imgMain 再執行
    imgMain.onload = function(){
        //把主角畫到畫布上的動作 drawImage(你的圖, 要丟到畫布的x位置, 要丟到畫布的x位置,, 切下你原圖某個x位置, 切下你原圖某個y位置,  縮放圖的寬, 縮放圖的高,)
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    }

    //將要放的圖片都集中在物件sources裡面
    var sources = {
        mountain: 'images/material.png',
        enemy: 'images/Enemy.png'
    };
    // 執行loadImages函式
    loadImages(sources, function (images) {
        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    ctx.drawImage(images.mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });


    // //2.把障礙物擺上畫面
    // imgMountain = new Image();
    // imgMountain.src = "images/material.png";
    // //3.把敵人擺上畫面
    // imgEnemy = new Image();
    // imgEnemy.src = "images/Enemy.png";

    // imgMountain.onload = function(){
    //     imgEnemy.onload = function(){
    //         for(var x in mapArray){
    //             for (var y in mapArray[x]){
    //                 if (mapArray[x][y] == 1) {
    //                     ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength)
    //                 } else if (mapArray[x][y] == 3) {
    //                     ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength)
    //                 }
    //             }
                
    //         }
    //     }
    // }
    
})
//處理使用者按下按鍵
$(document).on("keydown",function(e){
    //主角的目標座標、
    let targetImg, targetBlock, cutImagePositionX;
    //決定主角臉朝哪個方向
    targetImg = {
        "x": -1,
        "y": -1
    }
    //主角的目標
    targetBlock = {
        "x": -1,
        "y": -1
    }
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    e.preventDefault();
    console.log(e.code);

    //判斷使用者按下什麼並推算目標座標
    switch(e.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175; //臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x
            targetImg.y = currentImgMain.y - gridLength
            cutImagePositionX = 355; //臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength
            targetImg.y = currentImgMain.y
            cutImagePositionX = 540; //臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0; //臉朝下
            break;
        default: //其他按鍵不處理
            return;

    }

    // //確認主角位置不會超過地圖
    if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    // //清空主角原本所在的位置
    ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        //查查看是否可以過去
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: //一般道路（可移動）
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: //山（不可移動）
                $("#talkBox").text("有山");
                break;
            case 2: //終點（可移動）
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: //敵人（不可移動）
                $("#talkBox").text("哈囉");
                break;
        }
    }else{
        $("#talkBox").text("邊界");
    }
    // //重新繪製主角
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});