import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from "./basket/basket.module";
import { ShopModule } from "./shop/shop.module";
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import {dbConfig} from '../db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbConfig.DB_HOST,
      port: dbConfig.DB_PORT,
      username: dbConfig.DB_USERNAME,
      password: dbConfig.DB_PASSWORD,
      database: dbConfig.DB_NAME,
      entities: ['dist/**/**.entity{.ts,.js}'],
      bigNumberStrings: false,
      logging: true,
      synchronize: true,
    }),
    BasketModule,
    ShopModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
