function list_questions(){
   $.getJSON( "/api/question/", function ( questions ) {
       console.log("here")
       var source = $('#post-template').html();
       var template = Handlebars.compile(source);
       var html = template(questions.results);
       $('main').append(html);
   })
}
var context = list_questions()

Handlebars.registerHelper('displayLink', function(id, title, url) {
 title = Handlebars.Utils.escapeExpression(title);
 id  = Handlebars.Utils.escapeExpression(id);
 datatype = this.url.split('/');
 datatype = datatype[datatype.length-3]
   return '<a href="' + '/' + datatype + '/' + this.id + '">' + this.title + '</a>';
});
