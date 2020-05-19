import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class HttpService {
  public loading = new BehaviorSubject<boolean>(false);

  show() {
    setTimeout(() => this.loading.next(true));
  }

  hide() {
    setTimeout(() => this.loading.next(false));
  }
}
