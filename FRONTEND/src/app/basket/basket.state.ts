import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddProduct, RemoveProduct, UpdateQuantity } from './basket.actions';
import { Injectable } from '@angular/core';

export interface BasketStateModel {
  products: any[];
}

const defaultState: BasketStateModel = {
  products: []
};

@State<BasketStateModel>({
  name: 'basket',
  defaults: defaultState
})

@Injectable()
export class BasketState {
  @Selector()
  static getProducts(state: BasketStateModel): any[] {
    return state.products;
  }

  @Selector()
  static getTotalAmount(state: BasketStateModel): number {
    return state.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<BasketStateModel>, { product }: AddProduct) {
    const state = ctx.getState();
    const existingProduct = state.products.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      state.products.push(product);
    }
    ctx.patchState({ products: [...state.products] });
  }

  @Action(RemoveProduct)
  removeProduct(ctx: StateContext<BasketStateModel>, { productId }: RemoveProduct) {
    const state = ctx.getState();
    ctx.patchState({
      products: state.products.filter(product => product.id !== productId)
    });
  }

  @Action(UpdateQuantity)
  updateQuantity(ctx: StateContext<BasketStateModel>, { productId, quantity }: UpdateQuantity) {
    const state = ctx.getState();
    const products = state.products.map(product => 
      product.id === productId ? { ...product, quantity } : product
    );
    ctx.patchState({ products });
  }
}