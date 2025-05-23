import { Component, input, model, OnDestroy, output, signal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  debounceTime,
  Subject,
  takeUntil,
} from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meals-search-bar',
  imports: [ButtonModule, InputIconModule, IconFieldModule, InputTextModule, FormsModule],
  templateUrl: './meals-search-bar.component.html',
  styleUrl: './meals-search-bar.component.scss',
})
export class MealsSearchBarComponent implements OnDestroy {

  public isLoading = input<boolean>(false);
  public results = input<number | null>(null);
  public searchAction = output<string>();
  public searchValue = model<string>('');

  private search$: Subject<void>;
  private destroy$: Subject<void>;

  constructor() {
    this.search$ = new Subject<void>();
    this.destroy$ = new Subject<void>();
    this.searchSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleSearch(): void {
    this.search$.next();
  }

  public handleClear(): void {
    this.searchValue.set('');
    this.searchAction.emit(this.searchValue());
  }

  private searchSubscription(): void {
    this.search$.pipe(
      takeUntil(this.destroy$),
      debounceTime(700),
    ).subscribe(() => this.searchAction.emit(this.searchValue()));
  }

}
