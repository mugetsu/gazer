/*!
* Gazer v.1
* Author: Randell Quitain [@cprjk]
* Licensed under the MIT license
*/

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'gazer',
    defaults = {
        url: [],
        width: 52,
        gazer: '.gazed',
        ease: 'easeInOutBack'
    };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.start();
    }

    Plugin.prototype = {

    start: function(element, options) {

        var request = new XMLHttpRequest();

        request.addEventListener('progress', updateProgress, false);
        request.addEventListener('load', transferComplete, false);
        request.addEventListener('error', transferFailed, false);
        request.addEventListener('abort', transferCanceled, false);

        request.open('GET', this.options.url, true);
        request.send(null);

        options = this.options;

        // progress on transfers from the server to the client (downloads)
        function updateProgress (evt) {

        if (evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total) * 100,
            percentIntegrated = (percentComplete / 100) * options.width;

            $(options.gazer).stop(true).animate({
                width: percentIntegrated
            });
        } else {
            // when good men do nothing                    
        }
    }

    function transferComplete(evt) {
        console.log('The transfer is complete.');
    }

    function transferFailed(evt) {
        console.log('An error occurred while transferring the file.');
    }

    function transferCanceled(evt) {
        console.log('The transfer has been canceled by the user.');
    }

    },

    stop: function(element, options) {
        // when good men do nothing    
    },

    success: function(element, options) {
        // when good men do nothing    
    }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );