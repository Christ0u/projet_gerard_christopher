import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private http: HttpClient) { }

  private productsUrl = 'http://localhost:443/api/catalogue';

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.productsUrl);
  }
}