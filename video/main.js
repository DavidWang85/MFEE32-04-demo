$(function(){
    $("#myVideo").attr("src", "./sample-mp4-file.mp4")  //跟這句是一樣的 document.querySelector("#myVideo").setAttribute("src", "./sample-mp4-file.mp4")
    //當使用者點擊開始按鈕
    $("#playBtn").on("click", function () {
        $("#volumeDisplay").text($("#myVideo")[0].volume.toFixed(2));
        $("#progressBar")[0].max = $("#myVideo")[0].duration;

            //檢查影片是否暫停(paused)，如果是暫停狀態時
        if ($("#myVideo")[0].paused) {
            $("#myVideo")[0].play();  //在影片加上play方法
            $("#playBtn").text("Pause"); //把按鈕上的文字改成pause
        }else{ //如果沒有暫停狀態時
            $("#myVideo")[0].pause();  //在影片加上pause方法
            $("#playBtn").text("Play"); //把按鈕上的文字改成play
        }
    });
    //按哪個按鈕，就執行哪個function
    $("#lowerVolumeBtn").on("click", downVolume);
    $("#higherVolumeBtn").on("click", upVolume); 
    //影片播放時會觸發timeupdate事件，執行function
    $("#myVideo").on("timeupdate", updateProgress);
    //拉動進度條時會觸發change事件，執行function 
    $("#progressBar").on("change", changeProgress);


    $("#fullBtn").on("click", function(){
        $("#myVideo")[0].webkitEnterFullscreen(); //在影片上加上全螢幕方法
    });
})

//減少音量function
function downVolume(){
    var myVideo = $("#myVideo")[0];
    //當音量是0時不作動
    if (myVideo.volume == 0){
        return;
    }  //當音量小於0.1時，讓音量直接變0
    else if (myVideo.volume < 0.1){
        myVideo.volume = 0;
    } //剩下就是每點一次就是減0.1
    else{
        myVideo.volume = myVideo.volume - 0.1
    }
    $("#volumeDisplay").text(myVideo.volume.toFixed(2)); //將內容變成字串貼在DOM上面
}
//增加音量function
function upVolume(){
    var myVideo = $("#myVideo")[0];
    //當音量是1時不作動
    if (myVideo.volume == 1) {
        return
    }  //當音量大於0.9時，讓音量直接變1
    else if (myVideo.volume >0.9) {
        myVideo.volume = 1;
    } else { //剩下就是每點一次就是增0.1
        myVideo.volume = myVideo.volume + 0.1
    }
    $("#volumeDisplay").text(myVideo.volume.toFixed(2)); //將內容變成字串貼在DOM上面
}

//更新滾動條數字updateProgress
function updateProgress(){
    $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime)); //取得現在時間並且取整數
    $("#timeDisplay").append(`/ ${Math.floor($("#myVideo")[0].duration)} 秒`) //再加上一個 / + ${總秒數} + 秒
}

//觸發change改變滾動條
function changeProgress(){
    $("#myVideo")[0].currentTime = $("#progressBar")[0].value; //把滾動條的值帶入currentTime
}