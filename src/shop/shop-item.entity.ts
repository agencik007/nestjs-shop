import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShopItemInterface } from '../interfaces/shop';
import { ShopItemDetails } from './shop-item-details.entity';

@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 25,
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
    default: '',
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
    default: false,
  })
  wasEvenBought: boolean;
  
  @OneToOne(type => ShopItemDetails)
  @JoinColumn()
  details: ShopItemDetails;

  /* Subproduct */
  @ManyToOne(type => ShopItem, entity => entity.subShopItems)
  mainShopItem: ShopItem;

  /* Main product */
  @OneToMany(type => ShopItem, entity => entity.mainShopItem)
  subShopItems: ShopItem[];
}
