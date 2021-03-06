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


function dropDownTags(){
    $.ajax("/api/tag/").done(function(obj) {
        $("#dropDownTags").html("")
        tags = (obj.results)
        for (var j = 0; j < tags.length; j++){
            $("#dropDownTags").append("<option>" + tags[j]['name'] + "</option>");
        }
    });
}

var tagId

function questionPost(){
    var poster = $('#username_field').val()
    var title = $("#title").val()
    var text = $("#text").val()
    tagName = $("#dropDownTags").val()
    $.ajax("/api/tag/").done(function(obj) {
        tags = (obj.results)
        for (var j = 0; j < tags.length; j++){
            if(tags[j]['name'] == tagName){
                tagId =  tags[j]['id']
            }
        }
        tag = tagId
        var postdata = {'title':title, 'text':text, 'tags':tag, 'poster':poster}
        $.ajax({url:'/api/question/', data:postdata, type:'POST'}).done(function(){
            location = location
        })
    })
}


function getQuestions() {
    $("#info").html("")
    var $table = $("<p>")
    $.ajax('/api/question/' +j).done(function (stuff){
    var que = stuff
    $table.html($table.html() + "<tr><td>" + stuff['title'] + "<br>")
    $('#info').append($table)
    })
}


// getQuestions()
function getQuestionDetail(question_id) {
    $("#info").html("")
    var $table = $("<p>")
    $.ajax('/api/question/' + question_id).done(function (stuff){
        var que = stuff
        $table.html($table.html() + "<tr><td>" + stuff['title'] + "<br>")
        $('#info').append($table)
    })
}


function getQuestionsForUser() {
    $("#info").html("")
    var $table = $("<p>")
    $.ajax('/api/question/').done(function (stuff){
        var que = stuff.results
        for (var i = 0; i < que.length; i++){
            if(que[i]['poster'] == $('#username_field').val()){
                if(que[i].tags.length > 0){
                    $table.html($table.html() + "<div id='questionbox'>" + "<h4>" + "<a href=/question/" +
                    que[i]['id'] + ">" + que[i]['title']+ "</h4>" + "</a>" + "Answer Count: " +
                    que[i]['answer'].length + "<br><p id='tagStyle'><a><span>&nbsp;" + que[i].tags[0]['name'] + "&nbsp;</span></a></p></div><br>")
                    $('#questions').append($table)
                }
                else{
                    $table.html($table.html() + "<div id='questionbox'>" + "<h4>" + "<a href=/question/" +
                    que[i]['id'] + ">" + que[i]['title']+ "</h4>" + "</a>" + "Answer Count: " +
                    que[i]['answer'].length + "<br></div><br>")
                    $('#questions').append($table)
                    }
                }
        }
    })
}


function list_questions(){
   $.getJSON( "/api/question/", function ( questions ) {
       var source = $('#post-template').html();
       var template = Handlebars.compile(source);
       var html = template(questions.results);
       $('main').append(html);
   })
}


function getAnswers() {
    $("#answer").html("")
    var $table = $("<p>")
    $.ajax('/api/answer/').done(function (stuff){
    var answer = stuff.results
    for (var j = 0; j < answer.length; j++){
        if(answer[j]['question'] == $('#questionId_field').val()){
            $("#answer").html("")
            $table.html($table.html() + "<tr><td>" + answer[j]['text'] + "<br>")
            $('#answer').append($table)
        }
    }
    })
}


function profileOnload() {
    var user_div = $('#username_field').val()
    var context = list_questions()
    Handlebars.registerHelper('displayLink', function(id, title, url) {
     title = Handlebars.Utils.escapeExpression(title);
     id  = Handlebars.Utils.escapeExpression(id);
     datatype = this.url.split('/');
     datatype = datatype[datatype.length-3]
     if(user_div == this.poster){
      return '<a href="' + '/' + datatype + '/' + this.id + '">' + this.title + '</a>';
      }
    });
}


function answerPost(){
    var url = window.location.href
    url = url.replace(/[?]/g,'');
    url = url.split('/');
    url = url[url.length-1]
    var user_div = document.getElementById("userid").innerHTML
    var question_id = url
    var answer = $('#answerText').val()
    var postdata = {'text': answer, 'score': '0', 'poster': user_div, 'question': question_id}
    jQuery.ajax({url:'/api/answer/', data:postdata, type:'POST'
    })
}


getAnswers()


$("#post_question").click(questionPost)
$("#dropDownTags").click(dropDownTags)
$("#getQuestionsForUser").click(getQuestionsForUser)
$("#get_question_details").click(getQuestionDetail)
$("#get_questions").click(getQuestions)
$("#get_answers").click(getAnswers)
