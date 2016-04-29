$(document).on("ready", function() {
	$(".js-song-search").on("click", function() {
		event.preventDefault();
		findTracks();
	});

	$(".btn-play").on("click", function() {
		$(".btn-play").toggleClass("playing");
		$('.js-audio-player').on('timeupdate', printTime);
		playPause();
	});

	$(".author").on("click", function() {
		$("#artists-modal").modal("show");
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
	// console.log(track);
	$(".title").append(track.name);
	$(".author").text(track.artists[0].name);
	$(".js-image").prop("src", `${track.album.images[0].url}`);
	var artistId = track.artists[0].id;
	var audioUrl = track.preview_url;
	addAudio(audioUrl); 
	findArtists(artistId);
};

function addAudio(url) {
	$(".js-audio-player").prop("src", `${url}`);
};

// Play & Pause Audio and TimeUpdate Bar -------------------------------------------
function playPause() {
	if ($(".btn-play").hasClass("playing") === false) {
		$(".js-audio-player").trigger("pause");
	} else {
		$(".js-audio-player").trigger("play");
	};
};

function printTime() {
	var current = $(".js-audio-player").prop('currentTime');
	$("progress").prop("value", current)
};

// Find and Display Artist Information ----------------------------------
function findArtists(id) {
	$.ajax({
		url: `https://api.spotify.com/v1/artists/${id}`,
		success: function(data) {
			displayArtist(data);
		},
		error: function(error) {
			console.log("ERROR");
		},
	});
};

function displayArtist(artist) {
	console.log(artist);
	$(".js-artist-header").text(artist.name);
	$(".js-artist-image").prop("src", `${artist.images[0].url}`);
	$(".js-artist-popularity").html(`<br><p><em>Popularity:<em> ${artist.popularity}</p>`);
	$(".js-artist-followers").html(`<p><em>Followers:</em> ${artist.followers.total}</p>`);
	$(".js-artist-genre").html(`<p><em>Genre:<em> ${artist.genres[0]}</p>`);
};
