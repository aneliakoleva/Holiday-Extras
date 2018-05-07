let $galleryContainer = $('.gallery-container');
let infiniteLoading = false;

var script = document.createElement('script');
script.src = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
document.querySelector('head').appendChild(script);

window.jsonFlickrFeed = function(data) {
	data.items.map(function(item, index) {

		var imageTitle = '';
		if (item.title.length) {
			if (item.title != ' ') {
				imageTitle = item.title;
			} else {
				imageTitle = '[No Image Title]';
			}
		} else {
			imageTitle = '[No Image Title]';
		}

		var authorName = '';
		if (item.author.length) {
			authorName = item.author
				.replace('nobody@flickr.com', '')
				.replace('("', '')
				.replace('")', '')
		} else {
			authorName = '[No Author Name]'
		}

		var imageTags = '';
		if (item.tags.length) {
			imageTags = item.tags.split(' ').join(', ');
		} else {
			imageTags = 'No tags.';
		}

        $galleryContainer.append(
            "<div class=\"col-sm-6 col-md-4 col-lg-3\"" + ">"
                + "<div class=\"image-item\"" + ">"
                    + "<div class=\"image-container\" style=\"background-image: url('" + item.media.m + "')\"" + "></div>"
                    + "<div class=\"image-descr\""+">"
                        + "<a target=\"_blank\" href=\"" + item.link + "\">" + imageTitle + "</a>"
	                    + " by <a target=\"_blank\"href=\"https://www.flickr.com/photos/" + item.author_id + "/\">" + authorName + "</a> <br/>"
                        + "<div class=\"image-tags\">Tags: " + imageTags + "</div>"
                    + "</div>"
                + "</div>"
            + "</div>");
	})

	// Description: ${item.description} <br/>
	infiniteLoading = false;
	checkScrolledToBottom();
}

let checkScrolledToBottom = function() {
	if ($(window).scrollTop() + $(window).height() > $galleryContainer.offset().top + $galleryContainer.outerHeight() - 300) {
		infiniteLoading = true;
		var script = document.createElement('script');
		script.src = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';

		document.querySelector('head').appendChild(script);
	}
}

$(window).scroll(function() {
	if (!infiniteLoading) {
		checkScrolledToBottom();
	}
});
