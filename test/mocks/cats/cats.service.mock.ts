import { Injectable } from '@nestjs/common';
import { EMPTY, Observable, of } from 'rxjs';
import { CreateCatDto } from '../../../src/pages/cats/shared/dto/create-cat.dto';
import { UpdateCatDto } from '../../../src/pages/cats/shared/dto/update-cat.dto';
import { ICatService } from '../../../src/pages/cats/shared/interfaces/cat-service.interface';
import { ICatDocument } from '../../../src/pages/cats/shared/interfaces/cat.interface';
import { allCatsResultMock, oneCatResultMock, testMongoId } from './contants';

@Injectable()
export class CatsMockService implements ICatService {
  public add(cat: CreateCatDto): Observable<string> {
    return of(testMongoId);
  }

  public findOne(id: string): Observable<ICatDocument | undefined> {
    // tslint:disable-next-line:no-any
    return of({...oneCatResultMock, _id: id} as any as ICatDocument);
  }

  public findAll(): Observable<ICatDocument[]> {
    return of(allCatsResultMock as any as ICatDocument[]);
  }

  public delete(id: string): Observable<void> {
    return EMPTY;
  }

  public update(id: string, cat: UpdateCatDto): Observable<void> {
    return EMPTY;
  }
}
