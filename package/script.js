var x = document.getElementsByClassName("site-bar");
var i;
for (i = 0; i < x.length; i++) {
	x[i].parentNode.removeChild(x[i]);
}

var mmt = document.getElementById("mega-menu-target");
mmt.parentNode.removeChild(mmt);

// Listen for any dynamic changes to the document head and if the extension css isn't at the end, remove 
// and re-add it so it's guaranteed to win. Without this, other dynamically loaded styles will eventually beat our out
var link = document.createElement("link");
link.href = chrome.extension.getURL("style.css");
link.type = "text/css";
link.rel = "stylesheet";
link.id = "extensionStyles";
var observer = new MutationObserver(function(mutations)
{
	if (document.head.lastChild == link)
	{
		return;
	}

	if (document.head.contains(link))
	{
		document.head.removeChild(link);
	}

	document.head.appendChild(link);
});
observer.observe(document.head, { childList: true, subTree: true });

function clickFirstElementByClass(classNames) {
	var element = document.getElementsByClassName(classNames)[0];
	var mouseEvent = new MouseEvent("click", { bubbles: true });
	element.dispatchEvent(mouseEvent);
}

var bodyObserver = new MutationObserver(function (mutations) {
	if (!document.body.getElementsByClassName("ct-tooltip ct-sidebar__control ct-sidebar__control--expand ct-tooltip--interactive")[0]) {
		return;
	}

	clickFirstElementByClass("ct-tooltip ct-sidebar__control ct-sidebar__control--expand ct-tooltip--interactive");
	clickFirstElementByClass("ct-tooltip ct-sidebar__control ct-sidebar__control--fixed ct-sidebar__control--fixed-unselected ct-tooltip--interactive");
	document.getElementsByClassName("ct-sidebar--visible")[0].style.top = "6px";
	bodyObserver.disconnect();
});
bodyObserver.observe(document.body, { childList: true, subTree: true });