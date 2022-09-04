import { Controller, Get, HostParam, Inject, Param, Redirect, Scope } from "@nestjs/common";
import { GetListOfProductsResponse } from "../interfaces/shop";
import { ShopService } from "./shop.service";

@Controller()
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
  getListOfProducts(): GetListOfProductsResponse {
    return this.shopService.getProducts();
  }

  // @Get('/welcome')
  // welcome(
  //   @HostParam('name') siteName: string,
  // ): string {
  //   return `Witaj na sklepie ${siteName}`;
  // }

}
