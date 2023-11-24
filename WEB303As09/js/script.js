/*
  WEB 303 Assignment 9 
  {Patricia Bialek}
*/

//generates HTML table structure
//characters: data from json file
function charTable(characters) {
  //create table element. Append tbody & thead to table
  let table = $("<table>").addClass("char-table");
  let tbody = $("<tbody>"); //groups body content
  let thead = $("<thead>"); //groups header content
  table.append(tbody);
  table.append(thead);

  //create the table header row (table rows)
  let tr = $("<tr>");

  //append rows with header cells(th) + append anchor tags
  tr.append(
    $("<th>")
      .attr("class", "sortRow")
      .append(
        $("<a>").attr("href", "#").attr("data-index", "0").text("First Name")
      ),
    $("<th>")
      .attr("class", "sortRow")
      .append(
        $("<a>").attr("href", "#").attr("data-index", "1").text("Last Name")
      ),
    $("<th>")
      .attr("class", "sortRow")
      .append(
        $("<a>").attr("href", "#").attr("data-index", "2").text("Date of Birth")
      ),
    $("<th>")
      .attr("class", "sortRow")
      .append(
        $("<a>")
          .attr("href", "#")
          .attr("data-index", "3")
          .text("Breathing Style")
      ),
    $("<th>")
      .attr("class", "sortRow")
      .append($("<a>").attr("href", "#").attr("data-index", "4").text("Gender"))
  );
  //append header rows to thead element
  thead.append(tr);

  //loop through each character
  $.each(characters, function (index, value) {
    //create row element
    let row = $("<tr>");

    //displays the content for each column (data cell)
    row.append(
      $("<td>").text(value.firstName),
      $("<td>").text(value.lastName),
      $("<td>").text(value.birthday),
      $("<td>").text(value.breathingStyle),
      $("<td>").text(value.gender)
    );

    //append to character row
    tbody.append(row);
  });

  //append the entire table to the id
  $("#tableContainer").append(table);

  //search function based on first name
  function search() {
    // Get the value of the search input and convert it to lowercase
    let searchTerm = $('#filter-search').val().toLowerCase();

    // Loop through each character row
    $('.char-table tbody tr').each(function () {
      // Get the first name of the current character row and convert it to lowercase
      let firstName = $(this).find('td:first-child').text().toLowerCase();
      // Check if the search term is not empty and if it is found in the first name
      let matchIndex = firstName.indexOf(searchTerm);

      if (searchTerm && matchIndex !== -1) {
        //// If the search term is found, highlight the row
        $(this).css('background-color', 'darkgreen').css('color', 'white');
      } else {
        // Revert back to origional color
        $(this).css('background-color', '').css('color', '#cf9fad');
      }
    });
  }

  // Filter function based on last name
  function filterLastNameAM(startRange, endRange){
    // Loop through each character row
    $('.char-table tbody tr').each(function () {
      // Get the last name of the current character row and convert it to lowercase
      let lastName = $(this).find('td:nth-child(2)').text().toLowerCase();
      // Create a regular expression to check if the last name starts with a letter between A and M
      let startsWithRange = new RegExp('^[a-' + endRange.toLowerCase() + ']').test(lastName);
      // Toggle the visibility of the row based on whether the last name starts with the specified range
      $(this).toggle(startsWithRange);
  });}

  function filterLastNameNZ(startRange, endRange){
    // Loop through each character row
    $('.char-table tbody tr').each(function () {
      let lastName = $(this).find('td:nth-child(2)').text().toLowerCase();
      // Create a regular expression to check if the last name starts with a letter between N and Z
      let startsWithRange = new RegExp('^[n-' + endRange.toLowerCase() + ']').test(lastName);

      $(this).toggle(startsWithRange);
  });}

  // Bind search function to input event
  $('#filter-search').on('input', search);

  // Bind filter buttons to click event
  $('.btn-1').on('click', function () {
      filterLastNameAM('A', 'M');
  });

  $('.btn-2').on('click', function () {
      filterLastNameNZ('N', 'Z');
  });
}

//output
$(function () {
  //the Output() function fetches the JSON data from the file.
  //using jquery ajax method to GET the file.
  //when successfull - parse the JSON response & call the table method
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "characters.json", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      //need to parse; convert JSON string into a JS object
      let characters = JSON.parse(xhr.responseText);
      //calls table method
      charTable(characters);
    } else {
      $("#tableContainer").text("Error!");
    }
  };
  xhr.send();
});
