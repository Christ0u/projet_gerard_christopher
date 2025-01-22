import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasketState } from './basket.state';
import { RemoveProduct, UpdateQuantity } from './basket.actions';

@Component({
    selector: 'app-basket',
    imports: [CommonModule],
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css'],
})
export class BasketComponent {
    @Select(BasketState.getProducts) products$!: Observable<any[]>;
    @Select(BasketState.getTotalAmount) totalAmount$!: Observable<number>;

    constructor(private store: Store) { }

    removeProduct(productId: number) {
        this.store.dispatch(new RemoveProduct(productId));
    }

    updateQuantity(productId: number, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const quantity = parseInt(inputElement.value, 10);
        this.store.dispatch(new UpdateQuantity(productId, quantity));
    }

    pay(): void {
        alert('Merci pour votre achat ! Votre commande a été prise en compte.');
    }
}