import { inject, Injectable } from '@angular/core';
import { FavoriteService } from './../favorite/favorite.service';
import { MealBasicList, MealListInstace } from './../../models/MealList.interface';
import { MealDto } from '../../api/dtos/MealDto.interface';
import { Ingredient } from '../../models/Ingredients.interface';
import { Thumbs } from '../../models/Thumbs.interface';
import { Meal } from '../../models/Meal.interface';
import { environment } from '../../../../environments/environment';
import { Preparation } from '../../models/Preparation.interface';
import { GenericResponseDto } from '../../api/dtos/GenericResponseDto.interface';

@Injectable({
  providedIn: 'root'
})
export class MapStructService {

  private readonly favoriteService = inject(FavoriteService);

  public mapMealsResponseResultbyFilter(data: GenericResponseDto<MealDto>): MealBasicList {
    if (!data || !Array.isArray(data.meals)) { return new MealListInstace(); }
    return {
      data: data.meals.map(item => ({
        id: item.idMeal,
        title: item.strMeal,
        thumbs: this.extractThumbSizes(item.strMealThumb),
        favorite: this.favoriteService.checkIfIsFavorite(item.idMeal)
      })),
      result: data.meals.length
    }
  }

  public mapMealsCompleteResponse(data: GenericResponseDto<MealDto>): Meal | null {
    if (!data || !Array.isArray(data.meals)) { return null; }
    const meal = data.meals[0];
    return {
      ...this.mapMealsResponse(meal)
    };
  }

  public mapMealsResponse(data: MealDto): Meal {
    return {
      id: data.idMeal,
      category: data.strCategory,
      title: data.strMeal,
      source: data.strSource,
      youtube: data.strYoutube,
      thumbs: this.extractThumbSizes(data.strMealThumb),
      nationality: data.strArea,
      tags: data.strTags ? data.strTags.split(',').join(', ') : null,
      preparation: this.extractPreparationsStep(data.strInstructions),
      ingredients: this.extractIngredientsAndMeasures(data),
      estimatedTime: this.estimateStringTimeFromInstructions(data.strInstructions),
      favorite: this.favoriteService.checkIfIsFavorite(data.idMeal)
    }
  }

  private extractThumbSizes(thumb: string): Thumbs {
    return {
      small: `${thumb}/small`,
      medium: `${thumb}/medium`,
      large: thumb
    }
  }

  private extractIngredientsAndMeasures(data: MealDto): Array<Ingredient> {

    const keys = Object.keys(data);
    const strIngredients = keys.filter(item => item.startsWith('strIngredient'));

    const ingredients: Ingredient[] = [];

    for (let index = 1; index < strIngredients.length - 1; index++) {
      const ingredient = (data)[`strIngredient${index}` as keyof MealDto];
      const measure = (data)[`strMeasure${index}` as keyof MealDto];
      if (ingredient && ingredient.trim() !== '') {
        const pippo = ingredient.replace(' ', '%20')
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || '',
          thumbs: {
            small: `${environment.imageApi}/ingredients/${pippo}-small.png`,
            medium: `${environment.imageApi}/ingredients/${pippo}.png`,
            large: `${environment.imageApi}/ingredients/${pippo}-large.png`,
          }
        });
      }
    }
    return ingredients;
  }


  private estimateStringTimeFromInstructions(instructions: string): string | undefined {

    const timePattern = /\b(\d+(?:\.\d+)?)\s*(days?|day|hours?|hour|h|hrs|minutes?|m|minute|mins?|min|seconds?|secs?|sec)\b/gi;
    const matches = [...instructions.matchAll(timePattern)];

    let totalSeconds = 0;

    for (const match of matches) {
      const value = parseFloat(match[1]);
      const unit = match[2]?.toLowerCase();

      if (isNaN(value) || !unit) { continue; }

      if (unit.startsWith('day')) {
        totalSeconds += value * 86400;
      }
      if (unit.startsWith('h')) {
        totalSeconds += value * 3600;
      }
      if (unit.startsWith('m')) {
        totalSeconds += value * 60;
      }
      if (unit.startsWith('s')) {
        totalSeconds += value;
      }
    }

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) { parts.push(`${hours}h`) };
    if (minutes > 0) { parts.push(`${minutes}m`) };
    if (seconds > 0) { parts.push(`${seconds}s`) };

    return parts.length > 0 ? parts.join(' ') : undefined;
  }

  public extractPreparationsStep(instructions: string): Preparation[] {
    const steps = instructions.split(/\r?\n/).filter(line => line.trim() !== '');
    let stepsArray: Preparation[] = [];
    stepsArray = steps.filter(item => !item.startsWith('STEP') && item.length > 1).map((instructions, index) => {
      return {

        step: index + 1,
        instructions
      }
    });
    return stepsArray;
  }



}
