let player;
let currentPlay = 0;
//YouTubeAPIReady(不能改)
function onYouTubeIframeAPIReady(){
    //針對要操控的DOM放入參數
    player = new YT.Player("player",{
        height: "390",
        width: "640",
        videoId: playList[currentPlay],
        playerVars:{
            autoplay: 0, //如果要讓他自動播放要改成1
            controls: 0, //移除內建控制項
            start: playTime[currentPlay][0],
            end: playTime[currentPlay][1],
            iv_load_policy: 3, 
        },
        events:{
            //當play準備好時就會呼叫
            onReady: onPlayerReady,
            //當狀態改變時，就會呼叫
            onStateChange: onPlayerStateChange 
        }
    });
}
//YouTubePlayerReady(可以改名稱)
//點擊按鈕播放影片
function onPlayerReady(event){
    $("#playButton").on("click",function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    })
}
//PlayerStateChange(可以改名稱)
function onPlayerStateChange(event){
    if (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]) { 
        //換歌
        //如果目前不是最後一首歌時
        if (currentPlay < playList.length - 1) { 
                currentPlay++; 
                player.loadVideoById({ 
                    //下一首歌
                    videoId: playList[currentPlay], 
                    startSeconds: playTime[currentPlay][0], 
                    endSeconds: playTime[currentPlay][1], 
                    suggestedQuality: "large" 
            }); 
        } else { 
            currentPlay = 0; 
            player.cueVideoById({ 
                videoId: playList[currentPlay], 
                startSeconds: playTime[currentPlay][0], 
                endSeconds: playTime[currentPlay][1], 
                suggestedQuality: "large" 
            }); 
        } 
        //event.data
        //-1 unstarted
        // 0 ended
        //1 playing
        //2 paused
        //3 buffering
        //5 video cued
    } if (event.data == 1) { 
        $("h2").text(player.getVideoData().title); 
    }
}

