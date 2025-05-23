import { FavoriteService } from './../../shared/services/favorite/favorite.service';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../shared/api/api.service';
import { TitleWithBackNavigationComponent } from '../../shared/components/title-with-back-navigation/title-with-back-navigation.component';
import { finalize, of, take, fromEvent, Subject, takeUntil } from 'rxjs';
import { AppRouting } from '../../shared/consts/AppRouting';
import { Meal, MealInstance } from '../../shared/models/Meal.interface';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MealItemComponent } from '../../shared/components/meal-item/meal-item.component';
import { Tabs } from './enums/Tabs.enum';
import { IngredientItemComponent } from './components/ingredient-item/ingredient-item.component';
import { PreparationItemComponent } from './components/preparation-item/preparation-item.component';
import { LoadingMealDetailComponent } from './components/loading-meal-detail/loading-meal-detail.component';
import { ButtonSize } from '../../shared/models/ButtonSize.type';

@Component({
  selector: 'app-meal-detail',
  imports: [
    TitleWithBackNavigationComponent,
    ButtonModule,
    MenuModule,
    ConfirmDialogModule,
    MealItemComponent,
    IngredientItemComponent,
    PreparationItemComponent,
    LoadingMealDetailComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.scss',
})
export class MealDetailComponent implements OnInit, OnDestroy {
  public data = signal<Meal>(new MealInstance());
  public selectedTab = signal<Tabs>(Tabs.INGREDIENTS);
  public isLoading = signal<boolean>(false);
  public menuItems = signal<MenuItem[]>([]);
  public tabButtonSize = signal<ButtonSize>(undefined);

  public tabs = Tabs;

  private id: string;
  private readonly destroy$: Subject<void>;

  private readonly apiService = inject(ApiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly favoriteService = inject(FavoriteService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  constructor() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.destroy$ = new Subject();
  }

  ngOnInit(): void {
    this.handleSetButtonSize();
    this.initializeData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public backToList(): void {
    this.router.navigate([`/${AppRouting.LIST}`]);
  }

  public get getButtonSize() {
    return of(window.innerWidth <= 375);
  }

  public confirmHandleFavorite(): void {
    const header = !this.data()?.favorite
      ? 'Set as favorites'
      : 'Remove from favorites';
    const message = `Are you sure that you want to ${this.data().favorite ? 'remove from favorites' : 'save as favorites'
      } ${this.data().title}`;
    this.confirmationService.confirm({
      message,
      header,
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => this.handleFavorite(),
      reject: () => this.confirmationService.close(),
    });
  }

  private handleFavorite(): void {
    this.data().favorite = !this.data()?.favorite;
    this.data()?.favorite
      ? this.favoriteService.setAsFavorite(this.data())
      : this.favoriteService.removeFromFavorites(this.data());
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail:
        this.data().title +
        (this.data().favorite
          ? ` saved as favorite`
          : ` removed from favorites`),
    });
  }

  private initializeData(): void {
    this.isLoading.set(true);
    this.apiService
      .getMealById(this.id)
      .pipe(
        take(1),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        if (!response) {
          this.handleNotFound();
          return;
        }
        this.data.set(response);
        this.menuItems.set(this.getMenuItems());
      });
  }

  private getMenuItems(): MenuItem[] {
    return [{
      label: 'Resources',
      items: [
        {
          label: 'Receip Link',
          icon: 'pi pi-link',
          url: this.data().source ?? ''
        },
        {
          label: 'Youtube',
          icon: 'pi pi-youtube',
          url: this.data().youtube ?? ''
        }
      ]
    }];
  }

  private handleNotFound(): void {
    this.router.navigate([`/${AppRouting.NOT_FOUND}`], {
      queryParams: {
        message: `Result not found for invalid meal-ID ${this.id}`,
        navigationPath: AppRouting.LIST,
        navigationLabel: 'Back to List',
      },
    });
  }

  private handleSetButtonSize(): void {
    fromEvent(window, 'resize').pipe(takeUntil(this.destroy$)).subscribe(() => {
      const isSmall = window.innerWidth <= 375;
      this.tabButtonSize.set(isSmall ? 'small' : undefined);
    })
  }
}
