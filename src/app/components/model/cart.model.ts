import { Product } from "./product.model";


export interface Cart {
    id:Number
    user:any
    products: Product[];
    orderstatus: String;
  }