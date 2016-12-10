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

function answerPost(){
    var user_div = $('#userId_field').val()
    question_id = $('#questionId_field').val()
    var answer = $('#answerText').val()
    var postdata = {'text': answer, 'score': 0, 'poster': user_div, 'question': question_id}
    jQuery.ajax({url:'/api/answer/', data:postdata, type:'POST'
    }).done(function(){
        location = location
    })
    getAnswers()
}

function getQuestionsForUser() {
    $("#info").html("")
    var $table = $("<p>")
    $.ajax('/api/question/').done(function (stuff){
    var que = stuff
    if(que['poster'] == $('#username_field').val()){
        console.log(que)
        $table.html($table.html() + "<tr><td>" + stuff['title'] + "<br>")
    // $('#info').append($table)
    $('main').append(html);
     console.log($('main'))
    }
    })
}

function getAnswers() {
    $.ajax('/api/answer/').done(function (stuff){
    var answer = stuff.results
    for (var j = 0; j < answer.length; j++){
        if(answer[j]['question'] == $('#questionId_field').val()){
            console.log(answer[j])
            var source = $('#post-template').html();
            var template = Handlebars.compile(source);
            var html = template(answer[j]);
            console.log(html)
            $("#answerbox").append(html);
        }
    }
    })
}

function taskPatch(){
    // console.log("Made it")
    // var id = $(elem).attr("id");
    // alert(id.value);
    var id = taskPatch.caller.arguments[0].target.id
    console.log(id)
    $.getJSON( "/api/answer/", function ( answer ) {
    var score = answer.results.score + 1
    var patchData = {'score': score}
    jQuery.ajax({url:'/api/answer/' +  id + '/', data:patchData, dataType: 'jsonp', type:'PATCH'
}).done(function(results){})
})}

$("#post_answer").click(answerPost)
$("#get_answers").click(getAnswers)
$("#votebuttonUp").click(taskPatch)
