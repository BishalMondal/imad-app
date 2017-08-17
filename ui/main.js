//counter code

var button = document.getElementById('counter');


button.onclick = function(){
    //Create a requset object
    var request = new XMLHttprequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readystate === XMLHttprequest.DONE){
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
