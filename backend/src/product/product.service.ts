import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  Product,
  ProductsResponse,
} from './interfaces/products-response.interface';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  async getAllProducts(): Promise<ProductsResponse> {
    const response = await firstValueFrom(
      this.httpService.get<ProductsResponse>('https://dummyjson.com/products'),
    );

    return response.data;
  }

  async getProductById(id: number): Promise<Product> {
    const response = await firstValueFrom(
      this.httpService.get<Product>(`https://dummyjson.com/products/${id}`),
    );

    return response.data;
  }
  async searchProducts(query: string): Promise<ProductsResponse> {
    const response = await firstValueFrom(
      this.httpService.get<ProductsResponse>(
        `https://dummyjson.com/products/search?q=${query}`,
      ),
    );

    return response.data;
  }
}
