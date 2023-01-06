$(function(){
    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", drop);

})
function dragenter(){
    $("#dropbox").css("background-color", "red");
    $("#dropbox").text("Drop it!");
}
function dragleave(){
    $("#dropbox").css("background-color", "blue");
    $("#dropbox").text("Come here.");
}

function dragover(e){
    e.preventDefault(); //移除預設
    
}
function drop(e){
    e.preventDefault(); //移除預設
    let files = e.originalEvent.dataTransfer.files; //我們丟的檔案在這裡面
    if(files.length == 0){
        return false;
    }
    convert(files[0]);
}
function convert(file){
    console.log(file)
    //對傳入檔案的type做判斷，如果檔案類型沒有match text的話，就顯示文字，並且執行函式dragleave
    if(!file.type.match(/text.*/)){
        alert('請拖放文字檔');
        dragleave();
        return false;
    }
    //如果傳入檔案類型是type的話，就將裡面的內容輸出到<textarea>
    let reader = new FileReader();
    reader.onload = function(){
        let s = reader.result;
        $('#preview').text(s);
    }
    reader.readAsText(file);
}