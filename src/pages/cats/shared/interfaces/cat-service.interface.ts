import { Observable } from 'rxjs';
import { IdModel } from '../../../../core/models/id.model';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { ICatDocument } from './cat.interface';

export interface ICatService {
  add(cat: CreateCatDto): Observable<IdModel>;

  findOne(id: string): Observable<ICatDocument>;

  findAll(): Observable<ICatDocument[]>;

  delete(id: string): Observable<void>;

  update(id: string, cat: UpdateCatDto): Observable<void>;
}
