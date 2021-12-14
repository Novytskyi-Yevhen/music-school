import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/shared/service';
import { Instrument } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class InstrumentService extends GenericService<Instrument> {
  constructor(
    @InjectRepository(Instrument) private instrumentRepository: Repository<Instrument>,
  ) {
    super(instrumentRepository);
  }
}
