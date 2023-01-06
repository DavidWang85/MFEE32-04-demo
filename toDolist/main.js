$(function () {
    $("[type='checkbox']").on("change", updateProgress);
});

function updateProgress() {
    let hasChecked = 0;
    for(let x=0 ; x<$("[type='checkbox']").length;x++){
        if($("[type='checkbox']")[x].checked){
            hasChecked+=1;
        }
    }
    $("meter").attr("max", $("[type='checkbox']").length); //設定meter最大值的屬性，是我們總共的長度
    $("meter").attr("value", hasChecked); 

    $("progress").attr("value", hasChecked / $("[type='checkbox']").length);

    $("#myRange").attr("max", $("[type='checkbox']").length); //設定meter最大值的屬性，是我們總共的長度
    $("#myRange").attr("value", hasChecked);
}
