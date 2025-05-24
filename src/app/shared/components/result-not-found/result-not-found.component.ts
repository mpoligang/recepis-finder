import { Component, OnInit, signal } from '@angular/core';
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


  ngOnInit(): void {
    this.handleLoadingImage();
  }


  private handleLoadingImage(): void {
    const img = new Image();
    img.src = this.imgSrc();
    img.onload = () => {
      this.imageLoaded.set(true);
    };
    img.onerror = () => {
      this.imageLoaded.set(true);
    };
  }
}
