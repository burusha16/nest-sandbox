import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse, ApiImplicitParam, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DtoValidationPipe } from '../../core/pipes/dto-validation.pipe';
import { ValidateMongoIdPipe } from '../../core/pipes/validate-mongo-id.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './shared/dto/create-cat.dto';
import { UpdateCatDto } from './shared/dto/update-cat.dto';
import { ICat } from './shared/interfaces/cat.interface';

@ApiUseTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {
  }

  @Post()
  @ApiCreatedResponse({ description: 'Return string with id(parsed ObjectId) of created cat', type: String })
  @UsePipes(DtoValidationPipe)
  public create(@Body() createCatDto: CreateCatDto): Observable<string> {
    return this.catsService.add(createCatDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Return array with cats data', type: ICat, isArray: true })
  public findAll(): Observable<ICat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiImplicitParam({name: 'id', type: String, required: true, description: '5d79608c48804f12c59edfc4'})
  @ApiOkResponse({ description: 'Return cat data', type: ICat })
  public findOne(@Param('id', ValidateMongoIdPipe) id: string): Observable<ICat> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(DtoValidationPipe)
  @ApiImplicitParam({name: 'id', type: String, required: true, description: '5d79608c48804f12c59edfc4'})
  @ApiOkResponse({ description: 'Cat was successful modified' })
  public update(@Param('id', ValidateMongoIdPipe) id: string,
                @Body() updateCatDto: UpdateCatDto): Observable<void> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @ApiImplicitParam({name: 'id', type: String, required: true, description: '5d79608c48804f12c59edfc4'})
  @ApiOkResponse({ description: 'Cat was successful deleted' })
  public remove(@Param('id', ValidateMongoIdPipe) id: string): Observable<void> {
    return this.catsService.delete(id);
  }
}
