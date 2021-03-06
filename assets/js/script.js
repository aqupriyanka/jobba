$(document).ready(function () {
		// Get user's IP
		jobba.getIP;
		// Print last search link
		jobba.lastSearchLocal.print();
		printSavedJobs();

	$('#feed, #saved-feed').on('click','.save-wrap',function(event){
		event.preventDefault();
		event.stopPropagation();
		var $t = $(this);
		
		// Icon Change
		$t.toggleClass('saved'); //How can we only only click this one time? - Novia

		// Check how many items are saved currently, if there are none
		// and this is the user's first save, trigger featureDiscovery
		// (Must do this before cloning listing, since it would obviously
		// have one after the cloning)
		var hasContent = $.contains( document.getElementById('saved-feed'), $('.listing'));
		console.log('hasContent',hasContent);
		if ( hasContent === false ) {
			// Show the feature discovery pop up
			$('.tap-target').tapTarget('open');
			// Bind click event to whatever it is being featured,
			// so when user does click, the element goes away
			// $('#saved-modal-trigger').on('click', function(event){
			$('#displayJobs').on('click', function(event){
				event.preventDefault();
				printSavedJobs();
				$('.tap-target').tapTarget('close');
			})
		}

		// If you are unsaving an already saved job
		if ( $t.attr('data-saved') === 'true' ) {
			// Check source id in listing data attribute
			var dataSource = $t.parents('.listing').attr('data-source');
			var dataSourceID = $t.parents('.listing').attr('data-source-id');
			
			// Navigate to chosen listing in the saved feed and remove
			var sel = '#saved-feed .listing[data-source-id="'+dataSourceID+'"]';
			console.log('sel',sel);
			$(sel).remove();

			// Change data-saved attribute to false
			$t.attr('data-saved','false');

			// Remove saved styling from normal feed
			var feedSel = $('#feed .listing[data-source-id="'+dataSourceID+'"] .save-wrap');
			feedSel.removeClass('saved');
			feedSel.attr('data-saved','false');
		}
		else { // When the listing had not been saved

			// Reset data attributes before clone
			$t.attr('data-saved','true');
			$t.parents('.listing').removeClass('active');
			$t.parents('.collapsible-header').removeClass('active');

			// Basically copy paste the saved listing into the saved feed
			// $(this).parents('.listing').clone().appendTo('#saved-feed');
			printSavedJobs(); // Novia: Trigger retrieval of jobs from Firebase accordingly to logged in userID

		}
		// Get listing data
		var thisListing = $(this).parents('.listing');
		var dataIndex = thisListing.attr('data-index');
		var saveData = jobba.allResults[dataIndex];
		console.log('saveData',saveData);

		saveJobs(saveData); 	// Was this you, Novia? I can't remember if I wrote this,
								// but I commented it out for now because it was getting an error
								// and stopping everything else

								// Novia: This calls the saveJobs function in login.js 
								// Need to log in on Github to trigger correctly. 
								// Commenting it out for now ;)




	}); // end listing click



	// Feature Function
	// $('#feed').on('click','.listing',function(event){
	// 	event.preventDefault();

	// 	// clear previous selection
	// 	$('.featured').removeClass('.featured');

	// 	// Add class to new selection
	// 	// $(this).toggleClass('featured');
	// 	$(this).addClass('featured');

	// 	// read listing index and fetch listing's data using index
	// 	var dataIndex = $(this).attr('data-index');
	// 	var data = jobba.allResults[dataIndex];


	// 	// Description
	// 	var description = data.description;
	// 	$('#ft-description').html(description);

	// 	// Company
	// 	var companyName = data.company;
	// 	$('#ft-company-name').text(companyName);

	// 	// Make room for feature container, and reveal
	// 	$('.filter-container').removeClass('col-md-offset-1');
	// 	$('.feature-container').show();

	// 	// Position feature display
	// 	var windowPos = $(window).scrollTop();
	// 	var bannerHeight = $('#banner').height();
	// 	// var containerPos = $('.feature-container').scrollTop();
	// 	var cushion = 105;
	// 	var featurePos = windowPos - bannerHeight - cushion;

	// 	if ( featurePos < 0 ) {
	// 		featurePos = 0
	// 	}
	// 	$('#feature').css('top', featurePos+'px');

	// }); // end listing click


// ------------------------------------------------------------ 


//  Body Navigation Pushpin
    $(window).on('scroll',function(event){
    	event.preventDefault();
	    var el = $('#main-body-nav');
	    var ref = $('#banner');
	    var targetEl = $('.pin-target');
	    var scrollPos = $(window).scrollTop();
	    var lastPos = scrollPos




	    if ( scrollPos >= ref.outerHeight()) {
	    	$('html').addClass('past-banner');
	    }
	    else {
	    	el.removeClass('pos-fixed');
	    	$('html').removeClass('past-banner');
	    }
    });


}); ////////////////////////////////////////// end document.ready