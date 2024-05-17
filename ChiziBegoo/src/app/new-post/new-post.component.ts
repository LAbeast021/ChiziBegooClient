
 import { FormsModule } from '@angular/forms';
 import { PostService } from './post.service';
 import { Router, RouterLink } from '@angular/router';
 import { AuthService } from '../auth/auth.service';
import { Auth } from 'googleapis';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  postContent: string = '';

  constructor(private postService: PostService, private router: Router , private authService : AuthService) {} // Inject Router here

  ngOnInit() {
    this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn === false) {
        this.router.navigate(['/index']);
      }
    });
  }

  onSubmit() {
    if (!this.postContent) {
        alert('Please enter some text for the post');
        return;
    }
    this.postService.createPost(this.postContent)
    .subscribe({
        next: (response) => {
            console.log('Post created successfully:', response);
            this.router.navigate(['/profile']); // Redirect to profile page after post creation
        },
        error: (error) => {
            console.error('Error creating post:', error);
            alert('Failed to create post!');
        }
    });
}

}
