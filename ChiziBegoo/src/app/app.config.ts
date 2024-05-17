import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { SocialLoginModule, SocialAuthService, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment.development';



import { AuthInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideClientHydration(),
      provideAnimationsAsync(),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      provideHttpClient(withInterceptors([
        //AuthInterceptor
      ])) ,
      SocialAuthService,  // This ensures the service is available app-wide
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false, // Set true if you want to attempt to sign in automatically
          providers: [{
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId)  // Ensure this is your correct Google Client ID
          }],
          onError: (err) => {
            console.error('Error with social login', err);
          }
        } as SocialAuthServiceConfig
      }
    
    ]
};
