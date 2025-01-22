export class AddProduct {
    static readonly type = '[Basket] Add Product';
    constructor(public product: any) {}
  }
  
  export class RemoveProduct {
    static readonly type = '[Basket] Remove Product';
    constructor(public productId: number) {}
  }
  
  export class UpdateQuantity {
    static readonly type = '[Basket] Update Quantity';
    constructor(public productId: number, public quantity: number) {}
  }