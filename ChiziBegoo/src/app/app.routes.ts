import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ProfileComponent } from './profile/profile.component';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
    { path: '', component: IndexComponent, pathMatch: 'full' },
    { path: 'feed', component: FeedComponent },
    { path: 'newpost', component: NewPostComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: ''}
];