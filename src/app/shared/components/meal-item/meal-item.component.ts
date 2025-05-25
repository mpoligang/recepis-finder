import { ImageLoaderService } from './../../services/image-loader/image-loader.service';
import { Component, inject, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-meal-item',
  imports: [ButtonModule, TagModule],
  templateUrl: './meal-item.component.html',
  styleUrl: './meal-item.component.scss'
})
export class MealItemComponent implements OnChanges {

  public title = input<string | null | undefined>();
  public height = input<string>('');
  public favorite = input<boolean>(false);
  public preparationTime = input<string | undefined | null>(null);
  public image = input<string>('200px');

  public setFavorite = output<void>();
  public clickItem = output<void>();

  public imageLoaded = signal<boolean>(false);
  public imageOnError = signal<boolean>(false);

  private readonly imageLoaderService = inject(ImageLoaderService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['image'] && changes['image'].currentValue !== changes['image'].previousValue) {
      this.imageLoaderService.handleLoadingImage(this.image(), this.imageLoaded, this.imageOnError);
    }
  }

  public handleFavorite($event: Event): void {
    $event.stopImmediatePropagation();
    this.setFavorite.emit();
  }





}
