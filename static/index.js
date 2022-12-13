
$(document).ready(function(){
    getTemplate()
})

$(function(){
    $(".next").click(function(){
        fillBlanks()
        $("#result").empty()
    })
})

function getTemplate(){
    $.ajax({
        url:"/get-template",
        type:"get",
        success:function(result){
            fillBlanks(result.word)
        },
        error:function(result){
            alert(result.responseJSON.message)
        }
    })
}

function fillBlanks(word){
    
    var gameOver = false;

    $("#hint").html(word.category)

    $("#blanks").empty();
    for(var i=0;i<word.inputs;i++){
        let html = `<span class="fill_blanks">_</span>`;
        $("#blanks").append(html);
    }

    $(".clickable").click(function(){
        var correctGuess = false;
        let id = $(this).attr("id");
        
        var life = parseInt($("#life").text());

        for(var i=0;i<word.word.length;i++){
            if(word.word.charAt(i).toLowerCase() == id){
                if(life>0 && ($(".fill_blanks").eq(i).html() == "_" || $(".fill_blanks").eq(i).html() == id)){
                    $(".fill_blanks").eq(i).html(id);
                    correctGuess = true
                    if($("#blanks").text() == word.word.toLowerCase()){
                        $("#result").text("YOU WIN")
                        correctGuess = true
                        gameOver = true
                        console.log(gameOver)
                    }
                   
                }else{
                    
                        $("#life").text(parseInt($("#life").text())-1)
                        console.log(life) 
                
                }
            }
        }

        
    })
}