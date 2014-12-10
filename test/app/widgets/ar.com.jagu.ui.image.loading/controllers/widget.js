var ImageLoading = {
	TAG : 'ar.com.jagu.ui.image.loading',
	//parent tss
	args : arguments[0] || {},
	xhr : Ti.Network.createHTTPClient(),
	//init widget
	initialize : function() {
		_.extend($.image, ImageLoading.args);
	},
	/**
	 * download and set image
	 * @param String url
	 * @param Filesystem file
	 */
	download : function(url, file) {
		//show loader
		$.loader.show();
		// create http client to download the image

		ImageLoading.xhr.setTimeout(30000);
		/**
		 * on load image
		 * @param {Object} response
		 */
		ImageLoading.xhr.onload = function(response) {
			Ti.API.debug(ImageLoading.TAG, 'onLoad(), response ->' + JSON.stringify(response));
			if (ImageLoading.xhr.status == 200 && ImageLoading.xhr.active) {

				file.write(ImageLoading.xhr.responseData);

				$.image.image = file.nativePath;
				$.loader.hide();
				//GC
				$.widget.remove($.loader);
			}
		};
		/**
		 * on response
		 * @param {Object} response
		 */
		ImageLoading.xhr.onerror = function(response) {
			Ti.API.debug(ImageLoading.TAG, 'onError(), response ->' + JSON.stringify(response));
		};
		/**
		 * on data stream
		 * @param {Object} response
		 */
		ImageLoading.xhr.ondatastream = function(response) {
			Ti.API.debug(ImageLoading.TAG, 'onDataStream(), response ->' + JSON.stringify(response));
		};

		ImageLoading.xhr.open('GET', url);
		ImageLoading.xhr.send();
		ImageLoading.xhr.active = true;
	},

	/**
	 * abort http request
	 */
	abort : function() {
		if (ImageLoading.xhr && ImageLoading.xhr.active) {
			ImageLoading.xhr.active = false;
			ImageLoading.xhr.abort();
		}
	},
	/* modified version of https://gist.github.com/1243697 */
	_getExtension : function(fn) {
		// from http://stackoverflow.com/a/680982/292947
		var re = /(?:\.([^.]+))?$/;
		var tmpext = re.exec(fn)[1];
		return (tmpext) ? tmpext : '';
	},
	remoteImage : function(a) {
		a = a || {};
		var md5;
		var needsToSave = false;
		var file;
		if (a.image) {
			md5 = Ti.Utils.md5HexDigest(a.image) + ImageLoading._getExtension(a.image);
			file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, md5);
			if (file.exists()) {
				a.image = file;
			} else {
				needsToSave = true;
			}
		}

		if (needsToSave === true) {
			ImageLoading.download(a.image, file);
		} else {
			_.extend($.image, a);
		}
	}
};

//public
exports.remoteImage = ImageLoading.remoteImage;
exports.abort = ImageLoading.abort;
//initialize
ImageLoading.initialize();
