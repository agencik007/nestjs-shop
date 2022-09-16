import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse, GetPaginatedListOfProductsResponse } from 'src/interfaces/shop';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  
  async getProducts(currentPage: number = 1): Promise<GetPaginatedListOfProductsResponse> {
    // const [items, count] = await ShopItem.findAndCount({
    //   take: 3,
    // })

    // console.log({count});
    
    // return items;
    const maxOnPage = 3;

    const [items, count] = await ShopItem.findAndCount({
      skip: maxOnPage * (currentPage - 1),
      take: maxOnPage,
    })

    const pagesCount = Math.ceil(count / maxOnPage);

    console.log({count, pagesCount});

    return {
      items,
      pagesCount,
    }
    
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).items.some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).items.find((item) => item.name === name).price;
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

  async findProduct(searchTerm: string): Promise<GetListOfProductsResponse> {
    return await ShopItem.find({
      where: [
        {description: 'Super auto'},
        {price: 9.8},
      ]
    });
  }
}
