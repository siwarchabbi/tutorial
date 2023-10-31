import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  editForm : FormGroup;
  user : User;

  constructor(
    private fb : FormBuilder,
    private usersService : UsersService,
    private router : Router,
    private activatedRoute : ActivatedRoute) { }

  editUser(){
    /*this.user = new User(
      this.user.id,
      this.editForm.value.nom,
      this.editForm.value.email,
      this.editForm.value.password
    );*/
    this.user.name = this.editForm.value.nom;
    this.user.email = this.editForm.value.email;
    this.user.password = this.editForm.value.password;
    this.usersService.editUser(this.user);
    this.router.navigate(['/users']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.user = this.usersService.getUserById(+params['id']);
        this.editForm = this.fb.group({
          nom : [this.user.name, Validators.required],
          email : [this.user.email],
          password : [this.user.password, Validators.minLength(8)]
        })
      }
    )


  }

}
