export interface IProduct {
  id: number;
  name: string;
}
export interface IMovement {
  id: number;
  product: IProduct;
}
