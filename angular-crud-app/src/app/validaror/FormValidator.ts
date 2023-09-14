import { Injectable } from '@angular/core';
import { Validator } from 'fluentvalidation-ts';
@Injectable({
    providedIn: 'root',
  })


export class FormValidator extends Validator<FormModel> {
    constructor() {
      super();
  
      this.ruleFor('firstname')
      .notEmpty()
      .withMessage('Please enter your firstname')
      .maxLength(100);

      this.ruleFor('lastname')
      .notEmpty()
      .withMessage('Please enter your lastname')
      .maxLength(100);
  
      this.ruleFor('age').greaterThan(0).withMessage('Please enter your age')


      this.ruleFor('email')
        .notNull()
        .notEmpty()
        .withMessage('Please enter Email, As you are older than 23 years')
        .when(formModel => formModel.age > 23)

     this.ruleFor('email').emailAddress().withMessage('Please enter valid email address');

    }
  }

  export type FormModel = {
    firstname: string;
    lastname: string;
    email: string | null;
    age: number;
  };