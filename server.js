var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'bishalmondal2015',
    database: 'bishalmondal2015',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};

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
                ${date.toDateString()}
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

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
    //make a select request
    //return a response withthe result
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    
    });
});

var counter = 0;
app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {// /submitn-name?name = xxxx
    //get the name from the request
    var name = req.query.name;
    
    names.push(name);
    //JSON = Javascript object Notation
    res.send(JSON.stringify(names));
  
});


app.get('/articles/:articleName', function(req, res){
    //articleName = Article-one
    //articles[articleName] == {} content object for article one
    var articleName = req.params.articleName;
    //SELECT * FROM article WHERE title = 'Article-one'
    pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'" , function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(404).send('Article not found');
            }
            else{
                var articleData = result.rows[0];
                res.send(createtemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
