import { Meal, MealBasicData } from "./Meal.interface";


export interface MealBasicList {
    result: number | null;
    data: Array<MealBasicData>;
}


export class MealListInstace implements MealBasicList {
    public result: number | null;
    public data: Array<Meal>;

    constructor() {
        this.result = null;
        this.data = [];
    }
}

