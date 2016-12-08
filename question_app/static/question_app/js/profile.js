function list_questions(){
    var context=[]
    $.getJSON( "/api/question/", function ( questions ) {
        console.log("here")
        var source = $('#post-template').html();
        var template = Handlebars.compile(source);
        var html = template(questions.results);
        $('main').append(html);
        return context
    })
}
var context = list_questions()

Handlebars.registerHelper("displayLink", function ( url, title ){
    return '<h1><a href=url>title</a></h1>'
})
console.log(context)
