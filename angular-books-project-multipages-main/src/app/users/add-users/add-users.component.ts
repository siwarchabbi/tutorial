import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  addForm : FormGroup;
  user : User;

  constructor(
    private fb : FormBuilder,
    private usersService : UsersService,
    private router : Router) { }

  addUser(){
    console.log(this.addForm);
    this.user = new User(
      this.usersService.getLastId() + 1,
      this.addForm.value.nom,
      this.addForm.value.email,
      this.addForm.value.password
    );
    this.usersService.addUser(this.user);
    this.router.navigate(['/users']);
  }

  ngOnInit(): void {
    /*this.addForm = new FormGroup({
      nom : new FormControl('', Validators.required),
      email : new FormControl(''),
      password : new FormControl('')
    });*/
    this.addForm = this.fb.group({
      nom : ['', Validators.required],
      email : [''],
      password : ['', Validators.minLength(8)]
    })
  }

}
