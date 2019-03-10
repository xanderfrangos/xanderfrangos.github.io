var ActiveMenuItem = 0;
var LastActiveMenuItem = -1;
var LastMenuChange = Date.now() - 1000;

function setActiveMenuItem(idx) {
    $("nav a").removeClass("active");
    $("nav a").eq(Math.floor(idx, 0)).addClass("active");
    ActiveMenuItem = Math.floor(idx, 0);
    LastMenuChange = Date.now();
}

function setMenuItem(elem) {
    var id = $(elem).eq(0).attr("data-id");
    ActiveMenuItem = id;
    //setActiveMenuItem(id);
}

function unsetMenuItem(elem) {
    var id = $(elem).eq(0).attr("data-id") - 1; 
    ActiveMenuItem = id;
    //setActiveMenuItem(id);
}

function tryScrollToAnchor(anchor) {
    if($(anchor).length > 0) {
        goToScrollPos($(anchor).offset().top, 100);
    }
}


function init() {
    $("a").click(function(e) {
        if($(this).attr("href").charAt(0) == "#") {
            e.preventDefault();
            LastMenuChange = Date.now() - 200; // Delay processing sidebar so the wrong active item isn't picked 
            tryScrollToAnchor($(this).attr("href"));
            return false;
        }
    });
    setInterval(monitorActiveMenuItem, 100);
}

function monitorActiveMenuItem() {
    if(LastMenuChange + 1000 <= Date.now() && ActiveMenuItem != LastActiveMenuItem) {
        LastActiveMenuItem = ActiveMenuItem;
        setActiveMenuItem(ActiveMenuItem);
    }
}

init();