import { Controller, Request, Get, Post, Body, Param, Delete, BadRequestException, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Request() request: Request, @Body() body: CreateProductDto) {
    const userId = request['user'].sub;
    return await this.productsService.createItem(
      userId,
      body.name,
      body.price,
      body.time_window
    );
  }

  @Get('getAll')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('bid')
  findBidItems() {
    return this.productsService.findBidItems();
  }

  @Get('self')
  findMyItems(@Request() request: Request) {
    const id = request['user'].sub;
    return this.productsService.findMyItems(id);
  }

  @Get(':id')
  async refreshItem(@Param('id', ParseUUIDPipe) id: string) {
    const product = await this.productsService.refreshItem(id);
    if (product && product.status === 'unpublished') {
      throw new BadRequestException('Item not found');
    }
    return product;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id);
  // }

  @Post('publish/:id')
  publishItem(@Request() request: Request, @Param('id', ParseUUIDPipe) productId: string, @Body() body) {
    if (body.action !== 'published' || typeof body.bid_phase !== 'number') {
      throw new BadRequestException('Invalid data format');
    }

    const userId = request['user'].sub;
    return this.productsService.publishItem(userId, productId, body.action, body.bid_phase);
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.productsService.deleteItem(id);
  }
}
