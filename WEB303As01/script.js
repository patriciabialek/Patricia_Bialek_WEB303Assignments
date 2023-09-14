'use strict';
/*
	WEB 303 Assignment 1 - jQuery
	{Patricia Bialek}
*/
//Event: calculate the amount you can spend on tech, with a dollar sign, and insert it into the #amount element using jQuery.
//$(function(){}) method check that the page is ready for your code to work with.
$(function() {
	$('#yearly-salary, #percent').on('keyup', function() {

		//convert from string to int
		//val() method in jQuery that is used to return or set the value of attributes for the selected elements.
		let $salary = Number($('#yearly-salary').val());
		let $percent = Number($('#percent').val());

		//grab #amount id
		let $amount = $('#amount');

		//calculation
		//The toFixed() method rounds the string to a specified number of decimals.
		$amount = ($salary*$percent/100).toFixed(2);

		//change the previous text to output new one
		$('#amount').text('$' + $amount);
	});
});