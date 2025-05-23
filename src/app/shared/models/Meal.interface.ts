import { Preparation } from './Preparation.interface';
import { Ingredient } from './Ingredients.interface';
import { Thumbs } from './Thumbs.interface';


export interface MealBasicData {
  id: string;
  title: string;
  thumbs: Thumbs;
  favorite: boolean;
}
export interface Meal extends MealBasicData {
  category: string;
  source: string | null;
  youtube: string | null;
  nationality: string;
  tags: string | null;
  preparation: Preparation[];
  estimatedTime?: string;
  ingredients: Ingredient[];
}

export class MealInstance {
  public id: string;
  public category: string;
  public title: string;
  public source: string | null;
  public youtube: string | null;
  public nationality: string;
  public tags: string | null;
  public preparation: Preparation[];
  public estimatedTime?: string;
  public thumbs: Thumbs;
  public ingredients: Ingredient[];
  public favorite: boolean;

  constructor() {
    this.id = '';
    this.category = '';
    this.title = '';
    this.source = '';
    this.youtube = '';
    this.nationality = '';
    this.tags = '';
    this.preparation = [];
    this.estimatedTime = '';
    this.thumbs = {
      small: '',
      medium: '',
      large: ''
    };
    this.ingredients = [];
    this.favorite = false;
  }
}

