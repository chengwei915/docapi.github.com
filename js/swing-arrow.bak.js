
;(function ( $, window, document, undefined ) {
	$.fn.arrowSwing = function (options) {
		options = $.extend( {}, $.fn.arrowSwing.defaults, options || {} )
		return this.each(function () {
			$this = $(this)
			var $cur = $this.find('.nav-item.cur'),
			$arrow = $this.append('<div class="arrow left"></div>').find('.arrow');
			console.log($cur)
			$arrow.show().css({
				'top':$cur[0].offsetHeight / 2 + 'px',
				'margin-top': 0 - $arrow[0].offsetHeight / 2 + 'px'
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
					type:'POST',
					url:action,
					dataType:'html',
					beforeSend:function (jqXHR,settings) {
						$('#request').append('<div class="loading">loading...</div>');
						if ($('#progress').size()) {
							$('#progress').stop().animate({
								width:'60%'
							},1000)
						}else {
							$('<div id="progress"></div>').css({
								top:0,
								width:0,
								height:'4px',
								position:'absolute',
								background:'#f00',
								zIndex:100000
							}).appendTo('body').stop().animate({
								width:'60%'
							},1000)
						}
						
					},
					success:function (data,textStatus,jqXHR) {
						$('#request').data({ 'request-uri': action })
						$('#request').html('<div id="request-info" class="request-info"></div>')
						$('#request-info').html(data).fadeIn(500)
						$arrow.stop().animate({
							'top':t
						},{
							duration: options.duration || $.fn.arrowSwing.defaults.duration,
							easing: ($.easing && options.easing) ? options.easing : null
						})
						$('.nav-item').removeClass('cur')
						$navItem.addClass('cur')
						// history.pushState && history.pushState({}, document.title, '?page=' + pushParams)
						$('#progress').stop().animate({
							width:'100%'
						},1000,function () {
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


		})
	}
	$.fn.arrowSwing.defaults = {
		duration:350
	}
})(jQuery, window, document);