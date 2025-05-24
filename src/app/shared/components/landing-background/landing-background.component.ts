import { Component, OnInit, signal } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-landing-background',
  imports: [SkeletonModule],
  templateUrl: './landing-background.component.html',
  styleUrl: './landing-background.component.scss'
})
export class LandingBackgroundComponent implements OnInit {

  public imageLoaded = signal<boolean>(false);
  public imgSrc = signal<string>('/food_background.jpg');


  ngOnInit(): void {
    this.handleLoadingImage();
    const element = window.document.getElementById('landing-background');
    if (element) {
      element.click();
    }
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
