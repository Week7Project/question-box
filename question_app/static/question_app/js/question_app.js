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


function questionPost(){
    var poster = $('#username_field').val()
    console.log(poster)
    var title = $("#title").val()
    var text = $("#text").val()
    var tag =$("#tag").val()
    var postdata = {'title':title, 'text':text, 'tags':tag, 'poster':poster}
    console.log(postdata)
    $.ajax({url:'/api/question/', data:postdata, type:'POST'
    }).done(function(){
        location = location
    })
}


function getQuestions() {
    $("#info").html("")
    var $table = $("<p>")
    for (var j = 1; j < 5; j++){
        $.ajax('/api/question/' +j).done(function (stuff){
        var que = stuff
        $table.html($table.html() + "<tr><td>" + stuff['title'] + "<br>")
        $('#info').append($table)
        })
    }
}

// getQuestions()
function getQuestionDetail(question_id) {
    $("#info").html("")
    var $table = $("<p>")
    console.log(question_id)
    $.ajax('/api/question/' + question_id).done(function (stuff){
        console.log(stuff)
        var que = stuff
        $table.html($table.html() + "<tr><td>" + stuff['title'] + "<br>")
        $('#info').append($table)
    })
}

function detQuestionIdByTitle(title){
    console.log("here")
    for (var j = 1; j < 5; j++){
        $.ajax('/api/question/' +j).done(function (stuff){
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
    var postdata = {'text': answer, 'score': 0, 'poster_id': 1, 'question_id': 1}
    jQuery.ajax({url:'/api/answer/', data:postdata, type:'POST'
    }).done(function(){
        location = location
    })
}


function getQuestionsForUser() {
    $("#info").html("")
    var $table = $("<p>")
    for (var j = 1; j < 10; j++){
        $.ajax('/api/question/' +j).done(function (stuff){
        var que = stuff
        if(que['poster'] == $('#username_field').val()){
            console.log(que)
            $table.html($table.html() + "<tr><td>" + stuff['title'] + "<br>")
        $('#info').append($table)
        }
        })
    }
}




$("#getQuestionsForUser").click(getQuestionsForUser)
$("#get_question_details").click(getQuestionDetail)
$("#post_answer").click(answerPost)
$("#post_question").click(questionPost)
$("#get_questions").click(getQuestions)
