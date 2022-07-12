import {cloneDeep} from "tailwindcss/lib/util/cloneDeep";

export function removeItemFromCart(cart, plateToRemove) {
    const newCart = cloneDeep(cart);
    const index = newCart.findIndex(plate => plate.id === plateToRemove.id);
    newCart[index].quantity--;
    if (newCart[index].quantity === 0) {
        newCart.splice(index, 1);
    }
    return newCart;
}

export function addItemToCart(cart, plateToAdd) {
    const newCart = cloneDeep(cart);
    const index = newCart.findIndex(plate => plate.id === plateToAdd.id);
    if (index === -1) {
        return [...newCart, plateToAdd];
    }
    newCart[index].quantity++;
    return newCart;
}

export function initializeCart(cart, plates) {
    if (cart.length > 0) {
        return plates.map((item) => ({
            ...item,
            quantity: cart[cart.findIndex(plateInCart => plateInCart.id === item.id)]?.quantity || 1
        }));
    } else {
        return plates.map((item) => ({
            ...item,
            quantity: 1,
        }));
    }
}

export function updateUsersCart(carts, user, nickname) {
    return carts.filter((user) => user?.nickname !== nickname);
}
