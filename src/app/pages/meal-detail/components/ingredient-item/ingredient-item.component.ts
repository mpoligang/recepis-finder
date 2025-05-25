import { ImageLoaderService } from './../../../../shared/services/image-loader/image-loader.service';
import { Component, inject, input, signal, SimpleChanges } from '@angular/core';
import { Ingredient, IngredientInstance } from '../../../../shared/models/Ingredients.interface';

@Component({
  selector: 'app-ingredient-item',
  imports: [],
  templateUrl: './ingredient-item.component.html',
  styleUrl: './ingredient-item.component.scss'
})
export class IngredientItemComponent {

  public item = input<Ingredient>(new IngredientInstance());

  public imageLoaded = signal<boolean>(false);
  public imageOnError = signal<boolean>(false);

  private readonly imageLoaderService = inject(ImageLoaderService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && changes['item'].currentValue !== changes['item'].previousValue) {
      this.imageLoaderService.handleLoadingImage(this.item().thumbs.small, this.imageLoaded, this.imageOnError);
    }
  }



}
