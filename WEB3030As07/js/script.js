/*
  WEB 303 Assignment 7 
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

  //store the original rows
  let originalRows;
  originalRows = $("#tableContainer tbody").html();

  //sorting logic
  function Sort() {
    //1. Array to store sorting directions (ASC/DESC) for each column
    //2. Keeps track of how many times a column header has been clicked
    let sortDirections = [];
    let hClickCount = 0;

    //click event handler for <a> in table headers
    $(".sortRow a").on("click", function (e) {
      //prevents the browser from navigating to a different page (<a>).
      e.preventDefault();

      //retrieves the data-index attribute from the clicked <a> tag. The coloumn that was clicked on(ex. 0 = FirstName).
      let clickedColumn = $(this).data("index");

      //how many times a column has been clicked
      hClickCount++;

      //checks if there is already a sorting direction stored.
      //If not, initializes to 1 (ASC order). if a column is clicked for the first time, sorted in ASC order.
      //not needed only to ensure that the sorting direction is always properly initialized
      if (!sortDirections[clickedColumn]) {
        sortDirections[clickedColumn] = 1;
      }

      //Removes previous arrow
      $(".sortRow a span").remove();

      //new <span> element is created for arrow
      let arrow = $("<span>");

      // Determine sorting direction based on click count
      //1. remainder of hCC divided by 3 is 0. Means that the user has clicked for the third time. Revert the table back to its original state.
      //2. remainder of hCC divided by 3 is 2. Indicates that it's the second click on the column header.
      //-1 - sets the sorting direction for the clicked column to descending order.
      //3. if none of the previous conditions are met, the user has clicked on the column header for the first time.
      if (hClickCount % 3 === 0) {
        $("#tableContainer tbody").html(originalRows);
        return; // immediately exits the function
      } else if (hClickCount % 3 === 2) {
        sortDirections[clickedColumn] = -1; // Desc
        arrow.html("&#x25BC;");
      } else {
        sortDirections[clickedColumn] = 1; // Asc
        arrow.html("&#x25B2;");
      }

      // Get a copy of the rows
      let rows = tbody.find("tr").clone();

      //1. sorts the rows based on comparison. takes two parameters a and b which represent two rows to be compared.
      //2. retrieves the text content of the selected column in row a, then b.
      rows.sort(function (a, b) {
        let aValue = $(a).find("td").eq(clickedColumn).text();
        let bValue = $(b).find("td").eq(clickedColumn).text();

        //sorting of dob column
        //creating dob objects
        if (clickedColumn === 2) {
          let aDate = new Date(aValue);
          let bDate = new Date(bValue);

          //checks if both aDate and bDate are valid Date objects
          if (!isNaN(aDate) && !isNaN(bDate)) {
            // If both dates are valid, compare them directly
            aValue = aDate;
            bValue = bDate;
            return (aDate - bDate) * sortDirections[clickedColumn];
          } else {
            //If dates are not valid, compare them as strings
            aValue = aValue.toString();
            bValue = bValue.toString();
          }
        }
        //compares two strings, aValue and bValue, and returns a number indicating their relative order.
        //If aValue comes before bValue, it returns a negative number. If they are equal, it returns 0. If aValue comes after bValue, it returns a positive number.
        //multiplies the result of the localeCompare function by the sorting direction for the clicked column. If sortDirections[clickedColumn] is 1 (ASC)
        //If it's -1 (DESC)
        //localeCompare - string method that is used to compare two strings. It takes a single argument, which is the string to compare against.
        //If the string calling the method (aValue in this case) comes before the argument string (bValue), it returns a negative number.
        //If the two strings are equal, it returns 0.
        //If the argument string comes before the calling string, it returns a positive number.
        return aValue.localeCompare(bValue) * sortDirections[clickedColumn];
      });
      //updates the content of the <tbody> element
      tbody.empty().append(rows);
      //appends the arrow element to the clicked <a> element.
      $(this).append(arrow);
    });
  }
  //call the sort function
  Sort();
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
