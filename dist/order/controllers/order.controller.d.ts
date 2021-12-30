import { AbstractCRUDController } from 'src/shared/controllers';
import { Order } from 'src/shared/entity';
import { orderDTO } from '../DTO';
import { OrdersService } from '../providers';
export declare class OrderController extends AbstractCRUDController<orderDTO, Order, OrdersService> {
    private orderService;
    constructor(orderService: OrdersService);
}
