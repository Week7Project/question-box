function taskPatch(){
    var id = taskPatch.caller.arguments[0].target.id
    $.getJSON( "/api/answer/", function ( answer ) {
    var score = answer.results.score + 1
    var patchData = {'score': score}
    jQuery.ajax({url:'/api/answer/' +  id + '/', data:patchData, dataType: 'jsonp', type:'PATCH'
}).done(function(results){})
})}


function list_questions(){
   $.getJSON( "/api/question/", function ( questions ) {
       var source = $('#post-template').html();
       var template = Handlebars.compile(source);
       var html = template(questions.results);
       $('main').append(html);
   })
}

list_questions()


Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return new Date(timestamp).toString('yyyy-MM-dd')
});

Handlebars.registerHelper('displayLink', function(id, title, url, text) {
     title = Handlebars.Utils.escapeExpression(title);
     id  = Handlebars.Utils.escapeExpression(id);
     text = Handlebars.Utils.escapeExpression(text);
     datatype = this.url.split('/');
     datatype = datatype[datatype.length-3]
       return '<a href="' + '/' + datatype + '/' + this.id + '">' + '<b>' + this.title + '</b>' + '</a>';
       return '<h2>' + this.text + '</h2>';
})
