import { Component, OnInit, AfterViewInit, ElementRef, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

declare var google: any; // Declare the 'google' variable to avoid TypeScript errors

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object, // Inject PLATFORM_ID to determine the platform
    private ngZone: NgZone , // Inject NgZone 
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.setIsLoggedIn(false); // Set the user as logged out when this component loads
      localStorage.removeItem('id_token'); // Clear the token from localStorage when this component loads
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser
      this.loadGoogleApi().then(() => {
        this.initializeGoogleSignIn();
      }).catch(error => {
        console.error('Failed to load Google API:', error);
      });
    }
  }

  loadGoogleApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.accounts) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (typeof google !== 'undefined' && google.accounts) {
            resolve();
          } else {
            reject(new Error('Google API script loaded, but `google` object not available.'));
          }
        };
        script.onerror = () => reject(new Error('Failed to load Google API script.'));
        document.head.appendChild(script);
      }
    });
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.onSignInResponse.bind(this)
    });

    google.accounts.id.renderButton(
      this.elementRef.nativeElement.querySelector('#buttonDiv'),
      { theme: 'outline', size: 'large' }
    );
  }

  onSignInResponse(response: any) {
    console.log('User signed in', response.credential);
    // Run inside the Angular zone to ensure component updates and routing are recognized by Angular
    this.ngZone.run(() => {
      localStorage.setItem('id_token', response.credential);
      this.authService.setIsLoggedIn(true); // Set the user as logged in
      this.router.navigate(['/profile']); // Navigate to profile page
    });
  }
}
