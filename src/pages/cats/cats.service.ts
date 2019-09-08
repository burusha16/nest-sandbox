import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateCatDto } from './shared/dto/create-cat.dto';
import { UpdateCatDto } from './shared/dto/update-cat.dto';
import { ICatService } from './shared/interfaces/cat-service.interface';
import { ICat } from './shared/interfaces/cat.interface';

@Injectable()
export class CatsService implements ICatService {
  constructor(@Inject('CATS_STORE') private store: Array<ICat>) {
  }

  public add(cat: CreateCatDto): Observable<number> {
    return of(this.store.length)
      .pipe(tap(id => this.store.push({ ...cat, id })));
  }

  public findOne(id: string): Observable<ICat | undefined> {
    this.checkCatExistAndThrowError(id);
    return of({ ...this.getItem(id) });
  }

  public findAll(): Observable<ICat[]> {
    return of(this.store.filter(v => v));
  }

  public delete(id: string): void {
    this.checkCatExistAndThrowError(id);
    delete this.store[parseInt(id, 10)];
  }

  public update(id: string, cat: UpdateCatDto): void {
    this.checkCatExistAndThrowError(id);
    this.setItem(id, {
      ...this.getItem(id),
      ...cat,
    });
  }

  private checkCatExistAndThrowError(id): void {
    if (!this.getItem(id)) {
      throw new NotFoundException();
    }
  }

  private getItem(id: string): ICat {
    return this.store[parseInt(id, 10)];
  }

  private setItem(id: string, data: ICat): void {
    this.store[parseInt(id, 10)] = data;
  }
}
