import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CreateCatDto } from './shared/dto/create-cat.dto';
import { UpdateCatDto } from './shared/dto/update-cat.dto';
import { ICatService } from './shared/interfaces/cat-service.interface';
import { ICat, ICatDocument } from './shared/interfaces/cat.interface';

@Injectable()
export class CatsService implements ICatService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<ICatDocument>) {
  }

  public add(cat: CreateCatDto): Observable<string> {
    const newCatModel = new this.catModel(cat);
    return fromPromise(newCatModel.save())
      .pipe(
        catchError(err => throwError(new InternalServerErrorException('error on add to DB'))),
        map(model => model.id)
      );
  }

  public findOne(id: string): Observable<ICatDocument | null> {
    return fromPromise(this.catModel.findById(id).exec())
      .pipe(
        catchError(err => throwError(new InternalServerErrorException('error on save to DB'))),
        switchMap(val => val === null ? throwError(new NotFoundException()) : of(val)),
      );
  }

  public findAll(): Observable<ICatDocument[]> {
    return fromPromise(this.catModel.find().exec())
      .pipe(
        catchError(err => throwError(new InternalServerErrorException('error on get from DB')))
      );
  }

  public delete(id: string): Observable<void> {
    return fromPromise(this.catModel.findByIdAndRemove(id).exec())
      .pipe(
        catchError(err => throwError(new InternalServerErrorException('error on delete from DB'))),
        switchMap(val => val === null ? throwError(new NotFoundException()) : EMPTY)
      );
  }

  public update(id: string, cat: UpdateCatDto): Observable<void> {
    return fromPromise(this.catModel.findByIdAndUpdate(id, cat).exec())
      .pipe(
        catchError(err => throwError(new InternalServerErrorException('error on update DB item'))),
        switchMap(val => val === null ? throwError(new NotFoundException()) : EMPTY)
      );
  }
}
