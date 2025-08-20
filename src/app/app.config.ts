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
import { provideHttpClient } from '@angular/common/http';
import { authReducer } from './infraestructure/store/auth/auth.reducer';
import { AuthEffects } from './infraestructure/store/auth/auth.effects';
import { provideTranslateService } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { CategoriesGateway } from './domain/gateways/categories-gateway';
import { ListCategoriesApiService } from './infraestructure/driven-adapters/listCategories.api.service';
import { BrandsGateway } from './domain/gateways/brands-gateway';
import { ListBrandsApiService } from './infraestructure/driven-adapters/listBrands.api.service';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
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
      fallbackLang: 'es',
      lang: 'en',
    }),
    { provide: CategoriesGateway, useClass: ListCategoriesApiService },
    { provide: BrandsGateway, useClass: ListBrandsApiService },

    // Configuracion para el depliegue en servidores por Ej. Netlify o Amplify
    // para que no se pierda la aplicacion al hacer refresh en el Navegador.
    // HashStrategy
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // }
  ],
};
