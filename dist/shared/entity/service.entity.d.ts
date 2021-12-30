import { Course, Order, Room } from '.';
export declare class Service {
    id: string;
    name: string;
    description: string;
    type: string;
    orders: Order[];
    courses: Course[];
    rooms: Room[];
}
