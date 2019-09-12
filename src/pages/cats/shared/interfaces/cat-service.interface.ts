import { Observable } from 'rxjs';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { ICat } from './cat.interface';

export interface ICatService {
  add(cat: CreateCatDto): Observable<string>;

  findOne(id: string): Observable<ICat | undefined>;

  findAll(): Observable<ICat[]>;

  delete(id: string): Observable<void>;

  update(id: string, cat: UpdateCatDto): Observable<void>;
}
