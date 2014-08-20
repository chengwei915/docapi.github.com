(function (window,undefined) {
	var webApp = (function () {
		var webApp = function () {
			this.name = 'webApp'
		}
		webApp.prototype = {
			constructor: webApp,
			init: function () {
				console.log(webApp)
				console.log(this)
				console.log(this.constructor)
			},
			more: function () {
				
			},
			getName: function () {
				return this.name
			},
			setName: function (name) {
				this.name = name
			}
		}
		return webApp = new webApp()
	})();
	window.webApp = window._ = webApp;
})(window);

