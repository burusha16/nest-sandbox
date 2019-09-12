import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DtoValidationPipe } from '../../core/pipes/dto-validation.pipe';
import { ValidateMongoIdPipe } from '../../core/pipes/validate-mongo-id.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './shared/dto/create-cat.dto';
import { UpdateCatDto } from './shared/dto/update-cat.dto';
import { ICat } from './shared/interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {
  }

  @Post()
  @UsePipes(DtoValidationPipe)
  public create(@Body() createCatDto: CreateCatDto): Observable<string> {
    return this.catsService.add(createCatDto);
  }

  @Get()
  public findAll(): Observable<ICat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ValidateMongoIdPipe) id: string): Observable<ICat> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(DtoValidationPipe)
  public update(@Param('id', ValidateMongoIdPipe) id: string,
                @Body() updateCatDto: UpdateCatDto): Observable<void> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  public remove(@Param('id', ValidateMongoIdPipe) id: string): Observable<void> {
    return this.catsService.delete(id);
  }
}
