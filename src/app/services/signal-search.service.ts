import { computed, Injectable, signal } from '@angular/core';
import { debounceSignal } from '../utilities/signal-utilities';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { setErrorMessage } from '../utilities/error-message';

@Injectable({
  providedIn: 'root',
})
export class SignalSearchService {
    private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';

   enteredModel = signal<string>('');
   searchText = debounceSignal(this.enteredModel, 600)

     private vehiclesResource = httpResource<VehicleResponse>(() =>
      `${this.vehicleUrl}?search=${this.searchText()}`
   );
   vehicles = computed(() => this.vehiclesResource.value()?.results ?? [] as Vehicle[]);

   error = computed(() => this.vehiclesResource.error() as HttpErrorResponse);
   errorMessage = computed(() => setErrorMessage(this.error(), 'Vehicle'));
   isLoading = this.vehiclesResource.isLoading;
   
}

export interface VehicleResponse {
   count: number;
   next: string;
   previous: string;
   results: Vehicle[]
}

export interface Vehicle {
   name: string;
   cost_in_credits: number;
   model: string;
}

