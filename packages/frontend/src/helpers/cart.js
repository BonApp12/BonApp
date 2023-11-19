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
    const indexOfPlateInCart = newCart.findIndex(plate => plate.id === plateToAdd.id);
    // Si le plat n'existe pas dans le panier on l'ajoute
    if (indexOfPlateInCart === -1) {
        return [...newCart, plateToAdd];
    }
    newCart[indexOfPlateInCart].quantity++;
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

export function updateUsersCart(users, nickname) {
    return users.filter((user) => user?.nickname !== nickname);
}
