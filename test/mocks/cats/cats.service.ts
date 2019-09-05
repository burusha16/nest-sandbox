import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from '../../../src/pages/cats/shared/dto/create-cat.dto';
import { UpdateCatDto } from '../../../src/pages/cats/shared/dto/update-cat.dto';
import { ICatService } from '../../../src/pages/cats/shared/interfaces/cat-service.interface';
import { ICat } from '../../../src/pages/cats/shared/interfaces/cat.interface';
import { allCatsResultMock, oneCatResultMock } from './contants';

@Injectable()
export class CatsMockService implements ICatService {
  public add(cat: CreateCatDto): Observable<number> {
    return of(1);
  }

  public findOne(id: string): Observable<ICat | undefined> {
    return of(oneCatResultMock);
  }

  public findAll(): Observable<ICat[]> {
    return of(allCatsResultMock);
  }

  public delete(id: string): void {
  }

  public update(id: string, cat: UpdateCatDto): void {
  }
}
