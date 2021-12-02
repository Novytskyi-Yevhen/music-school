import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/public/controllers';
import { Instrument } from 'src/shared/entity';
import { InstrumentDTO } from '../DTO';
import { InstrumentService } from '../providers';

@Controller('instrument')
export class InstrumentController extends AbstractCRUDController<
  InstrumentDTO,
  Instrument,
  InstrumentService
> {
  constructor(private instrumentService: InstrumentService) {
    super(instrumentService, 'Instrument');
  }
}
