$(document).on("ready", function() {
	$(".js-see-results").hide();

	$(".js-song-search").on("click", function() {
		event.preventDefault();
		findTracks();
		$(".js-see-results").show();
	});

	$(".btn-play").on("click", function() {
		$(".btn-play").toggleClass("playing");
		$('.js-audio-player').on('timeupdate', printTime);
		playPause();
	});

	$(".author").on("click", function() {
		$("#artists-modal").modal("show");
	});

	$(".js-see-results").on("click", function() {
		$("#more-results-modal").modal("show");
	});

	$(".js-all-tracks-list").on("click",".js-all-tracks-link", function() {
		var trackId = $(this).data("track-id");
		findNewTrack(trackId);
		$("#more-results-modal").modal("hide");
	})


});

// Find and Display Tracks ---------------------------------------
function findTracks() {
	var inputValue = $("#js-input-value").val();

	$.ajax({
		url: `https://api.spotify.com/v1/search?q=${inputValue}&type=track`,
		success: function(data) {
			// console.log(data);
			$(".js-search-form").trigger("reset");
			displayTracks(data.tracks.items[0]);
			
			var allTracks = data.tracks.items;
			displayAllTracks(allTracks);
			
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
	findArtists(artistId);
	
	var audioUrl = track.preview_url;
	addAudio(audioUrl); 
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
	// console.log(artist);
	$(".js-artist-header").text(artist.name);
	$(".js-artist-image").prop("src", `${artist.images[0].url}`);
	$(".js-artist-popularity").text(artist.popularity);
	$(".js-artist-followers").text(artist.followers.total);
	$(".js-artist-genre").text(artist.genres[0]);
};

// Display and Play a New See Results Track
function displayAllTracks(tracks) {
	// console.log(tracks);
	tracks.forEach(function(track) {
		var html =`
		<li>
			<a href="#" class="js-all-tracks-link" data-track-id="${track.id}">${track.name}</a>
			<p><strong>Artist:</strong> ${track.artists[0].name}</p>
		</li>`
		$(".js-all-tracks-list").append(html);
	});
};

function findNewTrack(id) {
	// console.log(id);
	$.ajax({
		url: `https://api.spotify.com/v1/tracks/${id}`,
		success: function(data) {
			// console.log(data);
			playNewTrack(data)
		},
	});
};

function playNewTrack(track) {
	$(".title").append(track.name);
	$(".author").text(track.artists[0].name);
	$(".js-image").prop("src", `${track.album.images[0].url}`);

	var artistId = track.artists[0].id;
	findArtists(artistId);
	
	var audioUrl = track.preview_url;
	addAudio(audioUrl); 
};




