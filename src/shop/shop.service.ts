import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from "../interfaces/shop";

@Injectable()
export class ShopService {
  getProducts(): GetListOfProductsResponse {
    return [
      {
        name: 'Intel Core i5 8600k',
        description: 'dobry procesor do gier',
        price: 1250,
      },
      {
        name: '2x16GB Crucial Fast Memory 3000MHz',
        description: 'bardzo wydajne kości RAM do PC',
        price: 400,
      },
      {
        name: 'ADATA 1TB SSD SHX3000',
        description: 'szybki dysk SDD do komputera',
        price: 350,
      },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some(item => item.name === name)
  }
}
