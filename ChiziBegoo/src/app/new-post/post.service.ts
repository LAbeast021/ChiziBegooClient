import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = `${environment.baseUrl}/api/posts`;

  constructor(private http: HttpClient , private authService : AuthService) {}

  createPost(postContent: string, imageUrl?: string): Observable<any> {
    const postData = {
      Content: postContent,
      UserId: this.authService.getUserId() , 
      UserName : this.authService.getUserName()
    };
    console.log('Creating post with content:', postData);
    return this.http.post(`${this.baseUrl}/newpost`,postData, {
        headers: { 'Content-Type': 'application/json' }
    });
}

  // sendTestText(text: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/test`, JSON.stringify(text), {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   });
  // }


}