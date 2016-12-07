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
    console.log("here")
    var user_div = $('#username_field').val()
    console.log(user_div)
    var title = document.getElementById("title").value
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
    for (var j = 1; j < 10; j++){
        $.ajax('/question/' +j).done(function (stuff){
        var que = stuff
        console.log(stuff['title'])
        $table.html($table.html() + "<tr><td>" + stuff['title'] + "<br>")
        $('#info').append($table)
        })
    }
}
