export interface ModalConfig {
  data?: { [key: string]: unknown };
  width: number;
  height: number;
  backdrob: boolean;
  closeOnBackdropClick: boolean;
  panelClass: string[];
  backdropClass: string;
}
