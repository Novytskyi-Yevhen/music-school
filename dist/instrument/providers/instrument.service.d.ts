import { GenericService } from 'src/shared/service';
import { Instrument } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class InstrumentService extends GenericService<Instrument> {
    private instrumentRepository;
    constructor(instrumentRepository: Repository<Instrument>);
}
