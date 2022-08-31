import { Injectable } from '@nestjs/common';
import { AddProductDto } from "./dto/add-product.dto";
import { AddProductToBasketResponse, RemoveProductFromBasketResponse } from "../interfaces/basket";

@Injectable()
export class BasketService {
  private items: AddProductDto[] = []

  add(item: AddProductDto): AddProductToBasketResponse {

    if (
      typeof item.name !== 'string'
      ||
      typeof item.count !== 'number'
      ||
      item.count < 1
      ||
      item.name === ''
    ) {
      return {
        isSuccess: false,
      }
    }

    this.items.push(item)

    console.log(this.items)

    return {
      isSuccess: true,
      index: this.items.length - 1,
    }
  }

  remove(index: number): RemoveProductFromBasketResponse {
    if (
      index < 0
      ||
      index >= this.items.length
    ) {
      return {
        isSuccess: false
      }
    }

    this.items.splice(index, 1)

    return {
      isSuccess: true
    }
  }
}
