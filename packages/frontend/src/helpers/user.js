import {adjectives, animals, colors, uniqueNamesGenerator} from "unique-names-generator";


export function generateNickName(nickname, user = undefined) {
    if (!nickname) {
        if (user?.email !== undefined) return user.email;
        return (uniqueNamesGenerator({dictionaries: [adjectives, animals, colors]}));
    }
    return nickname;

}

export function hasChangedTable(currentRestaurantId, currentTableId, idRestaurantParams, idTableParams, order) {
    if (!currentRestaurantId || !currentTableId) return {idRestaurantParams, idTableParams, order};
    // si le restaurant n'a pas changé ou que la table ai changé on reset l'order
    if ((currentRestaurantId !== idRestaurantParams) || (currentRestaurantId === idRestaurantParams && currentTableId !== idTableParams))
        return [{idRestaurantParams, idTableParams, order: []}];

    return {idRestaurantParams, idTableParams, order};
    // if (currentRestaurantId === idRestaurantParams && currentTableId !== idTableParams) return {idRestaurantParams, idTableParams, order: []};
}
