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

Handlebars.registerHelper('displayLink', function(id, title) {
  title = Handlebars.Utils.escapeExpression(title);
  id  = Handlebars.Utils.escapeExpression(id);
  console.log(this.id)
    return '<a href="' + '/question/' + this.id + '">' + this.title + '</a>';
});
