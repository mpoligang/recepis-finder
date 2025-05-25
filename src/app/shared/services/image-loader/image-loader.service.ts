import { Injectable, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageLoaderService {

  public handleLoadingImage(
    image: string,
    loadedSignal: WritableSignal<boolean>,
    errorSignal?: WritableSignal<boolean>
  ): void {
    this.resetValues(loadedSignal, errorSignal);
    const img = new Image();
    img.src = image;
    img.onload = () => {
      errorSignal?.set(false);
      loadedSignal.set(true);
    };
    img.onerror = () => {
      errorSignal?.set(true);
      loadedSignal.set(true);
    };
  }

  private resetValues(
    loadedSignal: WritableSignal<boolean>,
    errorSignal?: WritableSignal<boolean>): void {
    errorSignal?.set(false);
    loadedSignal.set(false);
  }
}
