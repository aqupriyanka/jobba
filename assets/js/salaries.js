


$(document).ready(function(){


		

$('#submit').on('click',function(event){

	event.preventDefault();


	// var uIP, uBrowser;

	var searchTerm = $('#search').val().trim();
	var qURL = 'http://api.glassdoor.com/api/api.htm?t.p=151095&t.k=dSWk91gUjq3&userip=192.168.1.190&useragent=&format=json&v=1&action=jobs-prog&countryId=1&jobTitle='+searchTerm;
	
	$.ajax({
		type:'GET',
		url: qURL,
	}).done(function(result){
		

		console.log('done',result);
		console.log('Title: ' + result.response.jobTitle)
	var payHigh = result.response.payHigh;
	var payLow = result.response.payLow;
	var payMedian = result.response.payMedian;

	console.log("pay high, low, median "+ payHigh +" "+ payLow + " "+ payMedian);

	}).fail(function(){
		console.log('fail', qURL.result);
	});

});

});