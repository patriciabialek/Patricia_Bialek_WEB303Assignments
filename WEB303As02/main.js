/*
   WEB 303 Assignment 2 - AJAX
   {Patricia Bialek}
*/

//When the user clicks on any of the 3 links in the #content-wrapper block, load the correct content into the #content div using AJAX.
$(function() {
   $('#prospect').on('click', function() {
      //Creates a new instance of XMLHttpRequest
      let xhr = new XMLHttpRequest();

      //.open method (setting up the request for the html page)
      xhr.open('GET','prospect.html',true);

      //onload function is called when the server responds (handles the response)
      xhr.onload = function() {
         if(xhr.status === 200) 
         {
            //if the request was successful
            //before loading new content, hide the div and use a callback function to run when the div is hidden
            //then replace the content using fadeIn
            $("#content").fadeOut('slow', function() {
               $("#content").html(xhr.responseText);
               $("#content").fadeIn('slow');
            });
         } 
         else 
         {
            //if there was an error
            $("#content").text("Error!");
         }
      };
      //initiates the sending of the request to the server
      xhr.send();
   });

   $('#convert').on('click', function(){
      let xhr = new XMLHttpRequest();

      xhr.open('GET','convert.html',true);

      xhr.onload = function() {
         if(xhr.status === 200) 
         {
            $("#content").fadeOut('slow', function() {
               $("#content").html(xhr.responseText);
               $("#content").fadeIn('slow');
            });
         } 
         else 
         {
            $("#content").text("Error!");
         }
      };
      xhr.send();
   });

   $('#retain').on('click', function(){

      let xhr = new XMLHttpRequest();

      xhr.open('GET','retain.html',true);

      xhr.onload = function() {
         if(xhr.status === 200) 
         {
            $("#content").fadeOut('slow', function() {
               $("#content").html(xhr.responseText);
               $("#content").fadeIn('slow');
            });

         } 
         else 
         {
            $("#content").text("Error!");
         }
      };
      xhr.send();
   });
});