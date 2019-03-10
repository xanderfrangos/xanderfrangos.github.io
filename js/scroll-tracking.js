// Parallax
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
    return setTimeout(callback, 1000 / 60);
};

var time = true;

function rafEvent() {
    window.requestAnimationFrame(scrollEvents);
}

var scrollVars = {
    scrollTop: 0,
    items: undefined,
};

var currentScrollPos = 0;

function scrollEvents() {
    checkScrolledPast();
}

updateScrollVars();

function checkScrolledPast() {
    if (scrollVars.checkItems !== undefined) {
        scrollVars.checkItems.each(function () {
            var offsetVal = $(this).attr("data-offset");
            var untriggerEvent = ($(this).attr("data-untriggerEvent") === undefined ? "" : $(this).attr("data-untriggerEvent"));
            var triggerEvent = ($(this).attr("data-triggerEvent") === undefined ? "" : $(this).attr("data-triggerEvent"));

            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            if ($(this).offset().top - offsetVal < window.pageYOffset) {
                if (!$(this).hasClass("scrolledPast")) {
                    if (triggerEvent.length > 0)
                        window[triggerEvent](this);

                    $(this).addClass("scrolledPast");
                }
            } else {
                if ($(this).hasClass("scrolledPast")) {
                    if (untriggerEvent.length > 0)
                        window[untriggerEvent](this);

                    $(this).removeClass("scrolledPast");
                }
            }
        });
    }
    if (scrollVars.checkAfter !== undefined) {
        scrollVars.checkAfter.each(function () {
            var offsetVal = $(this).attr("data-offset");

            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            var untriggerEvent = ($(this).attr("data-untriggerEvent") === undefined ? "" : $(this).attr("data-untriggerEvent"));
            var triggerEvent = ($(this).attr("data-triggerEvent") === undefined ? "" : $(this).attr("data-triggerEvent"));

            if ($(this).offset().top + $(this).innerHeight() - offsetVal < window.pageYOffset + window.innerHeight) {

                if (!$(this).hasClass("scrolledAfter")) {
                    if (triggerEvent.length > 0)
                        window[triggerEvent](this);

                    $(this).addClass("scrolledAfter");
                }
            } else {
                if ($(this).hasClass("scrolledAfter")) {
                    if (untriggerEvent.length > 0)
                        window[untriggerEvent](this);

                    $(this).removeClass("scrolledAfter");
                }
            }
        });
    }
    if (scrollVars.checkEnteredBottom !== undefined) {
        scrollVars.checkEnteredBottom.each(function () {
            var offsetVal = $(this).attr("data-offset");

            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            var untriggerEvent = ($(this).attr("data-untriggerEvent") === undefined ? "" : $(this).attr("data-untriggerEvent"));
            var triggerEvent = ($(this).attr("data-triggerEvent") === undefined ? "" : $(this).attr("data-triggerEvent"));

            if ($(this).offset().top - offsetVal < window.pageYOffset + window.innerHeight) {
                
                if (!$(this).hasClass("scrolledEnteredBottom")) {
                    if (triggerEvent.length > 0)
                        window[triggerEvent](this);

                    $(this).addClass("scrolledEnteredBottom");
                }
        
            } else {
                
                if ($(this).hasClass("scrolledEnteredBottom")) {
                    if (untriggerEvent.length > 0)
                        window[untriggerEvent](this);

                    $(this).removeClass("scrolledEnteredBottom");
                }
                
            }
        });
    }
    if (scrollVars.checkFromTop !== undefined) {
        scrollVars.checkFromTop.each(function () {
            var offsetVal = $(this).attr("data-offset");

            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            if ($(this).offset().top - offsetVal < window.pageYOffset) {
                $(this).addClass("scrolledFromTop");
            } else {
                $(this).removeClass("scrolledFromTop");
            }
        });
    }

    if (scrollVars.checkVisible !== undefined) {
        scrollVars.checkVisible.each(function () {
            var offsetVal = $(this).attr("data-offset");
            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            var untriggerEvent = ($(this).attr("data-untriggerEvent") === undefined ? "" : $(this).attr("data-untriggerEvent"));
            var triggerEvent = ($(this).attr("data-triggerEvent") === undefined ? "" : $(this).attr("data-triggerEvent"));

            if (!($(this).offset().top + $(this).innerHeight() + offsetVal < window.pageYOffset || $(this).offset().top - offsetVal > window.pageYOffset + window.innerHeight)) {

                if (!$(this).hasClass("isVisible")) {
                    if (triggerEvent.length !== "")
                        window[triggerEvent](this);

                    $(this).addClass("isVisible");
                }
            } else {
                if ($(this).hasClass("isVisible")) {
                    if (untriggerEvent.length > 0)
                        window[untriggerEvent](this);

                    $(this).removeClass("isVisible");
                }
            }
        });
    }
}

setInterval(updateScrollVarsRAF, 1000);

function updateScrollVars() {
    scrollVars.scrollTop = $(window).scrollTop();
    scrollVars.window = $(window);
    scrollVars.checkItems = $(".checkScrolled");
    scrollVars.checkAfter = $(".checkAfter");
    scrollVars.checkEnteredBottom = $(".checkEnteredBottom");
    scrollVars.checkFromTop = $(".checkFromTop");
    scrollVars.checkVisible = $(".checkVisible");
}

function updateScrollVarsRAF() {
    requestAnimationFrame(updateScrollVars);
}

updateScrollVarsRAF();
scrollEvents();

$(window).scroll(rafEvent);
