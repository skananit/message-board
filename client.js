// JavaScript File
/* global $*/
/* global URLSearchParams*/
/* global fetch*/
/* global ul*/
/* global Queue*/



//list where we place the history 
function createNode(element) {
      return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

// function takes in an array and display the items in in HTML list 
function display(array) 
{
    // add every item in array one by one to the list as a list item
    var item = "";
    for(var i = 0; i < array.length; i++)
        item += "<li>"+array[i]
    return item;
    
}



const url = 'https://message-board-skananit.c9users.io/api/webtech';


  $(document).ready(function(){
      
      fetch(url)
        .then((resp) => resp.json())
        .then(function(data) { 
            
            for (var n=0; n<data.length; n++){  
                
                var entries = document.createElement('li');
                entries.appendChild(document.createTextNode(data[n].name))

                if (data[n].course == "SE 3316")
                    $("#entries1").append(entries);
                else
                    $("#entries2").append(entries);
                
             }
             
            
        });
    
    
    $('#send1').click(function (){

    let data = {
        name: $('#se3316').val(),
        time: Date.now(),
        course: "SE 3316"
    }
    var encodeVar = new URLSearchParams(data);  //url form encoding 

    // The parameters we are gonna pass to the fetch function
    let fetchData = { 
    method: 'POST', 
    body: encodeVar,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    //getMessages() - make a function to add the last element
    var entries = document.createElement('li');
    entries.appendChild(document.createTextNode(data.name));
    $("#entries1").append(entries);
    
                
    fetch(url, fetchData)
    .then(function() {
})
.catch(function(error) {
                console.log(error);
            })
        });
  

$('#send2').click(function (){
    let data = {
        name: $('#se3313').val(),
        time: Date.now(),
        course: "SE 3313"
    }
    var encodeVar = new URLSearchParams(data);  //url form encoding 

    // The parameters we are gonna pass to the fetch function
    let fetchData = { 
    method: 'POST', 
    body: encodeVar,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    var entries = document.createElement('li');
    entries.appendChild(document.createTextNode(data.name));
    $("#entries2").append(entries);
    
   fetch(url, fetchData)
    .then(function() {
    })
    
     
   
})
.catch(function(error) {
                console.log(error);
            })
        });
   
    



