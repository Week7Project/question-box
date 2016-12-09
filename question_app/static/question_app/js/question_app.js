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
    var $table = $("<p>")
    var user_div = $('#userId_field').val()
    console.log(user_div)
    question_id = $('#questionId_field').val()
    console.log(question_id)
    var answer = $('#answerText').val()
    var postdata = {'text': answer, 'score': 0, 'poster': user_div, 'question': question_id}
    jQuery.ajax({url:'/api/answer/', data:postdata, type:'POST'
    }).done(function(){
        // location = location
        $table.html($table.html() + "<tr><td>" + answer + "<br>")
        console.log(answer)
        $('#answer').append($table)
    })
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


function list_questions(){
   $.getJSON( "/api/question/", function ( questions ) {
       console.log("here")
       var source = $('#post-template').html();
       var template = Handlebars.compile(source);
       var html = template(questions.results);
       $('main').append(html);
       console.log($('main'))
   })
}
//
// var user_div = $('#username_field').val()
// var context = getQuestionsForUser(user_div)


function profileOnload() {

    var user_div = $('#username_field').val()
    var context1 = getQuestionsForUser(user_div)
    var context = list_questions()
    console.log(context1)
    console.log(context)
    Handlebars.registerHelper('displayLink', function(id, title, url) {
     title = Handlebars.Utils.escapeExpression(title);
     id  = Handlebars.Utils.escapeExpression(id);
     datatype = this.url.split('/');
     console.log(this.poster)
     datatype = datatype[datatype.length-3]
     if(user_div == this.poster){
      return '<a href="' + '/' + datatype + '/' + this.id + '">' + this.title + '</a>';
      }
    });
}


$("#getQuestionsForUser").click(getQuestionsForUser)
$("#get_question_details").click(getQuestionDetail)
$("#post_answer").click(answerPost)
$("#get_questions").click(getQuestions)
