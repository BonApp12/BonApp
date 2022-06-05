import {Injectable} from '@nestjs/common';
import {Ingredient} from "../ingredients/entities/ingredient.entity";
import {PlateCategory} from "../plate-category/entities/plate-category.entity";

@Injectable()
export class CategoryAdapter {

    static toModel(category: PlateCategory): Ingredient {
        const CategoryModel = new PlateCategory();
        CategoryModel.id = category?.id;
        CategoryModel.name = category.name;
        return CategoryModel;
    }

    static ToArrayModel(categories: PlateCategory[]): PlateCategory[] {
        return categories.map(category => this.toModel(category));
    }

}

