$(document).on("ready", function() {
	$(".js-song-search").on("click", function() {
		event.preventDefault();
		findTracks();
	});

	$(".btn-play").on("click", function() {
		$(".play-preview").trigger("play");
		$(".play-preview").
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
			$(".js-search-form").trigger("reset");
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
	var audioUrl = track.preview_url;
	playAudio(audioUrl);
};

function playAudio(url) {
	$(".js-audio-player").append(`<audio src="${url}" class="play-preview"></audio>`);
};
