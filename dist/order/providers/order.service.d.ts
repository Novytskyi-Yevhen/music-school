import { GenericService } from 'src/shared/service';
import { Order } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class OrdersService extends GenericService<Order> {
    private orderRepository;
    constructor(orderRepository: Repository<Order>);
}
