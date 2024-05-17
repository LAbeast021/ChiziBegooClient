import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { HomeComponent } from "./home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { SocialLoginModule, SocialAuthService, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment.development';
// import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,
     CommonModule,
      HttpClientModule,
       NavBarComponent,
       SocialLoginModule,
      ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})


export class AppComponent {
  title = 'ChiziBegoo';
}
