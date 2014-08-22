
;(function ( $, window, document, undefined ) {
	// Create the defaults once
    var pluginName = "arrowSwing",
        defaults = {
            duration: 350
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {

    	// Place initialization logic here
        // We already have access to the DOM element and
        // the options via the instance, e.g. this.element 
        // and this.options

    	var element = $(this.element)
    	, options = this.options
    	, cur = element.find('.nav-item.cur')
    	, arrow = element.append('<div class="arrow left"></div>').find('.arrow');

    	arrow.show().css({
			'top': cur[0].offsetHeight / 2 + 'px',
			'margin-top': 0 - arrow[0].offsetHeight / 2 + 'px'
		});

		$(document).on('click', '.nav-item a', function (e) {
			me = $(this)
			action = this.href
			pushParams = me.attr('rel')
			if (action == $('#request').data('request-uri')) {
				return false
			}
			$navItem = me.closest('.nav-item')
			t = this.offsetTop + this.offsetHeight / 2
			$.ajax({
				// type:'POST',
				url:action,
				dataType:'html',
				beforeSend:function (jqXHR,settings) {
					$('#request').append('<div class="loading">loading...</div>');
					if ($('#progress').size()) {
						$('#progress').stop().animate({
							width:'60%'
						},800)
					}else {
						$('<div id="progress"></div>')
						.appendTo('body')
						.stop().animate({
							width:'60%'
						},800)
					}
					
				},
				success:function (data,textStatus,jqXHR) {
					$('#request').data({ 'request-uri': action })
					$('#request').html('<div id="request-info" class="request-info"></div>')
					$('#request-info').html(data).fadeIn(500)
					arrow.stop().animate({
						'top':t
					},{
						duration: options.duration || $.fn.arrowSwing.defaults.duration,
						easing: ($.easing && options.easing) ? options.easing : null
					})
					$('.nav-item').removeClass('cur')
					$navItem.addClass('cur')
					window.location.hash = $navItem.attr('item-id')
					// history.pushState && history.pushState({}, document.title, '?page=' + pushParams)
					$('#progress').stop().animate({
						width:'100%'
					},800,function () {
						$(this).remove()
					})
				},
				error:function (jqXHR,textStatus,errorThrown) {
					console.log(jqXHR)
					console.log(textStatus)
					console.log(errorThrown)
				},
				complete:function (jqXHR,textStatus) {
					// body...
				}
			})
			e.preventDefault()
		})
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Plugin( this, options ));
            }
        });
    }
})( jQuery, window, document );