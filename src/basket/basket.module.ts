import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { Module } from "@nestjs/common";
import { ShopModule } from "../shop/shop.module";

@Module({
  imports: [ShopModule],
  controllers: [BasketController],
  providers: [BasketService]
})
export class BasketModule {

}