class Billing {
    constructor() {
        this.prices = {
            Small: 12,
            Medium: 14,
            Large: 16,
        };

        this.toppingPrices = {
            Small: { basic: 0.5, deluxe: 2 },
            Medium: { basic: 0.75, deluxe: 3 },
            Large: { basic: 1, deluxe: 4 },
        };

        this.basicToppings = ["Cheese", "Pepperoni", "Ham", "Pineapple"];
        this.deluxeToppings = ["Sausage", "Feta Cheese", "Tomatoes", "Olives"];
    }

    calculateToppingCost(size, toppings) {
        return toppings.reduce((total, topping) => {
            if (this.basicToppings.includes(topping)) {
                return total + this.toppingPrices[size].basic;
            }
            if (this.deluxeToppings.includes(topping)) {
                return total + this.toppingPrices[size].deluxe;
            }
            return total;
        }, 0);
    }

    generateReceipt(orders) {
        let subtotal = 0;
        const receiptLines = orders.map((order) => {
            const [size, toppingsPart] = order.split(" - ");
            const toppings = toppingsPart
                ? toppingsPart.split(",").map((topping) => topping.trim())
                : [];
            const pizzaCost = this.prices[size] + this.calculateToppingCost(size, toppings);
            subtotal += pizzaCost;
            const toppingList = toppings.length > 0 ? toppings.join(" and ") : "no toppings";
            return `1 ${size}, ${toppings.length} Topping Pizza - ${toppingList}: $${pizzaCost.toFixed(
                2
            )}`;
        });

        const gst = Math.ceil(subtotal * 0.05 * 100) / 100;
        const total = (subtotal + gst).toFixed(2);
        receiptLines.push(`Subtotal: $${subtotal.toFixed(2)}`);
        receiptLines.push(`GST: $${gst.toFixed(2)}`);
        receiptLines.push(`Total: $${total}`);

        return receiptLines.join("\n");
    }
}

export default new Billing();
