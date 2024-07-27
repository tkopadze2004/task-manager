import { OverlayRef } from '@angular/cdk/overlay';
import { Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MODAL_DATA } from './modal.service';

export class ModalRef {
  close$ = new Subject();
  afterClose$ = this.close$.asObservable();

  constructor(
    private overlayRef: OverlayRef,
    @Inject(MODAL_DATA) public data: any
  ) {
    this.data = data;
  }
  close(data: unknown = null) {
    this.overlayRef.detach();
    this.close$.next(data);
  }
}
