import {
  Component,
  inject,
  input,
  model,
  OnChanges,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ApiService } from '../../../../shared/api/api.service';
import { finalize, take } from 'rxjs';
import { IngredientDto } from '../../../../shared/api/dtos/IngredientDto.interface';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-meals-filter',
  imports: [
    DialogModule,
    ButtonModule,
    DividerModule,
    SelectModule,
    SkeletonModule,
    FormsModule,
    SkeletonModule
  ],
  templateUrl: './meals-filter.component.html',
  styleUrl: './meals-filter.component.scss',
})
export class MealsFilterComponent implements OnChanges {
  public visible = model<boolean>(false);
  public selectedIngredient = input<string>('');
  public dataHasLoaded = signal<boolean>(false);
  public isLoading = signal<boolean>(false);
  public data = signal<Array<Array<IngredientDto>>>([]);
  public loadingSkeletonData = signal<number[]>(new Array(5).fill(1));

  public currentPage = signal<number>(1);
  public currentData = signal<IngredientDto[]>([]);
  public totalRecords = signal<number>(0);
  public totalPages = signal<number[]>([]);
  public selected = signal<string>(this.selectedIngredient());

  public filterAction = output<string>();

  private readonly apiService = inject(ApiService);

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['visible'] && !this.dataHasLoaded() && this.visible()) {
      this.initializeIngredients();
    }

    if (changes['selectedIngredient'] && !this.selectedIngredient()) {
      this.currentPage.set(1);
      this.onPageChange();
      this.selected.set('');
    }
  }

  public save(): void {
    this.filterAction.emit(this.selected());
    this.visible.set(false);
  }

  public onPageChange(): void {
    const currentData = this.data()[this.currentPage() - 1];
    this.currentData.set(currentData);
  }

  private initializeIngredients(): void {
    this.isLoading.set(true);
    this.apiService
      .getIngredients()
      .pipe(
        take(1),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        if (typeof response.meals === 'object' && response.meals) {
          this.totalRecords.set(response.meals.length);
          const pages = this.divideIntoPages(response.meals);
          this.totalPages.set(
            new Array(pages.length).fill(0).map((_, i) => i + 1)
          );
          this.data.set(pages);
          this.currentData.set(pages[this.currentPage() - 1]);
          this.dataHasLoaded.set(true);
        }
      });
  }

  private divideIntoPages(data: Array<any>, elementPerPage = 30) {
    const pages = [];
    for (let i = 0; i < data.length; i += elementPerPage) {
      pages.push(data.slice(i, i + elementPerPage));
    }
    return pages;
  }
}
