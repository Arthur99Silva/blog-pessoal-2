import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// ⬇️ import do provider
import { provideLottieOptions } from 'ngx-lottie';

import { APP_ROUTES } from './app/app.routes';
import { AppComponent } from './app/app.component';

// factory para o player
export function playerFactory() {
  return import('lottie-web');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule
    ),
    // ⬇️ registra o Lottie globalmente
    provideLottieOptions({
      player: playerFactory,
      // opcional: cache, etc.
    })
  ]
}).catch(err => console.error(err));
