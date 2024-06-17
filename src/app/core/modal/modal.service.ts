import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Injectable, Injector, OnDestroy, inject } from '@angular/core';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ModalRef } from './modal.ref';
import { Subject } from 'rxjs';
import { ModalConfig } from '../interfaces/modal-config';

const DEFAULT_CONFIG: ModalConfig = {
  width: 80,
  height: 660,
  backdrob: true,
  backdropClass: 'dark-overlay',
  closeOnBackdropClick: true,
  panelClass: 'create-project',
};

@Injectable({ providedIn: 'root' })
export class ModalService implements OnDestroy {
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  sub$ = new Subject();

  open(component: ComponentType<any>, config: ModalConfig) {
    const modalConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.CreateOverlay(modalConfig);
    const modalRef = new ModalRef(overlayRef);
    const injector = this.creaeInjector(modalRef);

    overlayRef.attach(new ComponentPortal(component, null, injector));

    overlayRef.backdropClick().subscribe(() => {
      if (modalConfig.closeOnBackdropClick) {
        modalRef.close();
      }
    });
    return modalRef;
  }

  private creaeInjector(modalRef: ModalRef) {
    return Injector.create({
      providers: [
        {
          provide: ModalRef,
          useValue: modalRef,
        },
      ],
      parent: this.injector,
    });
  }
  private CreateOverlay(config: ModalConfig) {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: ModalConfig) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const scrollStrategy = this.overlay.scrollStrategies.block();

    return new OverlayConfig({
      width: `${config.width}%`,
      height: `${config.height}px`,
      hasBackdrop: config.backdrob,
      panelClass: config.panelClass,
      backdropClass: config.backdropClass,
      scrollStrategy,
      positionStrategy,
    });
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
