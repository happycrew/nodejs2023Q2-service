import { Controller } from '@nestjs/common';
import { FavsSerivce } from 'src/services/favorites.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsSerive: FavsSerivce) {}
}
