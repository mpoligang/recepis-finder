import { ImageLoaderService } from './../../services/image-loader/image-loader.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-landing-background',
  imports: [SkeletonModule],
  templateUrl: './landing-background.component.html',
  styleUrl: './landing-background.component.scss'
})
export class LandingBackgroundComponent implements OnInit {

  public image = signal<string>('/food_background.jpg');
  public imageLoaded = signal<boolean>(false);


  private readonly imageLoaderService = inject(ImageLoaderService);

  ngOnInit(): void {
    this.imageLoaderService.handleLoadingImage(this.image(), this.imageLoaded);
  }

}
