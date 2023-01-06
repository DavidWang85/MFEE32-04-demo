let thisButton = document.getElementById("todayBtn");
let showData = document.getElementById("showData");
let randomBtn = document.getElementById("randomBtn");
thisButton.addEventListener("click",loadServerData);
randomBtn.addEventListener("click",loadServerData);

function loadServerData(){
    console.log("Load Server Data");
    let date = document.getElementById("date").value;
    date = date.replace(/-/g,"");
    date = date.concat(".txt");
    console.log(date)
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
    // let data = ["20220104.txt","20220222.txt","20221202.txt","20221222.txt"];
    // let randomData = Math.floor(Math.random() * (data.length));
    xmlHttpRequest.open("GET", date,true);
    xmlHttpRequest.send();
    // 每次狀態一改變就執行
    xmlHttpRequest.onreadystatechange = function(){
        if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status ==200){
            showData.innerHTML =  xmlHttpRequest.responseText;
            // thisButton.style.visibility = "hidden";
        }
    }
}

$(function(){
    $("#randomBtn").on("click", getRandomJoke);
})
function getRandomJoke(){
    $.getJSON("https://api.chucknorris.io/jokes/random")
        //如果成功回傳時，執行裡面的內容
        .done(function (data) {
            console.log("Success");
            $("#showData").text(data.value); //在showData顯示笑話
        })
        //如果回傳失敗時，執行裡面的內容
        .fail(function (err) {
            console.log(err);
        })
        //不管成功於否，都執行裡面的內容
        .always(function (go) {
            console.log(go);
        });
}
