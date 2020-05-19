import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
