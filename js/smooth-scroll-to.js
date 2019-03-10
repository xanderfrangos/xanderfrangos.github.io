
//
//  Smooth Scroll
//
var scrollTime = 600;

function goToScrollPos(position, offset) {
    if (offset === undefined || offset === null) {
        offset = 0;
    }
    var f, d = e.scrollTop,
        a = position - window.pageYOffset + offset,
        g = e.scrollHeight - window.innerHeight,
        h = d + a < g ? a : g - d,
        k = function (a) {
            f = f || a;
            a -= f;
            var c;
            var b = a;
            c = 1 > (b /= (scrollTime / 2)) ? h / 2 * b * b * b + d : h / 2 * ((b -= 2) * b * b + 2) + d;
            e.scrollTop = c;
            (scrollTime) > a && requestAnimationFrame(k)
        };
    requestAnimationFrame(k);
}

var c = document.querySelectorAll("a.sscroll"),
    a = c.length,
    e = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : (document.scrollingElement?document.scrollingElement:document.body);
