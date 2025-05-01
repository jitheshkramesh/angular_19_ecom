import { Component, inject, Injector } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-moviesearch',
  imports: [FormsModule,CommonModule],
  templateUrl: './moviesearch.component.html',
  styleUrl: './moviesearch.component.scss'
})
export class MoviesearchComponent {

  searchTerm = 'a';
  moviesData: any[] = [];

  // ERROR NullInjectorError: R3InjectorError(Standalone[_MoviesearchComponent])[_MovieService -> _MovieService -> _HttpClient -> _HttpClient]: 
  // NullInjectorError: No provider for _HttpClient!

  private movieService: MovieService | undefined;

  constructor(private injector: Injector) {}

  private getMovieService(): MovieService {
    if (!this.movieService) {
      this.movieService = this.injector.get(MovieService);
    }
    return this.movieService;
  }


  searchMovies(){
    // search for movies based on the search term
    this.getMovieService().getData(this.searchTerm).subscribe((data) => {
      console.log('data:', data);
      this.moviesData = data;
    }
    );  
  }
}
