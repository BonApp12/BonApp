export enum PlateRole {
    ENTREE = 'ENTREE',
    PLAT = 'PLAT',
    DESSERT = 'DESSERT',
}
export function setPlateRole(role:string) {
    switch (role) {
        case 'ENTREE':
            return PlateRole.ENTREE;
        case 'PLAT':
            return PlateRole.PLAT;
        case 'DESSERT':
            return PlateRole.DESSERT;
        default:
            return PlateRole.ENTREE;
    }
}
