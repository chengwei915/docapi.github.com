
(function (window,undefined) {
	var webApp = (function () {
		var webApp = function () {
			this.name = 'webApp',
			this.version = '1.0.0'
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
						var _this = $(this)
						flag = _this.find(c).size() > 0 && _this.find(ch).size() > 0
					})
					return flag
				},
				init: function () {
					var _this = this;
					$(document)
					.on('click', _this.selectors[4], function () {
						var target = $(this),
						action = target.attr('href') || target.attr('request-url') || ''
						_this.remove({
							url: action,
							callback: function(response) {
								alert(response.msg)
								console.log(response)
							}
						})
						return false
					})
					.on('click', _this.selectors[5], function () {
						var target = $(this),
						action = target.attr('href') || target.attr('request-url') || '',
						checked = target.closest(_this.selectors[0]).find(_this.selectors[1]),
						i = checked.size() - 1;
						for (; i >= 0; i--) {
							_this.selectionIds.push(checked[i].id)
						}
						_this.remove({
							url: action,
							params: { ids: _this.getSelectionIds() },
							callback: function(response) {
								alert(response.msg)
								console.log(response)
							}
						})
						return false
					})
				},
				initChecker: function () {
					var _this = this
					$(document)
					.on('click', _this.selectors[2], function () {
						var context = $(this).closest('.grid')
						var checkedSize = context.find('.checkbox:checked').size()
						var checkboxSize = context.find('.checkbox').size()
						var checkboxheader = context.find('.checkboxheader')
						checkedSize == checkboxSize ?
						checkboxheader.prop('checked',true) :
						checkboxheader.prop('checked',false)
					})
					.on('click', _this.selectors[3], function() {
						var checkboxheader = $(this)
						var context = checkboxheader.closest('.grid')
						var checkbox = context.find('.checkbox')
						checkboxheader.prop('checked') ?
						checkbox.prop('checked',true) :
						checkbox.prop('checked',false)
					})
				},
				remove: function (opts) {
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
				removeSelection: function (opts) {
					// body...
				},
				getSelectionIds: function () {
					return this.selectionIds
				}
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