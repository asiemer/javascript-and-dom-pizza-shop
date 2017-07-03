"use strict";

/* global  */
/* exported Freezer */

/**
 * Represents a freezer.
 * @constructor
 */
const Freezer = function() {
	const freezerImg = document.getElementById("freezer");
	const aFreezerOpen = document.getElementById("freezeropen");
	const aFreezerClose = document.getElementById("freezerclose");

	const iFreezerOpen = "static/images/freezer-open.png";
	const iFreezerClosed = "static/images/freezer-closed.png";

	let open = freezerImg.attributes.src.nodeValue.indexOf("open") > 0;

	this.open = function() {
		if (!open) {
			aFreezerOpen.play();
			freezerImg.attributes.src.nodeValue = iFreezerOpen;
			open = true;
		}
	};

	this.close = function() {
		if (open) {
			aFreezerClose.play();
			freezerImg.attributes.src.nodeValue = iFreezerClosed;
			open = false;
		}
	};
};
