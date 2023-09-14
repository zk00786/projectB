import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import {FormModel, FormValidator} from '../validaror/FormValidator'
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      age: ''
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  validateForm(): boolean{
    const formValidator = new FormValidator();
    const valid: FormModel =
     { firstname: this.empForm.value.firstName,
       lastname:this.empForm.value.firstName,
       email:this.empForm.value.email,
       age: this.empForm.value.age | 0 
     };
     const result = formValidator.validate(valid);
     if(result && Object.keys(result).length) {
      const message = `* ERROR! * \n ${Object.keys(result).map(key => `${key}: ${result[key as keyof typeof result]}`).join("\n ")}`; 
      console.log(message);
      this._coreService.openSnackBarCustom(message);
      return false;
     }
     return true;
  }
  onFormSubmit() {
    if (this.validateForm()) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBarCustom('Updated');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBarCustom('Added');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
