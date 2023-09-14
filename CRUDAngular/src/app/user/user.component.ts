import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from '../service.service';
      
    
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userForm:any;
  users: any;
  constructor(public fb:FormBuilder, private service: ServiceService)
  {
    this.userForm = this.fb.group({
      Name:[""],
      Age:[""]
    })
  }

  ngOnInit(): void{
this.GetAll();
  }
  SubmitForm(){
    console.log(this.userForm.value);
    this.service.AddUser(this.userForm.value).subscribe(d=>
      {
        alert("Added");
      });
  }

  GetAll(){
    this.service.GetAll().subscribe(d=>
      {
        console.log(d);
        this.users = d;
      })
  }
}
