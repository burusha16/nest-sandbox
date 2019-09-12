import { Type } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function expectObservableThrowErr(observable$: Observable<any>, errorInstance: Type<any>, done: () => void) {
  observable$
    .pipe(catchError(error => {
      expect(error).toBeInstanceOf(errorInstance);
      return of('catched');
    }))
    .subscribe(message => {
      expect(message).toEqual('catched');
      done();
    });
}

export function expectObservableIsEMPTY(observable$: Observable<any>, done: () => void) {
  observable$.subscribe({
    next: () => {
      throw new Error('Observable emit event, it is not EMPTY');
    },
    error: () => {
      throw new Error('Observable has error, it is not EMPTY');
    },
    complete: () => done()
  });
}
