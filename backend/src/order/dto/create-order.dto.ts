import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsInt()
  productId!: number;

  @IsString()
  productTitle!: string;

  @IsString()
  productThumbnail!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsNumber()
  @Min(0)
  price!: number;
}

export class CreateOrderDto {
  @IsString()
  fullName!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  pincode!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
