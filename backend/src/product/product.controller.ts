import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }
  @Get('search')
  searchProducts(@Query('q') query: string) {
    return this.productService.searchProducts(query);
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }
}
