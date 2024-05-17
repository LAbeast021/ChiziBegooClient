import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { Console } from 'console';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon' ;
import { MatButtonModule } from '@angular/material/button' ;
import { MatCardModule } from '@angular/material/card' ;

@Component({
  standalone : true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule , RouterOutlet, RouterLink, RouterLinkActive , MatButtonModule , MatIconModule , MatCardModule]
})
export class ProfileComponent implements OnInit {
  message: string = '';  // To store the personalized message from the backend
  email: string = ''; 
  userProfile : any = {} ;
  userId : number = 0;
  posts : any = [];

  constructor(private http: HttpClient , private router:Router , private authService : AuthService) {}

  ngOnInit() {
    if (this.authService.getIsLoggedIn()) {
      this.getUserInfo();
    }
    else{
      this.router.navigate(['/index']);
    }
  }

  getUserInfo() {
    this.http.get<{message: string, email?: string , user: object}>(`${environment.baseUrl}/api/users/logedinuser`)
    .subscribe({
      next: (data) => {
        this.userProfile = data.user;
        console.log("in profile component ts with this data " , data.user)
        localStorage.setItem('user_info', JSON.stringify(data.user)); // Store the user info in localStorage
        localStorage.setItem('userId' , this.userProfile.userId)
        this.message = data.message;
        if (data.email) {
          this.email = data.email;
        };
        this.getUserPosts(data.user);
      },
      error: (error) => {
        console.log('There was an error!', error);
        this.router.navigate(['/index']);
        // Optionally handle user feedback here
      }
    });

  }

  getUserPosts(user: any) {
    this.http.get<any[]>(`${environment.baseUrl}/api/posts/user/${user.userId}`).subscribe({
      next: (posts) => {
        if (posts.length > 0) {
          console.log("User's posts:", posts);
          this.posts = posts;
        } else {
          console.log("No posts found for this user.");
        }
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  }





// this.http.get<string>(`${environment.baseUrl}/api/users/message`) This will get the data as an string 
  // ===== Or we can tell it to expect a txt like this 
// this.http.get(`${environment.baseUrl}/api/users/message`, { responseType: 'text' })
// .subscribe({
//   next: (data) => this.message = data,
//   error: (error) => console.error('There was an error!', error)
// });