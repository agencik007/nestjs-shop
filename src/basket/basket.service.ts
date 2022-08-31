import { Inject, Injectable } from "@nestjs/common";
import { AddProductDto } from "./dto/add-product.dto";
import {
  AddProductToBasketResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasketResponse
} from "../interfaces/basket";
import { ShopService } from "../shop/shop.service";

@Injectable()
export class BasketService {
  private items: AddProductDto[] = []

  constructor(
    @Inject(ShopService) private shopService: ShopService,
  ) {
  }

  add(item: AddProductDto): AddProductToBasketResponse {

    const { count, name } = item;

    if (
      typeof name !== 'string'
      ||
      typeof count !== 'number'
      ||
      count < 1
      ||
      name === ''
      ||
      !this.shopService.hasProduct(name)
    ) {
      return {
        isSuccess: false,
      }
    }

    const { items } = this;

    items.push(item)

    return {
      isSuccess: true,
      index: items.length - 1,
    }
  }

  remove(index: number): RemoveProductFromBasketResponse {
    const { length, splice } = this.items;

    if (
      index < 0
      ||
      index >= length
    ) {
      return {
        isSuccess: false
      }
    }

    splice(index, 1)

    return {
      isSuccess: true
    }
  }

  list(): ListProductsInBasketResponse {
    return this.items;
  }
}
