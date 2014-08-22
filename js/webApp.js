
(function ( $, window, document, undefined ) {
	var webApp = (function() {
		return {
			utils: {

				// 唯一标识
				guid: function(){
				  return 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				    return v.toString(16);
				  }).toUpperCase();      
				},

				match: function (string, word) {
					var len = string.length;
					var sub = word.substr(0, len);
					return string.toUpperCase() === sub.toUpperCase();
				},

				//获得url中某参数的值
	            getQueryString: function(name) {
				    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");  
				    if (reg.test(location.href)){
				    	return unescape(RegExp.$2.replace(/\+/g, " "));
				    }
				    return "";
				}, 

	            //获得web应用contextPath
	            getBasePath: function() {
	            	var loc = window.location
	            	, part_0 = loc.href
	            	, part_1 = loc.protocol + '//'
	            	, part_2 = loc.host
	            	, part_3 = loc.pathname
	            	, part_4 = part_1 + part_2 + part_3
	            	, position = part_4.lastIndexOf('/')
	            	, basepath = part_0.substring(0, position);
	        		return basepath
	            },

	            isCrossDomain:function (url) {
	            	var loc = top.location, protocol = loc.protocol + '//', host = loc.host, patt = new RegExp('^' + protocol + host);
	            	if (patt.test(url)) {
	            		return false
	            	}else{
	            		return true
	            	}
	            },

	            // 异步载入javascript
				loadScript: function (scripts,callback) {
				   if(!scripts instanceof Array){
						scripts = [scripts] //传入单个url时数组不必
				   }
				   var s = [], last = scripts.length - 1,
				   head = document.getElementsByTagName('head')[0] || document.documentElement,
				   callback = callback || function() {};
				   function recursiveLoad(i) { //递归
				       s[i] = document.createElement('script');
				       s[i].type = 'text/javascript';
				       s[i].src = scripts[i];
				       s[i].onload = s[i].onreadystatechange = function() {
				           if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
				           		this.onload = this.onreadystatechange = null;
								// this.parentNode.removeChild(this);
								if(i !== last){
									recursiveLoad(i + 1)
								}else{
									callback()
								}
				           }
				       }
				       head.appendChild(s[i])
				   }
				   recursiveLoad(0)
				},

				getDateAsYmd: function(){
					var time = new Date()
				    , y = time.getFullYear()
				    , m = time.getMonth() + 1
				    , d = time.getDate();

				    if( m < 10 ){ m = '0' + m }
				    if( d < 10 ){ d = '0' + d }

				    return y + '-' + m + '-' + d;
				},

				showTips: function(opts) {
					opts = opts || {}
					var guid = this.guid();
					var iconCls = opts.iconCls || 'icon-tip';
					var tipsbar = $([
						'<div class="tips-bar" id="'+guid+'">',
							'<div class="tips-texture-line"></div>',
							'<div class="tips-icon '+iconCls+'"></div>',
							'<div class="tips-msg">'+opts.tips+'</div>',
							'<a class="tips-handler" href="javascript:;" hidefocus>我知道了</a>',
						'</div>'
					].join(''))
					.appendTo(top.document.body)
					.show()
					.stop()
					.animate({bottom:0,opacity:1},400,autoHide);

					$('#'+guid).find('.tips-handler').on('click',removeTips);

					function removeTips() {
						$('#'+guid)
						.stop()
						.animate({bottom:-50,opacity:0},250,function () {
							$('#'+guid).remove()
						})
					}

					function autoHide() {
						if (opts.autoHide && opts.autoHide == true) {
							setTimeout(removeTips, opts.duration || 5000)
						}
					}
				}
			}
		}
	})();
	window.webApp = window._ = webApp;
})( jQuery, window, document );