import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CatsService } from './cats.service';
import { CreateCatDto } from './shared/dto/create-cat.dto';
import { UpdateCatDto } from './shared/dto/update-cat.dto';
import { ICat } from './shared/interfaces/cat.interface';

@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) {
  }

  @Post()
  public create(@Body() createCatDto: CreateCatDto): Observable<number> {
    return this.catsService.add(createCatDto);
  }

  @Get()
  public findAll(): Observable<ICat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Observable<ICat> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): void {
    this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): void {
    this.catsService.delete(id);
  }
}
