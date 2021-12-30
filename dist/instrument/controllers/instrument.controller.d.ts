import { AbstractCRUDController } from 'src/shared/controllers';
import { Instrument } from 'src/shared/entity';
import { InstrumentDTO } from '../DTO';
import { InstrumentService } from '../providers';
export declare class InstrumentController extends AbstractCRUDController<InstrumentDTO, Instrument, InstrumentService> {
    private instrumentService;
    constructor(instrumentService: InstrumentService);
}
