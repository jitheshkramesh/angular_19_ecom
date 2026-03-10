import { Component, inject, Injector, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-moviesearch',
  imports: [FormsModule,CommonModule],
  templateUrl: './moviesearch.component.html',
  styleUrl: './moviesearch.component.scss'
})
export class MoviesearchComponent implements OnInit {

  searchTerm = '';
  moviesData: any[] = [];

  // ERROR NullInjectorError: R3InjectorError(Standalone[_MoviesearchComponent])[_MovieService -> _MovieService -> _HttpClient -> _HttpClient]: 
  // NullInjectorError: No provider for _HttpClient!

  private movieService: MovieService | undefined;

  constructor(private injector: Injector) {}
  ngOnInit(): void {
   this.searchMovies();
  }

  private getMovieService(): MovieService {
    if (!this.movieService) {
      this.movieService = this.injector.get(MovieService);
    }
    return this.movieService;
  }


  searchMovies(){
    // search for movies based on the search term
    this.getMovieService().getData(this.searchTerm).subscribe({
      next: (data) => {
      console.log('data:', data);
      this.moviesData = data;
    },
    error: (err) => {
      console.log('Error:', err);

      if (err.status === 404) {
        this.moviesData = []; 
      }
    }
    }
    );  
  }
}
