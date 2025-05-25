import { Meal, MealBasicData } from "./Meal.interface";


export interface MealBasicList {
    results: number | null;
    data: Array<MealBasicData>;
}


export class MealListInstace implements MealBasicList {
    public results: number | null;
    public data: Array<Meal>;

    constructor() {
        this.results = null;
        this.data = [];
    }
}

