var ActiveMenuItem = 0;
var LastActiveMenuItem = -1;
var LastMenuChange = Date.now() - 1000;

if (typeof NodeList.prototype.forEach !== 'function')  {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

function setActiveMenuItem(idx) {
    document.querySelectorAll("nav a").forEach(function(el) {
        el.classList.remove("active");
    })
    document.querySelectorAll("nav a")[Math.floor(idx, 0)].classList.add("active");
    ActiveMenuItem = Math.floor(idx, 0);
    LastMenuChange = Date.now();
}

function setMenuItem(elem) {
    var id = elem.getAttribute("data-id");
    ActiveMenuItem = id;
}

function unsetMenuItem(elem) {
    var id = elem.getAttribute("data-id") - 1;
    ActiveMenuItem = id;
}

function tryScrollToAnchor(anchor) {
    var el = document.querySelector(anchor);
    if(typeof el !== "undefined") {
        var topPos = el.getBoundingClientRect().top + window.pageYOffset;
        goToScrollPos(topPos, 100);
    }
}

document.querySelectorAll("a[target='_blank']").forEach(function(el){
    el.addEventListener('click',function(){
        if(typeof ga !== "undefined") {
            ga('send', 'event', 'User Action', 'External Link Clicked', el.getAttribute("href"), 1);   
        }
    })
})

function init() {
    document.querySelectorAll("a").forEach(function(el){
        el.addEventListener('click',function(e){
            if(el.getAttribute("href").charAt(0) == "#") {
                e.preventDefault();
                LastMenuChange = Date.now() - 200; // Delay processing sidebar so the wrong active item isn't picked 
                tryScrollToAnchor(el.getAttribute("href"));
                return false;
            }
        })
    })
    setInterval(monitorActiveMenuItem, 100);
    setInterval(gaTrackingPing, 3000);
}

function monitorActiveMenuItem() {
    if(LastMenuChange + 1000 <= Date.now() && ActiveMenuItem != LastActiveMenuItem) {
        LastActiveMenuItem = ActiveMenuItem;
        setActiveMenuItem(ActiveMenuItem);
    }
}

function gaTrackingPing() {
    if(typeof ga !== "undefined") {
        var scrollPerc = Math.floor( (((window.pageYOffset + window.innerHeight) / document.body.offsetHeight) * 100) / 20 ) * 20;
        ga('send', 'event', 'Passive', 'Scroll Position', 'Scrolled ' + scrollPerc + '%', scrollPerc);   
    }
}

init();
