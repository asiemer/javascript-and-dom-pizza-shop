"use strict";

/* global */
/* exported HUD */

/**
 * Represents a heads up display.
 * @constructor
 */
const HUD = function() {
	const cook2 = document.getElementById("cook2");
	const cook1 = document.getElementById("cook1");
	const cook3 = document.getElementById("cook3");

	this.init = function() {
		cook1.addEventListener("pizza-done", this.updateHud);
		cook2.addEventListener("order-up", this.updateHud);
		cook3.addEventListener("pizza-in-oven", this.updateHud);
	};

	this.updateHud = function(e) {
		console.log(`hud.UpdateHud(): type: ${e.type} orderId: ${e.orderId}`);
	};
};
