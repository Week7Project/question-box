// getQuestions()
function list_questions(){
   $.getJSON( "/api/question/", function ( questions ) {
       console.log("here")
       var source = $('#post-template').html();
       var template = Handlebars.compile(source);
       var html = template(questions.results);
       $('main').append(html);
   })
}

list_questions()


Handlebars.registerHelper('displayLink', function(id, title, url, text) {
     title = Handlebars.Utils.escapeExpression(title);
     id  = Handlebars.Utils.escapeExpression(id);
     text = Handlebars.Utils.escapeExpression(text)
     datatype = this.url.split('/');
     datatype = datatype[datatype.length-3]
       return '<a href="' + '/' + datatype + '/' + this.id + '">' + '<b>' + this.title + '</b>' + '</a>';
       return '<h2>' + this.text + '</h2>';
       console.log(this.text)
});
