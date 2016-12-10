function taskPatch(){
    // console.log("Made it")
    // var id = $(elem).attr("id");
    // alert(id.value);
    var id = taskPatch.caller.arguments[0].target.id
    console.log(id)
    $.getJSON( "/api/answer/", function ( answer ) {
    var score = answer.results.score + 1
    var patchData = {'score': score}
    jQuery.ajax({url:'/api/answer/' +  id + '/', data:patchData, dataType: 'jsonp', type:'PATCH'
}).done(function(results){})
})}


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
     text = Handlebars.Utils.escapeExpression(text);
     datatype = this.url.split('/');
     datatype = datatype[datatype.length-3]
       return '<a href="' + '/' + datatype + '/' + this.id + '">' + '<b>' + this.title + '</b>' + '</a>';
       return '<h2>' + this.text + '</h2>';
       console.log(this.text)
})

$("#votebuttonUp").click(taskPatch)

// function taskPatch(){
//     var j = document.getElementById("getID").value
//     var title = document.getElementById("title").value
//     var priority = document.getElementById("priority1").value
//     var status = document.getElementById("status1").value
//     var description = document.getElementById("addDesc1").value
//     var assignment = document.getElementById("assignment1").value
//     var patchData = {'title': title, 'status': status, 'priority': priority,
//                     'description': description, 'assignment': assignment}
//     jQuery.ajax({url:'/api/task/' +  j + '/', data:patchData, dataType: 'jsonp', type:'PATCH'
// }).done(function(results){})
// }
