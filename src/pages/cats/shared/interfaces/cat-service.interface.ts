import { Observable } from 'rxjs';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { ICatDocument } from './cat.interface';

export interface ICatService {
  add(cat: CreateCatDto): Observable<string>;

  findOne(id: string): Observable<ICatDocument | undefined>;

  findAll(): Observable<ICatDocument[]>;

  delete(id: string): Observable<void>;

  update(id: string, cat: UpdateCatDto): Observable<void>;
}
