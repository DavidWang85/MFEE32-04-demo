let thisButton = document.getElementsByTagName("button")[0];
let showData = document.getElementById("showData");
thisButton.addEventListener("click",loadServerData);

function loadServerData(){
    console.log("Load Server Data");
    //預設變數xmlHttpRequest
    let xmlHttpRequest;
        //如果有xmlHttpRequest
    if (window.XMLHttpRequest){
        // 就把new完以後的xmlHttpRequest存入變數xmlHttpRequest
        xmlHttpRequest = new window.XMLHttpRequest();
    }else{
        alert("你沒有 window.XMLHttpRequest")
    }
    //設定XMLHttpRequest相關資訊
    //使用GET方法取得伺服器的檔案
    xmlHttpRequest.open("GET","DataFromServer.txt",true);
    xmlHttpRequest.send();
    // 每次狀態一改變就執行
    xmlHttpRequest.onreadystatechange = function(){
        if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status ==200){
            showData.innerHTML = xmlHttpRequest.responseText;
            thisButton.style.visibility = "hidden";
        }
    }
}