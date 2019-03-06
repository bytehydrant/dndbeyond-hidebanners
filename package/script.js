var x = document.getElementsByClassName("site-bar");
var i;
for (i = 0; i < x.length; i++) {
	x[i].parentNode.removeChild(x[i]);
}

var mmt = document.getElementById("mega-menu-target");
mmt.parentNode.removeChild(mmt);

document.body.style.backgroundPositionY = "93px";

var tt = document.getElementsByClassName("ct-tooltip");

var ev = document.createEvent('Events');
ev.initEvent("click", true, false);
tt[0].dispatchEvent(ev);