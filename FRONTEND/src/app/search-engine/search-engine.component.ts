import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-engine',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-engine.component.html',
  styleUrl: './search-engine.component.css'
})
export class SearchEngineComponent {

  // Propriétés
  inStock: boolean = false;
  @Output() inStockChange = new EventEmitter<boolean>();

  maxPrice: number = 100;
  @Output() maxPriceChange = new EventEmitter<number>();

  minRating: number = 0;
  @Output() minRatingChange = new EventEmitter<number>();

  // Méthodes
  onClick()
  {
    this.inStock = !this.inStock;
    this.inStockChange.emit(this.inStock);
    //console.log(this.inStock);
  }

  onInput()
  {
    this.maxPriceChange.emit(this.maxPrice);
    this.minRatingChange.emit(this.minRating);
    //console.log(this.minRating);
    //console.log(this.maxPrice);
  }
}
