export function searchByPlateName(plates = [], searchQuery = '') {
    return searchQuery.length ? plates.filter((plate) => {
        // Récupération des noms des plats, retrait des accents et mise en minuscule pour comparaison.
        const plateName = plate.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const finalQuery = searchQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return plateName.includes(finalQuery.toLowerCase());
    }) : plates;
}
