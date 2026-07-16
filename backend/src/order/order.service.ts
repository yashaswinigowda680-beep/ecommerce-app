import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    // Calculate total amount
    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Create Order
    const order = await this.prisma.order.create({
      data: {
        userId,
        totalAmount,

        fullName: dto.fullName,
        phoneNumber: dto.phoneNumber,
        address: dto.address,
        city: dto.city,
        pincode: dto.pincode,

        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            productTitle: item.productTitle,
            productThumbnail: item.productThumbnail,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return order;
  }

  async findMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
