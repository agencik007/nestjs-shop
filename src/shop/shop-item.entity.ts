import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ShopItemInterface } from "../interfaces/shop";

@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  name: string;

  // @Column({
  //   length: 10000,
  //   default: null,
  //   nullable: true,
  // })
  // description: string | null;

  @Column({
    type: 'longtext',
    default: '(brak)',
  })
  description: string;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: 0,
  })
  boughtCounter: number;

  @Column({
    default: false
  })
  wasEvenBought: boolean;
}