import { Observable } from 'rxjs';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { ICat } from './cat.interface';

export interface ICatService {
  add(cat: CreateCatDto): Observable<number>;

  findOne(id: string): Observable<ICat | undefined>;

  findAll(): Observable<ICat[]>;

  delete(id: string): void;

  update(id: string, cat: UpdateCatDto): void;
}
