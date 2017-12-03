$(function () {
    var menuIsOpened = false;
    var nav = $("nav");
    $(document).on("scroll", onScroll);
    $("a[href^='#']").on("click", scrollTo);
    $(".scroll-arrow").on("click", scrollToNext);

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
            'scrollTop': $target.offset().top + 2
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

    var currentLanguage = getCurrentBrowserLanguage();


    $(".lng").on("click", changeLanguage);

    switch (currentLanguage) {
        case "ru":
            currentLanguage = "ru";
            break;
        case "uk":
            currentLanguage = "ru";
            break;
        default:
            currentLanguage = "en";
    }

    function getCurrentBrowserLanguage() {
        var language = window.navigator ? (window.navigator.language ||
            window.navigator.systemLanguage ||
            window.navigator.userLanguage) : "ru";
        language = language.substr(0, 2).toLowerCase();
        return language;
    }

    function changeLanguage(currentLanguage) {
        var lang = this.id ? this.id : currentLanguage;
        var url = '/' + currentLanguage;
        $.html5Translate(dict, lang);
    }

    $.html5Translate = function (dict, lang) {
        $('[data-translate-key]').each(function () {
            $(this).html(dict[lang][$(this).data('translateKey')]);
        });
    };
    
    changeLanguage(currentLanguage);
});
