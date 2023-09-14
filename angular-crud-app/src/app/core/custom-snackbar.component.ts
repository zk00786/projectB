import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html'
})
export class CustomSnackBar {
    message: string = this.data;
    constructor( 
        public snackBarRef: MatSnackBarRef<CustomSnackBar>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}