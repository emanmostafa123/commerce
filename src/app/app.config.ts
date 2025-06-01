import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, HttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationLoader, createTranslationLoader } from './translation-loader';
import { AuthInterceptor } from './shared/core/auth.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import myTheme from './myTheme';
import { DOCUMENT } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(),
  provideAnimations(),
  providePrimeNG({
    theme: {
      preset: myTheme,
      options: {
        darkModeSelector: false
      }
    }
  }),
  provideToastr(),
  provideHttpClient(),
   importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslationLoader,
          deps: [HttpClient, DOCUMENT]
        }
      })
    ),
  provideHttpClient(withInterceptors([AuthInterceptor])),
  ]
};


