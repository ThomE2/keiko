import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pokemons')
  getPokemons() {
    return this.appService.getPokemonLists();
  }

  @Get('/pokemon/:id')
  findOne(@Param() params: { id: number }) {
    return this.appService.getPokemonFromId(params.id);
  }
}
