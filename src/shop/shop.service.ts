// import { forwardRef, Inject, Injectable } from "@nestjs/common";
// import { GetListOfProductsResponse } from "../interfaces/shop";
// import { BasketService } from "../basket/basket.service";
// import { InjectRepository } from "@nestjs/typeorm";
// import { ShopItem } from "./shop-item.entity";
// import { Repository } from "typeorm";
//
// // [
// //   {
// //     name: 'Intel Core i5 8600k',
// //     description: 'dobry procesor do gier',
// //     price: 1250,
// //   },
// //   {
// //     name: '2x16GB Crucial Fast Memory 3000MHz',
// //     description: 'bardzo wydajne kości RAM do PC',
// //     price: 400,
// //   },
// //   {
// //     name: 'ADATA 1TB SSD SHX3000',
// //     description: 'szybki dysk SDD do komputera',
// //     price: 350,
// //   },
// // ]
//
// @Injectable()
// export class ShopService {
//
//   constructor(
//     @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
//     @InjectRepository(ShopItem) private shopItemRepository: Repository<ShopItem>,
//   ) {
//   }
//
//   async getProducts(): Promise<GetListOfProductsResponse> {
//     return await this.shopItemRepository.find();
//   }
//
//   async hasProduct(name: string): Promise<boolean> {
//     return (await this.getProducts()).some(item => item.name === name)
//   }
//
//   async getPriceOfProduct(name: string): Promise<number> {
//     return (await this.getProducts()).find(item => item.name === name).price
//   }
// }

import { Injectable } from '@nestjs/common';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  async getProducts(): Promise<ShopItem[]> {
    return ShopItem.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return await ShopItem.findOneOrFail({ where: { id } });
  }

  async removeOneProduct(id: string) {
    await ShopItem.delete(id);
  }

  async createOneProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();

    newItem.name = 'Buraki';
    newItem.description = 'Bardzo dobre!';
    newItem.price = 25.0;

    await ShopItem.save(newItem);

    return newItem;
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEvenBought: true,
    });

    const item = await ShopItem.findOneOrFail({ where: { id } });

    item.boughtCounter++;

    await ShopItem.save(item);
  }
}
