import { Controller, Delete, Get, HostParam, Inject, Param, Post, Redirect, Scope } from "@nestjs/common";
import { CreateProductResponse, GetListOfProductsResponse, GetOneProductResponse } from "../interfaces/shop";
import { ShopService } from "./shop.service";

@Controller('shop')
export class ShopController {

  // // When all app modules are loaded
  // onApplicationBootstrap() {
  //   console.log('hello');
  // }

  // Works when the application is closed
  // onApplicationShutdown() {
  //   console.log('Apka zaraz zniknie');
  // }

  constructor(
    @Inject(ShopService) private shopService: ShopService
  ) {
  }

  @Get('/')
  getListOfProducts(): Promise<GetListOfProductsResponse> {
    return this.shopService.getProducts();
  }

  @Get('/:id')
  getOneProduct(
    @Param('id') id: string,
  ): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id)
  }

  @Delete('/:id')
  removeOneProduct(
    @Param('id') id: string,
  ){
    this.shopService.removeOneProduct(id)
  }

  @Post('/')
  async createOneProduct(): Promise<CreateProductResponse> {
    return await this.shopService.createOneProduct()
  }

  // @Get('/welcome')
  // welcome(
  //   @HostParam('name') siteName: string,
  // ): string {
  //   return `Witaj na sklepie ${siteName}`;
  // }

}
