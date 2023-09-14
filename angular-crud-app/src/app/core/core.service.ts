import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackBar } from '../core/custom-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  configSuccess: MatSnackBarConfig = {
    panelClass: 'success-snackbar',
    duration: 10000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBarCustom(message: any) {
    this._snackBar.openFromComponent(CustomSnackBar, {
      data: message,
      ...this.configSuccess
    });
  }
}
