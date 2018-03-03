$(function () {
	var menuIsOpened = false;
	var nav = $("nav");
	$(document).on("scroll", onScroll);
	$("a[href^='#']").on("click", scrollTo);
	$(".scroll-arrow").on("click", scrollToNext);
	$("header .button-started").on("click", function () {
		scroll($("#why"));
	});
	$(".button-why").on("click", function () {
		scroll($("#features"));
	});
	$(window).on("resize", function () {
		if (!menuIsOpened && $(document).width() > "800") {
			showMenu();
		} else if (menuIsOpened && $(document).width() < "800") {
			hideMenu();
		}
	});

	$(".mobile-menu-icon").on("click", function () {
		if (!menuIsOpened) {
			showMenu();
		} else {
			hideMenu();
		}
	});

	$("nav ul li a").on("click", function () {
		if ($(document).width() <= "800") {
			hideMenu();
		}
	});

	function onScroll(event) {
		var scrollPos = $(document).scrollTop();

		if (scrollPos > 0) {
			nav.addClass("active");
		} else {
			nav.removeClass("active");
		}

		$("nav a").each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$("nav ul li a").removeClass("active");
				currLink.addClass("active");
			} else {
				currLink.removeClass("active");
			}
		});
	}

	function scrollToNext(event) {
		var currentId;
		var nextId;
		var target;
		event.preventDefault();
		currentId = $(this).parent();
		nextId = currentId.next();
		target = nextId;
		scroll(target);
	}

	function scrollTo(event) {
		event.preventDefault();
		$("a").each(function () {
			$(this).removeClass("active");
		})
		$(this).addClass("active");
		var target = this.hash;
		scroll(target);
	}

	function scroll(target) {
		$(document).off("scroll");

		$target = $(target);
		$("html, body").stop().animate({
			'scrollTop': $target.offset().top - 76
		}, 800, "swing", function () {
			$(document).on("scroll", onScroll);
		});
	}

	function showMenu() {
		$("nav ul").css("display", "flex");
		menuIsOpened = true;
	}

	function hideMenu() {
		$("nav ul").css("display", "none");
		menuIsOpened = false;
	}
	$("#modal").iziModal({});
	$("#modal-idea").iziModal({});
	$(".trigger-modal").on("click", function (event) {
		event.preventDefault();
		$('#modal').iziModal('open');
	});
	$(".trigger-idea").on("click", function (event) {
		event.preventDefault();
		$('#modal-idea').iziModal('open');
	});
	var message;
	switch ($("html").attr("lang")) {
		case "ru":
			message = "Спасибо! Ваше сообщение отправлено!";
			break;
		case "en":
			message = "Thank you! Your message has been sent!";
			break;
		case "uk":
			message = "Дякуємо! Ваше повідомлення відправлено!";
			break;
		default:
			message = "Thank you! Your message has been sent!";
	}
	$("#contact-form").submit(function (e) {
		e.preventDefault();
		var $form = $(this);
		$(".success").fadeIn(0);
		$.post($form.attr("action"), $form.serialize()).then(function () {
			$(".success").text(message);
			setTimeout(function () {
				$(".success ").fadeOut();
			}, 2000);
		});
	});
	$(".slider").slick({
		adaptiveHeight: true,
		autoplay: true,
		nextArrow: '<div class="next-arrow"></div>',
		prevArrow: '<div class="prev-arrow"></div>'
	});
});
