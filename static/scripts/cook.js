"use strict";

/* global Freezer, Oven, orders, customers:true */
/* exported Cook */

/**
 * Represents a cook.
 * @constructor
 * @param {number} id - Which cook in the kitchen are you wanting to use?
 */

const Cook = function(id) {

	/* 

	FIRES EVENTS

	pizza-done : by cook 1
	next-customer : by cook 2
	order-up : by cook 2
	pizza-in-oven : by cook 3

	*/

	const cookImg = document.getElementById(`cook${id}`); // a self reference to the cook image
	const cook2Img = document.getElementById("cook2");
	const cook3Img = document.getElementById("cook3");
	const ovenImg = document.getElementById("oven");

	const pmiNoArmLeft = "static/images/pizza-man-left.gif";
	const pmiNoArmRight = "static/images/pizza-man-right.gif";
	const pmiCarryingPizza = "static/images/pizza-man.gif";
	const pmiCarryingFrozenPizza = "static/images/pizza-man-frozen.gif";

	const aSteps = document.getElementById(`footsteps${id}`);
	const aOrderUp = document.getElementById("orderUp");
	const aTyping = document.getElementById(`type${id}`);
	const aPizzaPizza = document.getElementById("pizza-pizza");

	this.Id = parseInt(id, 10);

	const getCook = function(cookId) {
		return new Cook(cookId);
	};

	const getPizzaFromOven = function(e) {
		if (parseInt(id, 10) === 1) {
			console.log(`cook.GetPizzaFromFreezer(): type: ${e.type} orderId: ${e.orderId}`);
			getCook(1).startWalk();
		}
	};

	const getPizzaFromFreezer = function(e) {
		if (parseInt(id, 10) === 3) {
			console.log(`cook.GetPizzaFromFreezer(): type: ${e.type} orderId: ${e.orderId}`);
			getCook(3).startWalk();
		}
	};

	this.orderUp = function(e) {
		console.log(`cook.OrderUp(): type: ${e.type} orderId: ${e.orderId}`);
		aOrderUp.play();
	};

	this.type = function() {
		aTyping.play();
	};

	this.placeOrder = function() {
		const orderId = customers.pop();

		orders.push(orderId);
		this.startWalk();
	};

	this.startWalk = function() {
		if (this.Id === 1) {
			if (cookImg.attributes.src.nodeValue.indexOf("left") > 0) {
				cookImg.attributes.src.nodeValue = pmiNoArmRight;
			}
		}
		if (this.Id === 2) {
			if (cookImg.attributes.src.nodeValue.indexOf("left") > 0) {
				cookImg.attributes.src.nodeValue = pmiNoArmRight;
			} else {
				cookImg.attributes.src.nodeValue = pmiNoArmLeft;
			}
		}

		if (this.Id === 3) {
			if (cookImg.attributes.src.nodeValue.indexOf("right") > 0) {
				cookImg.attributes.src.nodeValue = pmiCarryingFrozenPizza;
			} else {
				cookImg.attributes.src.nodeValue = pmiNoArmRight;
			}
		}
		cookImg.classList.toggle("paused");
		aSteps.currentTime = 0;
		aSteps.play();
	};

	this.stopWalk = function() {
		cookImg.classList.toggle("paused");
		aSteps.pause();
		aSteps.currentTime = 0;
	};

	const handleAnimationIteration = function(e) {
		const cookImage = e.srcElement;
		const cookId = parseInt(cookImage.attributes.id.nodeValue.replace("cook", ""), 10);
		const cook = new Cook(cookId);
		const imgPath = cookImage.attributes.src.nodeValue;

		cook.stopWalk();

		if (cookId === 1) { // carries pizza to customer, turns into pizza man left
			if (imgPath === pmiCarryingPizza) {
				cookImg.attributes.src.nodeValue = pmiNoArmLeft;

				const event = new Event("pizza-done");

				event.orderId = 888;
				cookImg.dispatchEvent(event);

				aPizzaPizza.play();

				aTyping.currentTime = 0;
				aTyping.play();
				setTimeout(() => {
					aTyping.pause();
					aTyping.currentTime = 0;
				}, 2000);
			}
			if (imgPath === pmiNoArmRight) {
				const oven = new Oven();

				oven.open();
				cookImg.attributes.src.nodeValue = pmiCarryingPizza;
				setTimeout(() => getCook(1).startWalk(), 500);
			}
		}

		if (cookId === 2) { // takes orders from customers and inputs orders
			if (imgPath === pmiNoArmLeft) {
				const event = new Event("next-customer");

				cook2Img.dispatchEvent(event);
			}
			if (imgPath === pmiNoArmRight) {
				const event = new Event("order-up"); // todo: capture real orderid

				event.orderId = 1;
				cook2Img.dispatchEvent(event);

				aTyping.currentTime = 0;
				aTyping.play();
				setTimeout(() => {
					aTyping.pause();
					aTyping.currentTime = 0;
					getCook(2).startWalk();
				}, 2000);

			}
		}

		if (cookId === 3) { // gets pizzas out of freezer and puts in oven
			if (imgPath === pmiCarryingFrozenPizza) {
				cookImg.attributes.src.nodeValue = pmiNoArmLeft;

				const event = new Event("pizza-in-oven");

				event.orderId = 1; // todo: capture real orderid
				cook3Img.dispatchEvent(event);
			}
			if (imgPath === pmiNoArmRight) {
				const freezer = new Freezer();

				freezer.open();
				setTimeout(() => {
					freezer.close();
					getCook(3).startWalk();
				}, 1000);
			}
		}
	};

	this.init = function() {
		cookImg.addEventListener("animationiteration", handleAnimationIteration);
		cookImg.addEventListener("order-up", this.orderUp);
		this.stopWalk();

		if (this.Id === 3) {
			console.log("wire up order-up");
			cook2Img.addEventListener("order-up", getPizzaFromFreezer);
		}

		if (this.Id === 1) {
			ovenImg.addEventListener("pizza-ready", getPizzaFromOven);
		}
	};
};

