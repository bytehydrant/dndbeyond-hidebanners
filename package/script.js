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