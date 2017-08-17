//counter code

var button = document.getElementById('counter');


button.onclick = function(){
    //Create a requset object
    var request = new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //Not done yet
        
    };
    
    //Make a request
    request.open('GET', 'http://bishalmondal2015.imad.hasura-app.io/counter' , true);
    request.send(null);
    
};


var submit = document.getElementById('submit_bttn');
submit_bttn.onclick = function(){
    //Create a requset object
    var request = new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200){
                var names = request.responseText;
                names = JSON.pasre(names);
                 var list ='';
                 for(var i=0; i<names.length;  i++){
                      list +='<li>' + names[i] + '</li>';
                 }
                  
                 var ul = document.getElementById('name_list');
                 ul.innerHTML = list;
            }
        }
        //Not done yet
        
    };
    
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    //Make a request
    request.open('GET', 'http://bishalmondal2015.imad.hasura-app.io/submit-name?name=' + name , true);
    request.send(null);
    
    
    
    
};
//Submit name



s