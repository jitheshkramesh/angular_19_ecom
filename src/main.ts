import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser'; 
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes'; 
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { errorInterceptor } from "./app/interceptors/error.interceptor";

bootstrapApplication(AppComponent, {
  providers: [ 
    provideZoneChangeDetection(),    
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: errorInterceptor,
      multi: true,
    },
    provideRouter(APP_ROUTES),
      // Provide the routes for navigation 
  ]
})