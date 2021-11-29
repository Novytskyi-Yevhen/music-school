import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/public/controllers';
import { Order } from 'src/shared/entity';
import { orderDTO } from '../DTO';
import { OrdersService } from '../providers';

@Controller('order')
export class OrderController extends AbstractCRUDController<
  orderDTO,
  Order,
  OrdersService
> {
  constructor(private orderService: OrdersService) {
    super(orderService, 'Order');
  }
}
