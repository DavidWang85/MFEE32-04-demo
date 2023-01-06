$(function(){
    $("button").on("click", go);
})
const maleKeywords = ["雄","強","賢","志"];
const femaleKeywords = ["芸","芬","佩"];

let go = ()=>{
    //取得input內容
    var inputText = $("#userInput").val();
    //陣列方法some(函式)：使用函式對陣列做判斷布林
    //後面的function表示 在input裡面是否包含thisElement
    const isMale = maleKeywords.some(thisElement => inputText.includes(thisElement));
    const isFemale = femaleKeywords.some(thisElement => inputText.includes(thisElement));
    if(isMale && isFemale){
        $("h1").text("😆");
    }else if(isMale){
        $("h1").text("👱‍♂️"); 
    } else if (isFemale) {
        $("h1").text("👩");
    }else{
        $("h1").text("👩🏿‍🦲"); 
    }
}