import { Component , Inject , PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
 import { AuthService } from '../auth/auth.service';
 import { environment } from '../../environments/environment';
 import { HttpClient } from '@angular/common/http';
 import { MatIconModule } from '@angular/material/icon' ;
import { MatButtonModule } from '@angular/material/button' ;
import { MatCardModule } from '@angular/material/card' ;
import { isPlatformBrowser } from '@angular/common';
import { Platform } from '@angular/cdk/platform';


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [MatButtonModule , MatIconModule , MatCardModule , RouterLink],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent  {
  posts: any[] = []; // Ensure you have a posts array to store your posts

  constructor(private http: HttpClient, private router: Router, private authService: AuthService , @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/index']);
      } else {
        if (isPlatformBrowser(this.platformId)) {
        this.getAllPosts();
        }
      }
    });
  }

  getAllPosts() {
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
    this.http.get<any[]>(`${environment.baseUrl}/api/posts/feed/${userId}`).subscribe({
      next: (posts) => {
        console.log('Posts:', posts);
        this.posts = posts.map(post => ({
          ...post,
          isLiked: false, // Add isLiked property to track like status
          originalLikesCount: post.likesCount, // Keep original likes count for toggling
          displayLikesCount: post.likesCount // Display likes count that can be changed
        }));
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  toggleLike(post: any) {
    post.isLiked = !post.isLiked;
    // Update displayLikesCount based on whether the post is liked or not
    post.displayLikesCount = post.isLiked ? post.originalLikesCount + 1 : post.originalLikesCount;
    // Optionally, send a request to your backend to update the like status
    this.updateLikeStatus(post);
  }

  updateLikeStatus(post: any) {
    const url = `${environment.baseUrl}/api/posts/${post.id}/like`; // Adjust URL as needed
    this.http.post(url, { liked: post.isLiked }).subscribe({
      next: (response) => console.log('Like updated:', response),
      error: (error) => console.error('Error updating like:', error)
    });
  }
}