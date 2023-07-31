import { Controller } from '@nestjs/common';
import { FavsSerivce } from 'src/services/favorites.service';

@Controller('favors')
export class FavsController {
  constructor(private readonly favsSerive: FavsSerivce) {}
}
