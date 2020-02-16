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

function getOffset(el) {
    try {
        var rect = el.getBoundingClientRect();
        return {
          top: rect.top + document.body.scrollTop,
          left: rect.left + document.body.scrollLeft
        }
    } catch (e) {
        return {top: null, left: null}
    }
}

function checkScrolledPast() {
    if (scrollVars.checkItems !== undefined) {
        scrollVars.checkItems.forEach(function (el) {
            var offsetVal = el.getAttribute("data-offset");
            var untriggerEvent = (el.getAttribute("data-untriggerEvent") === undefined ? "" : el.getAttribute("data-untriggerEvent"));
            var triggerEvent = (el.getAttribute("data-triggerEvent") === undefined ? "" : el.getAttribute("data-triggerEvent"));

            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            if (getOffset(el).top - offsetVal < window.pageYOffset) {
                if (!el.classList.contains("scrolledPast")) {
                    if (triggerEvent.length > 0)
                        window[triggerEvent](el);

                    el.classList.add("scrolledPast");
                }
            } else {
                if (el.classList.contains("scrolledPast")) {
                    if (untriggerEvent.length > 0)
                        window[untriggerEvent](el);

                    el.classList.remove("scrolledPast");
                }
            }
        });
    }
    if (scrollVars.checkAfter !== undefined) {
        scrollVars.checkAfter.forEach(function (el) {
            var offsetVal = el.getAttribute("data-offset");

            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            var untriggerEvent = (el.getAttribute("data-untriggerEvent") === undefined ? "" : el.getAttribute("data-untriggerEvent"));
            var triggerEvent = (el.getAttribute("data-triggerEvent") === undefined ? "" : el.getAttribute("data-triggerEvent"));

            if (getOffset(el).top + el.offsetHeight - offsetVal < window.pageYOffset + window.innerHeight) {

                if (!el.classList.contains("scrolledAfter")) {
                    if (triggerEvent.length > 0)
                        window[triggerEvent](el);

                    el.classList.add("scrolledAfter");
                }
            } else {
                if (el.classList.contains("scrolledAfter")) {
                    if (untriggerEvent.length > 0)
                        window[untriggerEvent](el);

                    el.classList.remove("scrolledAfter");
                }
            }
        });
    }
    if (scrollVars.checkEnteredBottom !== undefined) {
        scrollVars.checkEnteredBottom.forEach(function (el) {
            var offsetVal = el.getAttribute("data-offset");

            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            var untriggerEvent = (el.getAttribute("data-untriggerEvent") === undefined ? "" : el.getAttribute("data-untriggerEvent"));
            var triggerEvent = (el.getAttribute("data-triggerEvent") === undefined ? "" : el.getAttribute("data-triggerEvent"));

            if (getOffset(el).top - offsetVal < window.pageYOffset + window.innerHeight) {
                
                if (!el.classList.contains("scrolledEnteredBottom")) {
                    if (triggerEvent.length > 0)
                        window[triggerEvent](el);

                    el.classList.add("scrolledEnteredBottom");
                }
        
            } else {
                
                if (el.classList.contains("scrolledEnteredBottom")) {
                    if (untriggerEvent.length > 0)
                        window[untriggerEvent](el);

                    el.classList.remove("scrolledEnteredBottom");
                }
                
            }
        });
    }
    if (scrollVars.checkFromTop !== undefined) {
        scrollVars.checkFromTop.forEach(function (el) {
            var offsetVal = el.getAttribute("data-offset");

            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            if (getOffset(el).top - offsetVal < window.pageYOffset) {
                el.classList.add("scrolledFromTop");
            } else {
                el.classList.remove("scrolledFromTop");
            }
        });
    }

    if (scrollVars.checkVisible !== undefined) {
        scrollVars.checkVisible.forEach(function (el) {
            var offsetVal = el.getAttribute("data-offset");
            offsetVal = (offsetVal === undefined ? 0 : offsetVal);

            var untriggerEvent = (el.getAttribute("data-untriggerEvent") === undefined ? "" : el.getAttribute("data-untriggerEvent"));
            var triggerEvent = (el.getAttribute("data-triggerEvent") === undefined ? "" : el.getAttribute("data-triggerEvent"));

            if (!(getOffset(el).top + el.offsetHeight + offsetVal < window.pageYOffset || getOffset(el).top - offsetVal > window.pageYOffset + window.innerHeight)) {

                if (!el.classList.contains("isVisible")) {
                    if (triggerEvent.length !== "")
                        window[triggerEvent](el);

                    el.classList.add("isVisible");
                }
            } else {
                if (el.classList.contains("isVisible")) {
                    if (untriggerEvent.length > 0)
                        window[untriggerEvent](el);

                    el.classList.remove("isVisible");
                }
            }
        });
    }
}

setInterval(updateScrollVarsRAF, 1000);

function updateScrollVars() {
    scrollVars.scrollTop = document.body.scrollTop;
    scrollVars.window = window;
    scrollVars.checkItems = document.querySelectorAll(".checkScrolled");
    scrollVars.checkAfter = document.querySelectorAll(".checkAfter");
    scrollVars.checkEnteredBottom = document.querySelectorAll(".checkEnteredBottom");
    scrollVars.checkFromTop = document.querySelectorAll(".checkFromTop");
    scrollVars.checkVisible = document.querySelectorAll(".checkVisible");
}

function updateScrollVarsRAF() {
    requestAnimationFrame(updateScrollVars);
}

updateScrollVarsRAF();
scrollEvents();

window.addEventListener('scroll', rafEvent, {passive: true});
