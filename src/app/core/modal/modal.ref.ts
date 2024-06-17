import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class ModalRef {
  close$ = new Subject();
  afterClose$ = this.close$.asObservable();

  constructor(private overlayRef: OverlayRef) {}

  close(data: any = null) {
    this.overlayRef.detach();
    this.close$.next(data);
  }
}
