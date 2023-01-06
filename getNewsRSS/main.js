$(function(){
    $("button").on("click", loadServerData);
});
function loadServerData(){
    let rss2json = "https://api.rss2json.com/v1/api.json?rss_url=";
    //jQuery取得JSON的語法 rss2json+ 衛福部網址
    $.getJSON(rss2json +"https://rss.nytimes.com/services/xml/rss/nyt/World.xml")
    .done(function(data){
        console.log(data)
        //跑回圈把data.items.xxx帶進去
        for(let x=0; x<data.items.length; x++){
            let thisRow = `<tr>
                <td><a target="_black" href="${data.items[x].link}">${data.items[x].title}</a></td>
                <td>${data.items[x].pubDate.split(" ")[0]}</td>
            </tr>`;
            $("#dataTable").append(thisRow);
        }
    })
    .fail(function(){
        console.log("ERROR")
    })
}