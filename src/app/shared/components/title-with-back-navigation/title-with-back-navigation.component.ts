import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-title-with-back-navigation',
  imports: [ButtonModule, SkeletonModule],
  templateUrl: './title-with-back-navigation.component.html',
  styleUrl: './title-with-back-navigation.component.scss'
})
export class TitleWithBackNavigationComponent {

  public title = input<string>();
  public isLoading = input<boolean>(false);
  public backNavigation = output<void>();

}
