$(document).ready(function() {
	var response = [];
	setInterval(function() {
		var d = new Date(); // for now
		var hour = d.getHours(); // => 9
		var minute = d.getMinutes(); // =>  30
		var second = d.getSeconds(); // => 51

		if (hour.toString().length == 1 || minute.toString().length == 1 || second.toString().length == 1) {
			if (hour.toString().length == 1) {
				hour = '0' + hour;
			}
			if (minute.toString().length == 1) {
				minute = '0' + minute;
			}
			if (second.toString().length == 1) {
				second = '0' + second;
			}
		}
		var result = '' + hour + minute + second;
		var time = hour + ':' + minute + ':' + second;
		var hexacode = '#' + hour + minute + second;

		$('#time').html('Current time : ' + time);
		$('#hexacode').html('Hexadecimal Code : ' + hexacode);

		$('.top-left').css('background-color', '#' + result);
	}, 1000);

	$.getJSON(
		'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',
		{
			tags: 'mountain',
			tagmode: 'any',
			format: 'json'
		},
		function(data) {
			var content = '';
			for (var x = 0; x < data.items.length && x < 10; x++) {
				response.push(data.items[x].media.m);
				content +=
					' <img src=' +
					data.items[x].media.m +
					' alt="" width="100%" height="330" class="image_click" data-image_path=' +
					data.items[x].media.m +
					' />';
			}

			$('#imgGallary').html(content);

			var imgLen = document.getElementById('imgGallary');
			var images = imgLen.getElementsByTagName('img');
			var counter = 1;

			if (counter <= images.length) {
				setInterval(function() {
					images[0].src = images[counter].src;

					counter++;

					if (counter === images.length) {
						counter = 1;
					}
				}, 3000);
			}
		}
	);

	$(document).on('click', '#play', function() {
		var x = document.getElementById('myAudio');
		x.play();
	});

	$(document).on('click', '#stop', function() {
		var x = document.getElementById('myAudio');
		x.pause();
	});

	$(document).on('click', '.image_click', function() {
		var image_url = $(this).attr('data-image_path');
		window.location.href = image_url;
	});

	myMap();

	function myMap() {
		var mapProp = {
			center: new google.maps.LatLng(51.508742, -0.12085),
			zoom: 5
		};
		var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
	}
});
