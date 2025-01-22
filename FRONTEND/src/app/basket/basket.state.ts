import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddProduct, RemoveProduct, UpdateQuantity } from './basket.actions';

export interface BasketStateModel {
    products: any[];
    totalAmount: number;
}

@State<BasketStateModel>({
    name: 'basket',
    defaults: {
        products: [],
        totalAmount: 0
    }
})
export class BasketState {
    @Selector()
    static getProducts(state: BasketStateModel) {
        return state.products;
    }

    @Selector()
    static getTotalAmount(state: BasketStateModel) {
        return state.totalAmount;
    }

    @Selector()
    static getTotalItems(state: BasketStateModel) {
        return state.products.reduce((total, product) => total + product.quantity, 0);
    }

    @Action(AddProduct)
    addProduct(ctx: StateContext<BasketStateModel>, action: AddProduct) {
        const state = ctx.getState();
        const productExists = state.products.find(product => product.id === action.product.id);

        if (productExists) {
            productExists.quantity += 1;
        } else {
            state.products.push({ ...action.product, quantity: 1 });
        }

        ctx.patchState({
            products: [...state.products],
            totalAmount: state.totalAmount + action.product.price
        });
    }

    @Action(RemoveProduct)
    removeProduct(ctx: StateContext<BasketStateModel>, action: RemoveProduct) {
        const state = ctx.getState();
        const filteredProducts = state.products.filter(product => product.id !== action.productId);
        const productToRemove = state.products.find(product => product.id === action.productId);

        ctx.patchState({
            products: filteredProducts,
            totalAmount: state.totalAmount - (productToRemove ? productToRemove.price * productToRemove.quantity : 0)
        });
    }

    @Action(UpdateQuantity)
    updateQuantity(ctx: StateContext<BasketStateModel>, action: UpdateQuantity) {
        const state = ctx.getState();
        const product = state.products.find(product => product.id === action.productId);

        if (product) {
            const quantityDifference = action.quantity - product.quantity;
            product.quantity = action.quantity;

            ctx.patchState({
                products: [...state.products],
                totalAmount: state.totalAmount + (product.price * quantityDifference)
            });
        }
    }
}