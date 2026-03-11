import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserPostsService {
    userUrl = 'https://jsonplaceholder.typicode.com/users';
    postUrl = 'https://jsonplaceholder.typicode.com/posts';

    private http = inject(HttpClient);

      private usersResource = rxResource({ 
      stream: ({ params }) => 
         this.http.get<User[]>(`${this.userUrl}`)
    });
    users = computed(() => this.usersResource.value() ?? []);
    usersloading = computed(() => this.usersResource.isLoading());
    userserror = computed(() => this.usersResource.error());


    selectedUserName = signal<string | undefined>(undefined);

    private userResource = rxResource({
      params: () => ({ username: this.selectedUserName() }),
      stream: ({ params }) => 
         this.http.get<User[]>(`${this.userUrl}?username=${params.username}`).pipe(
            map(users => users[0])
         )
    });
    user = computed(() => this.userResource.value());
    userloading = computed(() => this.userResource.isLoading());
    usererror = computed(() => this.userResource.error());

   private postsResource = rxResource({
      params: () => ({ request: this.user() }),
      stream: ({ params }) => 
         this.http.get<Post[]>(`${this.postUrl}?userId=${params.request?.id}`)
   });
   postsForUser = computed(() => this.postsResource.value() ?? []);
   postsForUserloading = computed(() => this.userResource.isLoading());
   postsForUsererror = computed(() => this.userResource.error());

}



export interface User {
   id: number;
   name: string;
   username: string;
   email: string;
   website: string;
}

export interface Post {
   userId: number;
   id: number;
   title: string;
   body: string
}