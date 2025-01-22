export interface Products {
    id: number;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
    description: string;
    rating : number;
    quantity?: number;
}