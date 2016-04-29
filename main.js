$(document).on("ready", function() {
	$(".js-song-search").on("click", function() {
		event.preventDefault();
		findTracks();
	});

});

// Find and Display Tracks ---------------------------------------
function findTracks() {
	var inputValue = $("#js-input-value").val();

	$.ajax({
		url: `https://api.spotify.com/v1/search?q=${inputValue}&type=track`,
		success: function(data) {
			// console.log(data);
			displayTracks(data.tracks.items[0]);
		},
		error: function(error) {
			console.log("ERROR");
		},
	});
};

function displayTracks(track) {
	console.log(track);
	$(".title").append(track.name);
	$(".author").append(track.artists[0].name);
	$(".cover").append(`<img src="${track.album.images[0].url}">`);
};