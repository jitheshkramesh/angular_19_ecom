import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 

})
export class MovieService {

  constructor(private http: HttpClient) { }

  getData(search:string): Observable<any> {
    return this.http.get("https://localhost:7085/api/MovieSearch/search?query=" + search);
  }

   
}
