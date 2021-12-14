import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/shared/service';
import { Order } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class OrdersService extends GenericService<Order> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }
}
