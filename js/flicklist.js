

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "65b073e78911ae5c8f4fdd144d9d960f" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			model.browseItems = response.results
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
	$('section-watchlist ul').empty()
	$('section-browse ul').empty()
  
  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
		
		let listItem = $('<li></li>').text(movie.title)

    //let button = $('<input type="button" value="Add to Watchlist" />')
    //button.click((event)=>addToWatchlist(movie)) // TODO 5
		//listItem.append(button)  // TODO 4
		
		$('section-watchlist ul').append(listItem) // TODO 3
		
	
  });



  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		
		let listItem = $('<li></li>').text(movie.title)

    let button = $('<input type="button" value="Add to Watchlist" />')
    button.click((event)=>addToWatchlist(movie)) // TODO 5
		listItem.append(button)  // TODO 4
		
		$('section-browse ul').append(listItem) // TODO 3
		
	
  });
  

function addToWatchlist(movie){
	   model.watchlistItems.push(movie)
		 render()
}


}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

