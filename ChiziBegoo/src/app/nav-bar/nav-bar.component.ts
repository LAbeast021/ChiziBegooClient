import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatButtonModule } from '@angular/material/button' ;
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor() {}
}
