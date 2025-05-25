import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MapStructService } from './../services/map-struct/map-struct.service';
import { environment } from '../../../environments/environment';
import { MealBasicList } from '../models/MealList.interface';
import { ApiEndpoints } from '../consts/ApiEndpoints';
import { MealDto } from './dtos/MealDto.interface';
import { GenericResponseDto } from './dtos/GenericResponseDto.interface';
import { IngredientDto } from './dtos/IngredientDto.interface';
import { Meal } from '../models/Meal.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly http = inject(HttpClient);
  private readonly mapStructService = inject(MapStructService);

  public searchMeals(term?: string): Observable<MealBasicList> {
    let params = new HttpParams().append('s', term ?? '');
    return this.http.get<GenericResponseDto<MealDto>>(`${environment.api}/${ApiEndpoints.SEARCH}`, { params })
      .pipe(map((data: GenericResponseDto<MealDto>) => this.mapStructService.mapMealsResponseResultbyFilter(data)));
  }

  public searchMealsByIngredient(ingredient?: string): Observable<MealBasicList> {
    let params = new HttpParams().append('i', ingredient ?? '');
    return this.http.get<GenericResponseDto<MealDto>>(`${environment.api}/${ApiEndpoints.FILTER}`, { params })
      .pipe(map((data: GenericResponseDto<MealDto>) => this.mapStructService.mapMealsResponseResultbyFilter(data)));
  }

  public getMealById(id: string): Observable<Meal | null> {
    let params = new HttpParams().append('i', id);
    return this.http.get<GenericResponseDto<MealDto>>(`${environment.api}/${ApiEndpoints.LOOKUP}`, { params })
      .pipe(map((data: GenericResponseDto<MealDto>) => this.mapStructService.mapMealCompleteResponse(data)));
  }

  public getIngredients(): Observable<GenericResponseDto<IngredientDto>> {
    let params = new HttpParams().append('i', 'list');
    return this.http.get<GenericResponseDto<IngredientDto>>(`${environment.api}/${ApiEndpoints.LIST}`, { params });
  }




}
