var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = { 
    'Article-one' : {
        title: 'Article One | Bishal Mondal' ,
        heading: 'Article One' ,
        date: '13th August, 2017',
        content: `<p>
                        This is article one. This is article one. This is article one. This is article one. This is article one.This is article one.This is article one.This is article one.
                   </p>
                    
                    <p>
                        This is article one. This is article one. This is article one. This is article one. This is article one.This is article one.This is article one.This is article one.
                    </p>` ,
        
    },
    'Article-two' : {
        title: 'Article Two | Bishal Mondal' ,
        heading: 'Article Two' ,
        date: '14th August, 2017',
        content: `<p>
                        This is article two.  This is article two.  This is article two.  This is article two.  This is article two.  This is article two.  This is article two. 
                   </p>
                    
                    <p>
                         This is article two.  This is article two.  This is article two.  This is article two.  This is article two.  This is article two.  This is article two. 
                    </p>` ,
    
    },
    'Article-three' : {
        title: 'Article Three | Bishal Mondal' ,
        heading: 'Article Three' ,
        date: '15th August, 2017',
        content: `<p>
                        This is article three.  This is article three.This is article three.This is article three.This is article three.This is article three.This is article three. 
                   </p>
                    
                    <p>
                        This is article three.This is article three.This is article three.This is article three.This is article three.This is article three.This is article three.
                    </p>` ,
        
    }
    
};

function createtemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
    
        <html>
    <head>
        <title>
            ${title}
        </title>
    
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            
            <hr/>
            
            <div>
            <h3>
                ${heading}
            </h3>
            </div>
            
            <div>
                ${date}
            </div>
            <div>
                ${content}
                
            </div>
        </div>
        
    </body>
    
    
</html>

    
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:Articlename', function(req, res){
    //articleName = Article-one
    //articles[articleName] == {} content object for article one
    var ArticleName = req.params.ArticleName;
    res.send(createtemplate(articles[ArticleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
