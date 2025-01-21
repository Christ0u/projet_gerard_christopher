import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';

import { Products } from '../models/products.model';
import { CatalogService } from '../services/catalog.service';
import { SearchEngineComponent } from '../search-engine/search-engine.component';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CommonModule, SearchEngineComponent],
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  productsList: Products[] = [];
  filteredProducts: Products[] = [];

  inStock: boolean = false;
  maxPrice: number = 100;
  minRating: number = 0;

  constructor(private catalogService: CatalogService) {}
    
  ngOnInit(): void {
      this.catalogService.getProducts().subscribe((data: Products[]) => {
        this.productsList = data;
        this.applyFilters(); 
      });
  }

  private applyFilters(): void {
    this.filteredProducts = this.productsList.filter(product => 
      (!this.inStock || product.inStock) &&
      (product.price <= this.maxPrice) &&
      (product.rating >= this.minRating)
    );
  }

  onInStockChange(inStock: boolean) {
    this.inStock = inStock;
    this.applyFilters();
  }

  onMaxPriceChange(maxPrice: number) {
    this.maxPrice = maxPrice;
    this.applyFilters();
  }

  onMinRatingChange(minRating: number) {
    this.minRating = minRating;
    this.applyFilters();
  }
}
  