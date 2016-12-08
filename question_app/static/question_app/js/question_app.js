// cookie csrf function
function getCookie(name) {
   var cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';');
       for (var i = 0; i < cookies.length; i++) {
           var cookie = jQuery.trim(cookies[i]);
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}

var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});



$("#post_question").click(questionPost)
$("#get_questions").click(getQuestions)


function questionPost(){
    var user_div = $('#username_field').val()
    var title = $("#title").val()
    var text = document.getElementById("text").value
    var tag =document.getElementById("tag").value
    var postdata = {'title': title, 'text': text, 'tag': tag, 'poster': user_div}
    jQuery.ajax({url:'/question/', data:postdata, type:'POST'
    }).done(function(){
        location = location
    })
}


function getQuestions() {
    $("#info").html("")
    var $table = $("<p>")
    for (var j = 1; j < 5; j++){
        $.ajax('/question/' +j).done(function (stuff){
        var que = stuff
        $table.html($table.html() + "<tr><td>" + stuff['title'] + "<br>")
        $('#info').append($table)
        })
    }
}

getQuestions()


function detQuestionIdByTitle(title){
    console.log("here")
    for (var j = 1; j < 5; j++){
        $.ajax('/question/' +j).done(function (stuff){
        console.log(stuff['title'])
        console.log(title)
        if(title === stuff['title']){
            console.log(stuff)
            return stuff['id']
        }
        })
    }
}


function answerPost(){
    var user_div = $('#username_field').val()
    console.log(user_div)
    question_title = document.getElementById('#info').innerHTML
    console.log($('#info'))
    question_id = detQuestionIdByTitle(question_title)
    console.log(question_id)
    var answer = document.getElementById("answerText").value
    var postdata = {'text': answer, 'score': 0, 'poster_id': 2, 'question_id': question_id}
    jQuery.ajax({url:'/answer/', data:postdata, type:'POST'
    }).done(function(){
        location = location
    })
}

$("#post_answer").click(answerPost)
