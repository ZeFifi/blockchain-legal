var scroll = new SmoothScroll('[href="#cabinet"], [href="#prestations"], [href="#team"], [href="#cabinet"], [href="#blog"], [href="#trust"], [href="#contact"]');

$(function () {
	var $content = $('#jsonContent');
	var data = {
		rss_url: 'https://medium.com/feed/@BCLavocats/'
	};
	$.get('https://api.rss2json.com/v1/api.json', data, function (response) {
		if (response.status == 'ok') {
			var output = '';
			$.each(response.items, function (k, item) {
				var visibleSm;
				if(k < 3){
					visibleSm = '';
				 } else {
					 visibleSm = ' visible-sm';
				 }
				output += '<div class="col-md-12 col-lg-4' + visibleSm + '">';
				output += '<div class="card mb-4"><header>';
				// output += '<h4 class="date">' + $.format.date(item.pubDate, "dd<br>MMM") + "</h4>";
				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
				output += '<div class="blog-element"><img class="card-img-top" src="' + src + '" width="360px" height="190px"></div></header>';
				output += '<div class="card-body"><h4><a target="_blank" href="'+ item.link + '">' + item.title + '</a></h4>';
				// output += '<div class="post-meta"><span>By ' + item.author + '</span></div>';
				var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
				var maxLength = 120 // maximum number of characters to extract
				//trim the string to the maximum length
				var trimmedString = yourString.substr(0, maxLength);
				//re-trim if we are in the middle of a word
				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
				output += '<p>' + trimmedString + '...</p>';
				output += '</div></div></div>';
				return k < 2;
			});
			$content.html(output);
		}
	});
});

// LANGUAGE SWITCHER

var lang = new Lang();
lang.dynamic('en', 'js/langpack/en.json');
lang.init({
  defaultLang: 'fr',
  allowCookieOverride: true
});