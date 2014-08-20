
(function($) { 

var 
props = [
	
],

selectors = [
	'.grid' || '[role=grid]' || '[data-grid=true]' || {},
	'.checkbox-header' || '[role=checkbox-header]' || '[data-checkbox-header=true]' || {},
	'.checkbox:checked' || '[role=checkbox]:checked' || '[data-checkbox=true]:checked' || {},
	'.checkbox' || '[role=checkbox]' || '[data-checkbox=true]' || {},
	'.remove-btn' || '[role=remove-btn]' || '[data-remove-btn=true]' || {},
	'.remove-selection-btn' || '[role=remove-selection-btn]' || '[data-remove-selection-btn=true]' || {}
];

$.fn.simpleGrid = function (options) {

	if (!this.length) {
        console.log('element not found');
        return this;
    }

	options = $.extend( true, {}, $.fn.simpleGrid.defaults, options || {} )

	$(document)
	.on('click', selectors[1], toggleCheckheader)
	.on('click', selectors[3], toggleCheckbox)
	.on('click', selectors[4], removeRow)
	.on('click', selectors[5], removeSelectionRow)

	function toggleCheckheader () {
		var checkboxheader = $(this),
		context = checkboxheader.closest(selectors[0]),
		checkbox = context.find(selectors[3]);
		checkboxheader.prop('checked') ?
		checkbox.prop('checked',true) :
		checkbox.prop('checked',false)
	}

	function toggleCheckbox () {
		var context = $(this).closest(selectors[0]),
		checkboxheader = context.find(selectors[1]),
		checkedSize = context.find(selectors[2]).size(),
		checkboxSize = context.find(selectors[3]).size();
		checkedSize == checkboxSize ?
		checkboxheader.prop('checked',true) :
		checkboxheader.prop('checked',false)
	}

	function removeRow (e) {
		$(this).closest('tr').remove()
		e.preventDefault()
	}

	function removeSelectionRow (e) {
		var selectionRow = $(this).closest(selectors[0]).find(selectors[2]).closest('tr')
		if (!selectionRow.size()) {
			showTips({
				txt:'请选择要删除的记录',
				width:200,
				height:200,
				duration:300
			})
			return false
		}
		selectionRow.remove()
		e.preventDefault()
	}

	function showTips (opts) {
		var docEl = document.documentElement
		var docWidth = docEl.offsetWidth
		var docHeight = docEl.offsetHeight
		opts = opts || {}
		$(document.body).append('<div class="mask"></div>')
		$(document.body).append('<div class="tips"></div>')
		$('.tips').html(opts.txt + '<a class="x" href="javascript:;">×</a>')
		$('.mask').show()
		$('.tips').show()
	}

	return this.each(function () {
		var $this           = $(this),
		$checkboxheader     = $this.find(selectors[1]),
		$checked            = $this.find(selectors[2]),
		$checkbox           = $this.find(selectors[3]),
		$removebtn          = $this.find(selectors[4]),
		$removeselectionbtn = $this.find(selectors[5])
		if(!$checkbox.size()){
			$checkboxheader.prop('disabled',true)
		}
	})
	
	
}

$.fn.simpleGrid.defaults = {
	data:123
}

})(jQuery);