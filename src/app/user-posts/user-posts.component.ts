import { Component, computed, inject } from '@angular/core';
import { UserPostsService } from '../services/user-posts.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-posts',
  imports: [FormsModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss',
})
export class UserPostsComponent {
 pageTitle = "User Posts";
   
   private userPostsService = inject(UserPostsService);

  // Hard-coded for this sample to ensure only an existing
   // username is entered/selected
   //userNames: string[] = ['Bret', 'Antonette', 'Samantha', 'Kamren', 'Delphine', 'NoData'];

   userNames = computed(() => this.userPostsService.users().map(user => user.username));

   selectedUserName = this.userPostsService.selectedUserName;
   user = this.userPostsService.user;
   posts = this.userPostsService.postsForUser;
}

