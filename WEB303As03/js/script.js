/*
   WEB 303 Assignment 3 - AJAX & JQUERY
   {Patricia Bialek}
*/

//JSONPage() method to retrieve the JSON file + using a callback function to loop through the elements in the object using $.each()
//team is the name we given for the object
function JSONPage()
{
   $.getJSON('team.json', function(team)
   {
      $.each(team, function(index,value)
      {
         //elements to hold the teams data
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