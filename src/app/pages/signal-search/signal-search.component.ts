import { Component, inject } from '@angular/core';
import { SignalSearchService } from '../../services/signal-search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signal-search',
  imports: [FormsModule],
  templateUrl: './signal-search.component.html',
  styleUrl: './signal-search.component.scss',
})
export class SignalSearchComponent {
   pageTitle = "StarWars Vehicles";

   // Injected services
   private signalSearchService = inject(SignalSearchService);

   // Signals to support the template
   vehicles = this.signalSearchService.vehicles;
   isLoading = this.signalSearchService.isLoading;
   errorMessage = this.signalSearchService.errorMessage;
   enteredModel = this.signalSearchService.enteredModel;
}
