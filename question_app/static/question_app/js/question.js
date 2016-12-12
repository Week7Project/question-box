
function getCookie(name) {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';')
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i])
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
              break;
          }
      }
  }
  return cookieValue
}


var csrftoken = getCookie('csrftoken')
function csrfSafeMethod(method) {
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method))
}


$.ajaxSetup({
   beforeSend: function(xhr, settings) {
       if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
           xhr.setRequestHeader("X-CSRFToken", csrftoken)
       }
   }
})


function currentURL(){
   var url = window.location.href
   getQuestionDetail(url)

}
currentURL()


function getQuestionDetail(url){
   var id = url.split('/')
   id =url.slice(-1)
   console.log(id)
   $.ajax({
       url: '/api/question/' + id,
       type: 'GET',
   }).done(function(results){
       var answer = results.answer
       console.log(results)
       displayAnswers(answer)
       var context = {
           title: results.title,
           created: results.question_created,
           text: results.text,
       }
       var source = $('#post-template').html()
       var template = Handlebars.compile(source)
       var html = template(context)
       $('#questDetail').append(html)

   })
}


function scorePatchUp(){
    var id = scorePatchUp.caller.arguments[0].target.id
    $.getJSON( "/api/answer/" + id, function ( answer ) {
        console.log(answer)
    var score = answer.score
    var patchData = {'score':score + 1}
    jQuery.ajax({url:'/api/answer/' +  id + '/',
                data:patchData,
                dataType: 'jsonp',
                type:'PATCH'}
            ).done(function(results){})
})}


function scorePatchDown(){
    var id = scorePatchDown.caller.arguments[0].target.id
    $.getJSON( "/api/answer/" + id, function ( answer ) {
        console.log(answer)
    var score = answer.score
    var patchData = {'score':score - 1}
    jQuery.ajax({url:'/api/answer/' +  id + '/',
                data:patchData,
                dataType: 'jsonp',
                type:'PATCH'}
            ).done(function(results){})
})}


function displayAnswers(answer){
   console.log(answer)
   var sourceTwo = $('#post-template-two').html()
   var templateTwo = Handlebars.compile(sourceTwo)
   var htmlTwo = templateTwo(answer)
   $('#answerDetail').append(htmlTwo)

}
