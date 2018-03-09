/*
* Template Name: Unify - Responsive Bootstrap Template
* Author: @htmlstream
* Website: http://htmlstream.com
*/

var App = function () {
    var isMinScreen = false;
    // We extend jQuery by method hasAttr
    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };

    // Fixed Header
    function handleHeader() {
        jQuery(window).scroll(function () {
            if (jQuery(window).scrollTop() > 100) {
                jQuery('.header-fixed .header-sticky').addClass('header-fixed-shrink');
            } else {
                if (isMinScreen == false) {
                    jQuery('.header-fixed .header-sticky').removeClass('header-fixed-shrink');
                }
            }
        });
    }


    // Full Screen
    var handleFullscreen = function () {
        var WindowHeight = $(window).height();
        var HeaderHeight = 0;

        var WindowWidth = $(window).width();
        if (WindowWidth < 990) {
            isMinScreen = true;
            jQuery('.header-fixed .header-sticky').addClass('header-fixed-shrink');
        } else {
            isMinScreen = false;
            jQuery('.header-fixed .header-sticky').removeClass('header-fixed-shrink');
        }

        if ($(document.body).hasClass("promo-padding-top")) {
            HeaderHeight = $(".header").height();
        } else {
            HeaderHeight = 0;
        }

        $(".fullheight").css("height", WindowHeight - HeaderHeight);

        $(window).resize(function () {
            var WindowHeight = $(window).height();
            $(".fullheight").css("height", WindowHeight - HeaderHeight);
            var WindowWidth = $(window).width();
            if (WindowWidth < 990) {
                isMinScreen = true;
                jQuery('.header-fixed .header-sticky').addClass('header-fixed-shrink');
            } else {
                isMinScreen = false;
                jQuery('.header-fixed .header-sticky').removeClass('header-fixed-shrink');
            }
        });
    }

    // Align Middle
    var handleValignMiddle = function () {
        $(".valign__middle").each(function () {
            $(this).css("padding-top", $(this).parent().height() / 2 - $(this).height() / 2 - 70);
        });
        $(window).resize(function () {
            $(".valign__middle").each(function () {
                $(this).css("padding-top", $(this).parent().height() / 2 - $(this).height() / 2 - 55);
            });
        });
    }

    var handleFullScreenImg = function () {
        $(".fullscreen-static-image").backstretch([
         "../../../framework/img/newegg/bg/img1.jpg", "../../../framework/img/newegg/bg/img2.jpg",
            ], { duration: 8000, fade: 800 });
    }

    var handleCheckBrowser = function () {
        var Sys = {};
        if (!navigator || !navigator.userAgent) {
            $("#divBrowser").hide();
        } else {
            var ua = navigator.userAgent.toLowerCase();
            if (window.ActiveXObject)
                Sys.ie = ua.match(/msie ([\d.]+)/)[1];
            if (ua.indexOf("firefox") > 0) {
                $("#divBrowser").hide();
            } else {
                if (!Sys.ie) {
                    $("#divBrowser").hide();
                } else {
                    if (Sys.ie >= 10) {
                        $("#divBrowser").hide();
                    }
                    else {
                        $("#divContent").hide();
                        $("#divBrowser").show();
                    }
                }
            }

        }
    }

   

    // Bootstrap Tooltips and Popovers
    function handleBootstrap() {
        /* Bootstrap Carousel */
        jQuery('.carousel').carousel({
            interval: 15000,
            pause: 'hover'
        });

        /* Tooltips */
        jQuery('.tooltips').tooltip();
        jQuery('.tooltips-show').tooltip('show');
        jQuery('.tooltips-hide').tooltip('hide');
        jQuery('.tooltips-toggle').tooltip('toggle');
        jQuery('.tooltips-destroy').tooltip('destroy');

        /* Popovers */
        jQuery('.popovers').popover();
        jQuery('.popovers-show').popover('show');
        jQuery('.popovers-hide').popover('hide');
        jQuery('.popovers-toggle').popover('toggle');
        jQuery('.popovers-destroy').popover('destroy');
    }

    return {
        init: function () {
            handleBootstrap();
            handleHeader();
            handleFullscreen();
            handleValignMiddle();
            handleFullScreenImg();
            handleCheckBrowser();
        },


        // Animate Dropdown
        initAnimateDropdown: function () {
            function MenuMode() {
                jQuery('.dropdown').on('show.bs.dropdown', function () {
                    jQuery(this).find('.dropdown-menu').first().stop(true, true).slideDown();
                });
                jQuery('.dropdown').on('hide.bs.dropdown', function () {
                    jQuery(this).find('.dropdown-menu').first().stop(true, true).slideUp();
                });
            }

            jQuery(window).resize(function () {
                if (jQuery(window).width() > 768) {
                    MenuMode();
                }
            });

            if (jQuery(window).width() > 768) {
                MenuMode();
            }
        },
    };
}();

// google analytics
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-59402870-1', 'auto');
ga('send', 'pageview');



var iframeError;
function loadYoutubeVideo() {
    //var url = 'http://techslides.com/demos/sample-videos/small.mp4'; 
    var url = 'https://www.youtube.com/embed/YXiKgA22Crc';
    $("#video").attr("src", url);
    iframeError = setTimeout("error()", 9000);
}
function error() {
    $("#video").hide();
    $("#videoImg").show();
}
$(document).ready(function () {
    $('#video').on('load', (function () {
        clearTimeout(iframeError);
    }));
});
loadYoutubeVideo();



