
(function (window,undefined) {
	var webApp = (function () {
		var webApp = function () {
			this.name = 'webApp'
			this.version = '1.0.0'
			this.props = [
				'href',
				'request-url',
				'checked'
			]
		}
		webApp.prototype = {
			constructor: webApp,
			test: function () {
				console.log(webApp)
				console.log(this)
				console.log(this.constructor)
			},
			getName: function () {
				return this.name
			},
			setName: function (name) {
				this.name = name
			},
			array: {
				isInArray: function ( el, arr ) {
					var i = arr.length - 1
					for (; i >= 0; i--) {
						if ( arr[i] === el ) {
							return true
						}
					}
					return false
				},
				filterRepeat: function ( arr, eOpts ) {
					var len = arr.length, i = len - 1, result = []
					if ( len < 2 ) {
						return arr
					}
					for (; i >= 0; i--) {
						if ( !this.isInArray( arr[i], result ) ) {
							result.push( arr[i] )
						}
					}
					result.reverse()

					eOpts = eOpts || {}
					if ( eOpts.sort ) {
						result.sort()
					}
					return result
				},
				getRandomNumbers: function ( iStart, iEnd, count ) {
					var iArr = [],
					i = count - 1,
					iRange = iEnd - iStart + 1;
					if ( count > iRange ) {
						console.log('选取数量 count 已超出选取范围');
						return false;
					}
					for (; i >= 0; i--) {
						iArr.push( getRandomNumber () )
					}
					function getRandomNumber () {
						return Math.floor( Math.random() * iRange + iStart )
					}
					function sortByNumber ( a, b ) {
						return a - b
					}
					iArr.sort(sortByNumber);
					return iArr;
				}
			},
			printInfo:function(iStart,iEnd){
				var i = iEnd - iStart + 1;

				for (; i >= 1; i--) {
					if ( i % 3 == 0 ) {
						console.log('three')
					}else if (i % 5 == 0) {
						console.log('five')
					}else{
						console.log(i)
					}
					if ((i % 3 == 0) && (i % 5 == 0)) {
						console.log('three and five')
					}
				}
				
			},
			grid: {
				selectors: [
					'.grid' || '[role=grid]' || '[data-grid=true]' || {},
					'.checkbox:checked' || '[role=checkbox]:checked' || '[data-checkbox=true]:checked' || {},
					'.checkbox' || '[role=checkbox]' || '[data-checkbox=true]' || {},
					'.checkboxheader' || '[role=checkboxheader]' || '[data-checkboxheader=true]' || {},
					'.remove-btn' || '[role=remove-btn]' || '[data-remove-btn=true]' || {},
					'.removeSelection-btn' || '[role=removeSelection-btn]' || '[data-removeSelection-btn=true]' || {}
				],
				selectionIds: [],
				isCheckgrid: function () {
					var g = $(this.selectors[0]), c = this.selectors[2], ch = this.selectors[3], flag = false;
					if(!g.size()) {
						console.log('The selector of gridObject does not exist')
						return false
					}
					g.each(function () {
						flag = $(this).find(c).size() > 0 && $(this).find(ch).size() > 0
						console.log(flag)
					})
					return flag
				},
				init: function () {
					
				},
				initChecker: function () {
					var _this = this, ced = webApp.props[2]
					$(document)
					.on('click', _this.selectors[2], function () {
						var context = $(this).closest(_this.selectors[0]),
						checkedSize = context.find(_this.selectors[1]).size(),
						checkboxSize = context.find(_this.selectors[2]).size(),
						checkboxheader = context.find(_this.selectors[3]);
						checkedSize == checkboxSize ?
						checkboxheader.prop(ced,true) :
						checkboxheader.prop(ced,false)
					})
					.on('click', _this.selectors[3], function () {
						var checkboxheader = $(this),
						context = checkboxheader.closest(_this.selectors[0]),
						checkbox = context.find(_this.selectors[2]);
						checkboxheader.prop(ced) ?
						checkbox.prop(ced,true) :
						checkbox.prop(ced,false)
					})
				}
			},
			request: function (opts) {
				opts = opts || {}
				var action = opts.url,
				method = action.indexOf('?') != -1 ? 'GET' : 'POST',
				params = method == 'GET' ? null : opts.params,
				dataType = opts.dataType || 'json',
				callback = opts.callback || function () {},
				defaults = {
					url: action,
					type: method,
					data: params,
					success: callback,
					dataType: dataType
				},
				settings = $.extend( {}, defaults, opts );
				$.ajax(settings)
			},
			showTips: function (opts) {
				opts = opts || {}
				alert(opts.tips || '')
			},
			showPopup: function (opts) {
				opts = opts || {}
				var target = opts.target
				$(target).css({
					'top': opts.top + 'px',
					'left': opts.left + 'px',
					'width': opts.width + 'px',
					'height': opts.height + 'px'
				})
				$(target).show()
			},
			focusEl: function (el) {
				ipt = el ? $(el).eq(0) : $('input,select,textarea,button').filter(':visible:enabled').eq(0)
				if (ipt.attr('autofocus') == 'autofocus') {
					return false
				}
				ipt.focus() 
				
			},
			cookie: {
				rememberMe: function (form) {
					if ($.cookie('username')) {
						form.username.value = $.cookie('username')
						if ($.cookie('isRememberMe') && $.cookie('password')) {
							form.password.value = $.cookie('password')
							form.rememberme.checked = true
						}else {
							form.password.value = ''
							form.rememberme.checked = false
						}
					}else {
						form.username.value = ''
						form.password.value = ''
						form.rememberme.checked = false
					}

					function checkAvailable() {
						if (form.username.value != '' && form.password.value != '') {
							form.rememberme.disabled = false
						}else {
							form.rememberme.disabled = true
						}
					}
					checkAvailable()
					form.username.onkeyup = checkAvailable
					form.password.onkeyup = checkAvailable
					
					form.onsubmit = function () {
						var username = form.username.value,
							password = form.password.value,
							isRememberMe = form.rememberme.checked;
						if (username != '') {
							$.cookie('username', username, { expires: 7 })
							if (isRememberMe == true && username != '' && password != '') {
								$.cookie('password', password, { expires: 7 })
								$.cookie('isRememberMe', isRememberMe, { expires: 7 })
							}
							else {
								$.removeCookie('password')
								$.removeCookie('isRememberMe')
							}
						}
						else {
							$.removeCookie('username')
							$.removeCookie('password')
							$.removeCookie('isRememberMe')
						}
					}
				}
			}
		}
		return webApp = new webApp()
	})();
	window.webApp = window._ = webApp;
})(window);