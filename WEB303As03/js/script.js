/*
   WEB 303 Assignment 3 - AJAX & JQUERY
   {Patricia Bialek}
*/

//JSONPage() method to retrieve the JSON file + using a callback function to loop through the elements in the object using $.each()
//team is the name we given for the object
function JSONPage()
{
   //Using JQuery to create a GET request to fetch data from the team.json file 
   //if successful a use callback function with param team that holds all the data in the JSON page
   $.getJSON('team.json', function(team)
   {
      //.each takes 2 arguments index/value
      $.each(team, function(index,value)
      {
         //create variables to append team data with html elements 
         //only using value not index b/c value hold the data
         let name = $('<h2>' + value.name + '</h2>');
         let position = $('<h5>' + value.position + '</h5>');
         let bio = $('<p>' + value.bio + '</p>');
         //append the new tags to the div 
         $('#team').append(name, position, bio);
      });
   });
}

function retrieveData() 
{
   $.ajax({
      type: "GET", //get or post
      url: "team.json",
      dataType: "json",
      timeout: 2000, //waiting time
      //before we send the request
      beforeSend: function () 
      {
         //before ajax loads
         $("#team").text("Loading...");
      },
      error: function () 
      {
         //could not retrieve content
         $("#team").text("Error, content could not be retrieved");
      },
      //request is successful 
     success: function (team) 
     {
         //remove loading...
         //dont use .remove(), will remove id
         $('#team').empty();
         //display content
         $.each(team, function (index, value) 
         {
            let name = $("<h2>" + value.name + "</h2>");
            let position = $("<h5>" + value.position + "</h5>");
            let bio = $("<p>" + value.bio + "</p>");
 
            $("#team").append(name, position, bio);
         });
      }
   });
}

$(function() {
   //call one of the methods
   retrieveData();
   //JSONPage();
});
