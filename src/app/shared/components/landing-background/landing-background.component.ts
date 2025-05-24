import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-landing-background',
  imports: [SkeletonModule],
  templateUrl: './landing-background.component.html',
  styleUrl: './landing-background.component.scss'
})
export class LandingBackgroundComponent { }
