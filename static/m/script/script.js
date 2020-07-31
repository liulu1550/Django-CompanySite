// $(function() {
// 	$('nav#menu').mmenu({
// 		extensions	: [ 'effect-slide-menu', 'pageshadow' ],
// 		searchfield	: true,
// 		counters	: true,
// 	});
// });
// $(document).ready(function(e) {
// 	var img = $(".slider img")[0];
// 	function sliderChulaiba(){
// 		$('.slider').bxSlider({
// 			nextText: '<i class="fa fa-angle-right"></i>',
// 			prevText: '<i class="fa fa-angle-left"></i>',
// 			auto: 1,
// 			speed:500,		
// 		});  
// 	}
// 	 sliderChulaiba();
// 	$(".indexPage .ser-slider").bxSlider({
// 		nextText: '<i class="fa fa-angle-right"></i>',
// 		prevText: '<i class="fa fa-angle-left"></i>',

// 	});
// });
// (function(doc, win) {
// 	var init_w = 640,
// 		init_fs = 10,
// 		max_scale = 1,
// 		min_scale = 1;
// 	var docEl = doc.documentElement,
// 		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
// 		recalc = function() {
// 			var clientWidth = docEl.clientWidth;
// 			if (!clientWidth) return;
// 			var percentage = clientWidth / init_w;
// 			percentage = percentage > max_scale ? max_scale : percentage < min_scale ? min_scale : percentage;

// 			docEl.style.fontSize = init_fs * percentage + 'px';
// 		};
// 	if (!doc.addEventListener) return;
// 	win.addEventListener(resizeEvt, recalc, false);
// 	doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);

// $(function(e) {
// $('.dropmenu').each(function (index, element) {
// 	var $dropmenu = $(element);
// 	var $dropmenuActive = $(".active:last", $dropmenu);
// 	$('.label .text', $dropmenu).text($dropmenuActive.text());
// 	$('.label', $dropmenu).on("touchstart", function (event) {
// 		event.preventDefault();
// 		if ($dropmenu.hasClass('open')) {
// 			$dropmenu.removeClass("open");
// 			$("ul", $dropmenu).height(0);
// 		}
// 		else {
// 			$("ul", $dropmenu).height($("ul", $dropmenu).data("height"));
// 			$($dropmenu).addClass("open");
// 		}
// 		;
// 	});
// });
// });



$(function () {

	$('#header .searchBtn').on('click', function () {
		$('.search-input-wrap').addClass('show');
		$('.header-search-input').focus();
		$('#bodymask').fadeIn().on('click', function () {
			$('.search-input-wrap').removeClass('show');
			$(this).fadeOut(function () {

				$('.header-search-input').val("");
			}).off('click');
		})
	})


	// var searchAddr = window.location + 'search/s/';

	//
	// var baseURL = window.location.origin;
	// var searchAddr = baseURL + '/plus/search.php';
	//
	// function jumpToSearch($el) {
	// 	var searchInfor = '?kwtype=0&mobile=1&q=' + encodeURIComponent($el.val());
	// 	window.location = searchAddr + searchInfor;
	// }
	// $('.searchPage .searchGroup .searchSub').click(function () {
	// 	jumpToSearch($(this).parent().find('input'));
	// });
	// $('.search-input-wrap input').keydown(function (ev) {
	// 	if (ev.keyCode == 13) {
	// 		jumpToSearch($(this));
	// 		return false;
	// 	}
	// });

	var isSupportTouch = "ontouchend" in document ? true : false;
	var isDesk = false;
	$('#header .lcbody').on({
		'click': function (e) {
			if (!isSupportTouch) {
				$(this).trigger('touchstart')
			}
		}
	});


	
	$('#mm-blocker').on({
		'click': function () {
			if (!isSupportTouch) {
				$(this).trigger('touchstart')
			}
		}
	});
	$('#contactform').on('submit', function (e) {
		e.preventDefault();
	});

	
});