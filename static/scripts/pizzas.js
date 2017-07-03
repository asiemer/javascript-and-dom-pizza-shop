"use strict";

/* exported Pizza, PizzaTable */

/** Represents a pizza
 * @constructor
 * @param {number} customerId - Which customer is this pizza for? 
 */

const Pizza = function(customerId) {
	this.CustomerId = customerId;
};

/** Represents a PizzaTable
 * @constructor
 */

const PizzaTable = function() {
	const table = document.getElementById("table1");
	const cook1Img = document.getElementById("cook1");


	const top = getComputedStyle(table).top.replace("px", "");
	const left = getComputedStyle(table).left.replace("px", "");
	const pizzaBox = "static/images/pizza-box.png";

	const cTop = top;
	const cLeft = left;
	const boxHeight = 20;

	this.init = function() {
		cook1Img.addEventListener("pizza-done", () => {
			new PizzaTable().paintPizzas();
		});
	};

	this.Pizzas = [];

	this.addPizza = function(pizza) {
		this.Pizzas.push(pizza);
	};

	this.paintPizzas = function() {

		const body = document.getElementById("restaurant");

		let calcTop = parseInt(cTop, 10) - 20;

		for (let i = 0; i < 5; i++) {
			calcTop = calcTop - parseInt(boxHeight, 10);
			const img = document.createElement("img");

			img.setAttribute("src", pizzaBox);
			img.setAttribute("id", `pizza-box-${i}`);
			img.setAttribute("style", `z-index:1;left:${cLeft}px;top:${calcTop}px;`);
			img.setAttribute("class", "actor");
			body.appendChild(img);
		}
	};
};
