"use strict";

/* exported Oven */

/** Represents an oven
 * @constructor
 */

const Oven = function() {
	const ovenImg = document.getElementById("oven");
	const cook3Img = document.getElementById("cook3");

	const ovenOpen = "static/images/oven-open.png";
	const ovenClosed = "static/images/oven-closed.png";

	const ovenCloseAudio = document.getElementById("ovenclose");
	const ovenOpenAudio = document.getElementById("ovenopen");
	const bell = document.getElementById("bell");
	const fire = document.getElementById("fire");

	let open = ovenImg.attributes.src.nodeValue.indexOf("open") > 0;

	this.init = function() {
		cook3Img.addEventListener("pizza-in-oven", this.close);
	};

	this.isOpen = function() {
		return open;
	};

	this.open = function() {
		if (!open) {
			ovenOpenAudio.play();
			ovenImg.attributes.src.nodeValue = ovenOpen;
			open = true;
		}
	};

	this.close = function(e) {
		if (e) {
			if (e.type === "pizza-in-oven") {
				console.log(`oven.close(): type: ${e.type} orderId: ${e.orderId}`);
				fire.play();

				setTimeout(() => {
					fire.pause();
					fire.currentTime = 0;
					bell.play();

					const event = new Event("pizza-ready");

					event.orderId = e.orderId;
					ovenImg.dispatchEvent(event);

				}, 2000);
			}
		}

		ovenCloseAudio.play();
			ovenImg.attributes.src.nodeValue = ovenClosed;
			open = false;
	};
};
