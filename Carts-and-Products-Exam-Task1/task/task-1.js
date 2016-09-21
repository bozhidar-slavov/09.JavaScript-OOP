/* globals module */

"use strict";

function solve() {
    class Product {
        constructor(productType, name, price) {
            this._productType = productType;
            this._name = name;
            this._price = price;
        }

        get productType() {
            return this._productType;
        }
        set productType(productType) {
            if (typeof productType !== 'string') {
                throw new Error('Product type must be a string!');
            }

            this._productType = productType;
        }

        get name() {
            return this._name;
        }
        set name(name) {
            if (typeof name !== 'string') {
                throw new Error('Name must be a string!');
            }

            this._name = name;
        }

        get price() {
            return this._price;
        }
        set price(price) {
            if (typeof productType !== 'number') {
                throw new Error('Price must be a number!');
            }

            this._price = price;
        }
    }

    class ShoppingCart {
        constructor() {
            this.products = [];
        }

        add(product) {
            if (!(product instanceof Product)) {
                throw new Error('Must add only Prodcut class instances!');
            }

            this.products.push(product);
            return this;
        }

        remove(product) {
            if (!(product instanceof Product)) {
                throw new Error('Must add only Product class instances!');
            }

            if (this.products.length === 0) {
                throw new Error('No products in shopping cart!');
            }

            var index = this.products.indexOf(product);
            if (index > -1) {
                this.products.splice(index, 1);
            } else {
                throw new Error('Product does not exist!');
            }
        }

        showCost() {
            if (this.products.length === 0) {
                return 0;
            }

            let sum = 0;
            let len = this.products.length;
            for (var i = 0; i < len; i++) {
                sum += this.products[i]._price;
            }

            return sum;
        }

        showProductTypes() {
            let uniqueTypes = {};

            let len = this.products.length;
            for (let i = 0; i < len; i += 1) {
                uniqueTypes[this.products[i].productType] = true;
            }

            return Object.keys(uniqueTypes).sort(function (a, b) {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });
        }

        getInfo() {
            let info = {};
            info.totalPrice = this.showCost();
            info.products = [];
            let names = {};
            let len = this.products.length;

            for (let i = 0; i < len; i += 1) {
                if (!names[this.products[i].name]) {
                    names[this.products[i].name] = {};
                    names[this.products[i].name].price = 0;
                    names[this.products[i].name].quantity = 0;
                }

                names[this.products[i].name].price += this.products[i].price;
                names[this.products[i].name].quantity += 1;
            }

            let props = Object.keys(names);

            for (let i = 0; i < props.length; i += 1) {
                info.products.push({
                    name: props[i],
                    totalPrice: names[props[i]].price,
                    quantity: names[props[i]].quantity
                });
            }

            return info;
        }
    }

    return {
        Product, ShoppingCart
    };
}

module.exports = solve;