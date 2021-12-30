import { Service, User } from '.';
import { Instrument } from './instrument.entity';
export declare class Order {
    id: string;
    service: Service;
    instrument: Instrument;
    date: Date;
    timeSlot: string;
    user: User;
}
