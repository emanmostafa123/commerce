import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, HttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationLoader } from './translation-loader';
import { AuthInterceptor } from './shared/core/auth.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import myTheme from './myTheme';

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
        useFactory: (http: HttpClient) => new TranslationLoader(http),
        deps: [HttpClient]
      }
    })
  ),
  provideHttpClient(withInterceptors([AuthInterceptor])),
  ]
};


