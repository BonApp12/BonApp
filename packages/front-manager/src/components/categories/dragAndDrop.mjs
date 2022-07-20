import {toast} from "react-toastify";

export function dropInSameColumn(destination, source) {
    return !(destination.droppableId !== source.droppableId);
}

export function dropIntoAnotherCategory(destination, source, categories, plates, draggableId) {
    const sourcePlate = plates.find(currentPlate => currentPlate.id === parseInt(draggableId));
    const destinationCategoryIndex = categories.findIndex(currentCategory => currentCategory.id === parseInt(destination.droppableId));
    const isAlreadyInCategory = categories[destinationCategoryIndex].plates.some(currentPlate => currentPlate.id === parseInt(draggableId));
    if (isAlreadyInCategory) toast.warn("Ce plat est déjà dans cette catégorie");
    !isAlreadyInCategory && categories[destinationCategoryIndex].plates.push(sourcePlate);
    return categories;
}
