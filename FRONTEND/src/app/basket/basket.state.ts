import { State, Action, StateContext, Selector } from '@ngxs/store';
// import { AddProduit, RemoveProduit, UpdateQuantity } from './basket.actions.ts';

// Actions
export class AddProduct {
  static readonly type = '[Basket] Add Product';
  constructor(public product: any) {}
}

export class RemoveProduct {
  static readonly type = '[Basket] Remove Product';
  constructor(public productId: number) {}
}

// State Model
export interface BasketStateModel {
  products: any[];
}

// Initial State
const defaultState: BasketStateModel = {
  products: []
};

@State<BasketStateModel>({
  name: 'basket',
  defaults: defaultState
})
export class BasketState {

  // Selector to get products from the basket state
  static getProducts(state: BasketStateModel): any[] {
    return state.products;
  }

  // Action to add a product to the basket
  @Action(AddProduct)
  addProduct({ getState, patchState }: StateContext<BasketStateModel>, { product }: AddProduct) {
    const state = getState();
    patchState({
      products: [...state.products, product]
    });
  }

  // Action to remove a product from the basket
  @Action(RemoveProduct)
  removeProduct({ getState, patchState }: StateContext<BasketStateModel>, { productId }: RemoveProduct) {
    const state = getState();
    patchState({
      products: state.products.filter(product => product.id !== productId)
    });
  }
}
