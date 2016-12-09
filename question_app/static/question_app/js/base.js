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

$("#post_question").click(questionPost)
