import { Model } from "mongoose";
import { ICategory } from "../../../primerTrab/model/category.model";

export class ListCategories {
    constructor(private readonly categoryModel: Model<ICategory>) {}

    async execute(): Promise<ICategory[]> {
        const categories: ICategory[] = await this.categoryModel.find()
        return categories
    }
}