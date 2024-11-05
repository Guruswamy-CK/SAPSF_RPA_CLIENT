import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonStorageService {

  constructor(private _snackBar: MatSnackBar) { }
  baseUrl: string | undefined;

  openSnackBarSuccess(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: 'my-custom-snackbar-success'
    });
  }

  openSnackBarFailure(message: string) {
    this._snackBar.open(message, 'X', {
      panelClass: 'my-custom-snackbar-failure'
    });
  }

  openSnackBarValidation(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: 'my-custom-snackbar-validation'
    });
  }

}
