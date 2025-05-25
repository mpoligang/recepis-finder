import { ImageLoaderService } from './../../services/image-loader/image-loader.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-result-not-found',
  imports: [SkeletonModule],
  templateUrl: './result-not-found.component.html',
  styleUrl: './result-not-found.component.scss'
})
export class ResultNotFoundComponent implements OnInit {

  public imageLoaded = signal<boolean>(false);
  public imgSrc = signal<string>('./noresult.gif');

  private readonly imageLoaderService = inject(ImageLoaderService);

  ngOnInit(): void {
    this.imageLoaderService.handleLoadingImage(this.imgSrc(), this.imageLoaded);
  }


}
