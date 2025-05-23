import { Component, signal } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-loading-meal-detail',
  imports: [SkeletonModule],
  templateUrl: './loading-meal-detail.component.html',
  styleUrl: './loading-meal-detail.component.scss'
})
export class LoadingMealDetailComponent {

  public fakeData = signal<number[]>(new Array(4));

}
