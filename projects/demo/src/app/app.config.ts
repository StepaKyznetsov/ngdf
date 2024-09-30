import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideDynamicControls } from 'ngdf';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideDynamicControls([
      [
        'text',
        () =>
          import('./controls/input/input.component').then(
            (c) => c.InputComponent,
          ),
      ],
    ]),
  ],
};
