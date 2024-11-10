document.addEventListener('touchstart', function() {}, {passive: true});

(function($) {
	const breakpoint   = 768;
	const header       = $('header');
	const headerInner  = $('.header-inner');
	const footer       = $('footer');
	const showPosition = $('.f_header2');

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
ローダー
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
	$(window).on('load', function() {
		load();
	});

	setTimeout(function() {
		load();
	}, 5000);

	function load() {
		if (!$('body').hasClass('load')) {
			height();
			swiper();
			$('.loader').css({'visibility': 'hidden', 'opacity': 0});

			setTimeout(function() {
				$('body').addClass('load');
			}, 300);
		}
	}

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
アニメーション
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
	$('.fade, .fade-up, .fade-right, .fade-left, .fade-zoom-in, .fade-zoom-out').css({'opacity': 0});

	$('.animation').each(function(index, element) {
		$(element).removeClass('animation');

		$(window).on('load resize scroll', function() {
			const target = $(element).offset().top - window.innerHeight;

			if ($(window).scrollTop() > target) {
				$(element).addClass('animation');
			} else {
				$(element).removeClass('animation');
			}
		});
	});

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
高さ
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
	$(window).on('resize', function() {
		height();
	});

	function height() {
		let height = window.innerHeight - header.outerHeight() - footer.outerHeight();

		if (height < 0) {
			height = 0;
		}

		$('main').css({'min-height': height});
	}

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
ヘッダー
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
	$(window).on('load resize scroll', function() {
		if (window.innerWidth < breakpoint) {
			return;
		}

		if ($('.f_header1').length) {
			if ($(window).scrollTop() > $('.f_header1').offset().top) {
				header.addClass('hide');

			} else {
				headerInner.removeAttr('style');
				header.removeClass('hide');
			}

			if ($(window).scrollTop() > showPosition.offset().top) {
				headerInner.css({'transition': '0.3s ease-out'});
				header.addClass('show');

			} else {
				header.removeClass('show');
			}
		}
	});

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
ページトップ
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
	const pageTop = $('#page-top');

	$(window).on('load scroll', function() {
		if ($(window).scrollTop() > 500) {
			pageTop.addClass('show');
		} else {
			pageTop.removeClass('show');
		}
	});

	pageTop.on('click', function() {
		$('body, html').animate({scrollTop: 0}, 500);
	});

	$(window).on('load resize scroll', function() {
		let target = $(window).scrollTop() + window.innerHeight;

		if (window.innerWidth < breakpoint) {
			target -= $('.footer-contact').outerHeight();
		}

		if (footer.offset().top < target) {
			pageTop.addClass('change');
		} else {
			pageTop.removeClass('change');
		}
	});

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
お問合せ
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
	$('.footer-contact .close').on('click', function() {
		$('.footer-contact').hide();
	});

	$(window).on('load resize scroll', function() {
		if (window.innerWidth < breakpoint) {
			$('.footer-contact').show();
		}

		if (showPosition.length) {
			let target = $(window).scrollTop();

			if (window.innerWidth < breakpoint && headerInner.css('position') == 'fixed') {
				target += header.outerHeight();
			}

			if (showPosition.offset().top < target) {
				footer.addClass('show');
			} else {
				footer.removeClass('show');
			}
		}
	});

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
アコーディオン
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
	$(".home-faq-dd").show();/*最初から開いた状態にする*/
	$('.home-faq-dt').on('click', function() {
		/*$(this).toggleClass('open');*//*矢印を上下動かないように*/
		$(this).next('.home-faq-dd').slideToggle('fast');
	});

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
Swiper
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
	function swiper() {
		$('.swiper-outer').each(function(index, element) {
			let centeredSlides = true;
			let loop = true;

			if ($(element).hasClass('home-flow-swiper-outer')) {
				centeredSlides = false;
				loop = false;
			}

			let swiper = new Swiper ($('.swiper-container', element), {
				centeredSlides: centeredSlides,
				grabCursor: true,
				loop: loop,
				slidesPerView: 'auto',
				watchOverflow: true,
				navigation: {nextEl: $('.swiper-button-next', element), prevEl: $('.swiper-button-prev', element)},
				pagination: {clickable: true, el: $('.swiper-pagination', element), type: 'bullets'},
			});
		});
	}

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
モーダル
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
	$(document).on('click', '.modal', function() {
		const href = $(this).attr("href");
		let html = '';
		let youtube = ' modal-youtube';

		if (href.match(/.jpg|.png/)) {
			html = '<img src="' + href + '" alt="">';
			youtube = '';

		} else if (href.match(/.mp4/)) {
			html = '<video src="' + href + '" playsinline autoplay controls></video>';
			youtube = '';

		} else if (href.match(/youtube.com/)) {
			html = '<iframe src="https://www.youtube.com/embed/' + href.split('?v=')[1] + '?autoplay=1&fs=0&modestbranding=1&rel=0"></iframe>';

		} else if (href.match(/youtu.be/)) {
			html = '<iframe src="https://www.youtube.com/embed/' + href.split('youtu.be/')[1] + '?autoplay=1&fs=0&modestbranding=1&rel=0"></iframe>';
		}

		html = '<div class="modal-container">'
				 + '	<span class="modal-close"></span>'
				 + '	<div class="modal-overlay"></div>'
				 + '	<div class="modal-content' + youtube + '">'
				 + '		<div class="modal-inner">'
				 + 			html
				 + '		</div>'
				 + '	</div>'
				 + '</div>';

		$('article').append(html);
		$('.modal-container').show().addClass('open');

		$('.modal-close, .modal-overlay').on('click', function() {
			$('.modal-container').delay(500).removeClass('open').queue(function() {
				this.parentNode.removeChild(this);
				return false;
			});
		});

		return false;
	});
})(jQuery);

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
外部リンク
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
window.addEventListener('DOMContentLoaded', function() {
	const external = document.querySelectorAll('a[target=_blank]');

	for(let i = 0; i < external.length; i++) {
		external[i].setAttribute('rel', 'noopener');
	}
});

/*+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
CSS Variables Polyfill for IE11
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+*/
window.MSInputMethodContext && document.documentMode && document.write('<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"><\/script>');
