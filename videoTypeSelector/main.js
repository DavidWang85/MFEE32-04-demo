//列出需求影片格式
const legalVideoFormats = ["mp4", "flv", "avi", "mov", "mkv", "mpeg", "3gp", "wmv", "swf"];
//一些轉檔問題  如果有window.URL或者window.webkitURL都叫做window.URL
window.URL = window.URL || window.webkitURL; 

//設定檔案輸入觸發事件
$(function () { 
    $("#inputFile").change(function (e) { 
        $("table").empty(); 
        $("table").append("<tr><th>檢核項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");
        processFile(e.target.files); 
    });
    $("#dropbox").on("dragenter", dragenter); 
    $("#dropbox").on("dragleave", dragleave); 
    $("#dropbox").on("dragover", dragover); 
    $("#dropbox").on("drop", drop); 
});


//檢查檔案格式是否為video並且是指定影片格式之一
function processFile(files) { 
    let thisVideo = files[0]; 
    $("table").append($(`<tr><td col span="4">影片名稱: ${thisVideo.name}</td></tr>`).css("background-color", "yellow")); 
    $("table").append($(`<tr><td>影片長度</td><td>需介於60~90秒</td><td id="thisDuration"></td><td id="thisDurationResult"></td></tr>`)); 
    $("table").append($(`<tr><td>影片格式</td><td>MP4、FLV、AVI、MOV、MKV、MPEG、3GP、WMV、SWF</td><td id="thisFormat">${thisVideo.type}</td><td id="thisFormatResult"></td></tr>`)); 
    var thisFileType = thisVideo.type.split("/"); 
    if (thisFileType[0] == "video") { 
        if (legalVideoFormats.indexOf(thisFileType[1]) != -1) { 
            $("#thisFormatResult").text("O").css("color", "green");; 
        }else { 
            $("#thisFormatResult").text("X").css("color", "red"); 
        } 
    }else { 
        $("#thisFormatResult").text("非影片格式").css("color", "red");
    }
    $("table").append($(`<tr><td>解析度</td><td>720p(1280*720)以上</td><td id="thisResolution"></td><td id="thisResolutionResult"></td></tr>`));

    //取得影片長度、解析度寬度、解析度高度
    let videoElement = document.createElement('video'); 
    videoElement.preload = 'metadata'; 
    videoElement.onloadedmetadata = function () { 
        thisVideo.duration = videoElement.duration; 
        thisVideo.videoWidth = videoElement.videoWidth; 
        thisVideo.videoHeight = videoElement.videoHeight; 
        $("#thisDuration").text(thisVideo.duration); 
        $("#thisResolution").text(thisVideo.videoWidth + "*" + thisVideo.videoHeight);
        if (thisVideo.duration >= 60 && thisVideo.duration < 91) { 
            $("#thisDurationResult").text("O").css("color", "green"); 
        } else { 
            $("#thisDurationResult").text("X").css("color", "red"); 
        }
        if (thisVideo.videoWidth >= 1280 && thisVideo.videoHeight >= 720) { 
            $("#thisResolutionResult").text("O").css("color", "green"); 
        } else { 
            $("#thisResolutionResult").text("X").css("color", "red"); 
        }     
    }
    videoElement.src = URL.createObjectURL(thisVideo);
}

//寫拖曳進去和出去
function dragenter() {
    $("#dropbox").css("border", "5px solid blue");
    $("#dropbox").text("Drop it!");
}

function dragleave() {
    $("#dropbox").css("border", "5px dashed black");
    $("#dropbox").text("Choose file by the button below or Drop here.");
}

function dragover(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    let files = e.originalEvent.dataTransfer.files;
    
    if (files.length == 0) {
        return false;
    }
    // convert(files[0]);
    $("table").empty();
    $("table").append("<tr><th>檢查項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");
    // debugger;
    processFile(files);
    dragleave();
}