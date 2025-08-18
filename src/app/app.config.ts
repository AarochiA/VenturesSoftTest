import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './infraestructure/helpers/interceptors/auth.interceptor';
import { authReducer } from './infraestructure/store/auth/auth.reducer';
import { AuthEffects } from './infraestructure/store/auth/auth.effects';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: true,
      traceLimit: 25,
    }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/' }),
      fallbackLang: 'en',
      lang: 'es',
    }),

    // Configuracion para el depliegue en servidores por Ej. Netlify o Amplify
    // para que no se pierda la aplicacion al hacer refresh en el Navegador.
    // HashStrategy
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // }
  ],
};
