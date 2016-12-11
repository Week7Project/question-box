function taskPatch(){
    var id = taskPatch.caller.arguments[0].target.id
    $.getJSON( "/api/answer/", function ( answer ) {
    var score = answer.results.score + 1
    var patchData = {'score': score}
    jQuery.ajax({url:'/api/answer/' +  id + '/', data:patchData, dataType: 'jsonp', type:'PATCH'
}).done(function(results){})
})}


// getQuestions()
function list_questions(){
   $.getJSON( "/api/question/", function ( questions ) {
       var source = $('#post-template').html();
       var template = Handlebars.compile(source);
       var html = template(questions.results);
       $('main').append(html);
       for (var i = 0; i <= questions.length; i++){
           $.ajax("/api/tag/" + i).done(function(obj) {
               tagName =  obj['name']
               $('#thisTagName').html(tagName)
               console.log(tagName)
            })
       }
   })
}

list_questions()
function myHandler(){
    alert(myHandler.caller.arguments[0].target.id)
}

Handlebars.registerHelper('displayLink', function(id, title, url, text) {
     title = Handlebars.Utils.escapeExpression(title);
     id  = Handlebars.Utils.escapeExpression(id);
     text = Handlebars.Utils.escapeExpression(text);
     datatype = this.url.split('/');
     datatype = datatype[datatype.length-3]
       return '<a href="' + '/' + datatype + '/' + this.id + '">' + '<b>' + this.title + '</b>' + '</a>';
       return '<h2>' + this.text + '</h2>';
})

$("#votebuttonUp").click(taskPatch)

//
// function getTagName(){
//     tagId = (document.getElementById('thisTagName').innerHTML)
//     $.ajax("/api/tag/" + tagId).done(function(obj) {
//         tagName =  obj['name']
//         $('#thisTagName').html(tagName)
//         console.log(tagName)
//     })
// }
//
// getTagName()
