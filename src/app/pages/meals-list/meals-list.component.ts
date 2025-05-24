import { Router } from '@angular/router';
import { Component, signal, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { take, finalize } from 'rxjs';
import { ApiService } from '../../shared/api/api.service';
import { ResultNotFoundComponent } from '../../shared/components/result-not-found/result-not-found.component';
import { MealBasicData } from '../../shared/models/Meal.interface';
import { FavoriteService } from '../../shared/services/favorite/favorite.service';
import { MealItemComponent } from '../../shared/components/meal-item/meal-item.component';
import { MealsSearchBarComponent } from './components/meals-search-bar/meals-search-bar.component';
import { AppRouting } from '../../shared/consts/AppRouting';
import {
  MealBasicList,
  MealListInstace,
} from '../../shared/models/MealList.interface';
import { TitleWithBackNavigationComponent } from '../../shared/components/title-with-back-navigation/title-with-back-navigation.component';
import { MealsFilterComponent } from './components/meals-filter/meals-filter.component';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-meals-list',
  imports: [
    MealsSearchBarComponent,
    MealItemComponent,
    SkeletonModule,
    ButtonModule,
    ChipModule,
    ResultNotFoundComponent,
    ConfirmDialogModule,
    TitleWithBackNavigationComponent,
    MealsFilterComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './meals-list.component.html',
  styleUrl: './meals-list.component.scss',
})
export class MealsListComponent implements OnInit {

  public mealList = signal<MealBasicList>(new MealListInstace());
  public isLoading = signal<boolean>(false);
  public skeletonData = signal<number[]>(new Array(20));
  public showFilter = signal<boolean>(false);
  public searchValue = signal<string>('');
  public ingredientFilter = signal<string>('');

  private readonly apiService = inject(ApiService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.handleSearch('');
  }

  public handleSearch(search: string): void {
    if (search !== "" && this.searchValue() === search) {
      return;
    }
    this.resetValues();
    this.searchValue.set(search);
    this.isLoading.set(true);
    this.apiService
      .searchMeals(search)
      .pipe(
        take(1),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        this.mealList.set(response);
      });
  }

  public handleFilter(ingredient: string): void {
    if (this.ingredientFilter() === ingredient) { return; }
    this.resetValues();
    this.ingredientFilter.set(ingredient);
    this.isLoading.set(true);
    this.apiService
      .searchMealsByIngredient(ingredient)
      .pipe(
        take(1),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        this.mealList.set(response);
      });
  }

  public goToDetail(id: string): void {
    this.router.navigate([`${AppRouting.DETAIL}/${id}`]);
  }

  public handleBackToLanding(): void {
    this.router.navigate([`/${AppRouting.LANDING}`]);
  }

  public getMealItemPadding(index: number) {
    return {
      'lg:pr-0': (index + 1) % 3 === 0,
      'lg:pr-2': (index + 1) % 3 !== 0,
      'lg:pl-0': true,
      'md:pr-0': (index + 1) % 3 === 0,
      'md:pr-2': (index + 1) % 3 !== 0,
      'md:pl-0': true,
      'sm:pr-0': (index + 1) % 2 === 0,
      'sm:pr-2': (index + 1) % 2 !== 0,
      'sm:pl-0': true,
    };
  }

  public confirmHandleFavorite(data: MealBasicData): void {
    const header = !data.favorite
      ? 'Set as favorites'
      : 'Remove from favorites';
    const message = `Are you sure that you want to ${data.favorite ? 'remove from favorites' : 'save as favorites'
      } ${data.title}`;
    this.confirmationService.confirm({
      message,
      header,
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => this.handleFavorite(data),
      reject: () => this.confirmationService.close(),
    });
  }

  private handleFavorite(data: MealBasicData): void {
    data.favorite = !data.favorite;
    data.favorite
      ? this.favoriteService.setAsFavorite(data)
      : this.favoriteService.removeFromFavorites(data);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail:
        data.title +
        (data.favorite ? ` saved as favorite` : ` removed from favorites`),
    });
  }

  private resetValues(): void {
    this.searchValue.set('');
    this.ingredientFilter.set('');
    this.mealList.set(new MealListInstace());
  }
}
