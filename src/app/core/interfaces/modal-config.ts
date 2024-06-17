export interface ModalConfig {
  data?: { [key: string]: any };
  width: number;
  height: number;
  backdrob: boolean;
  closeOnBackdropClick: boolean;
  panelClass: string;
  backdropClass: string;
}
