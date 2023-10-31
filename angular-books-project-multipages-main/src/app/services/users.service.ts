import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users = [
    new User(1, "Mehdi", "mehdi.mtir@gmail.com", "MHPa$$w0rd"),
    new User(2, "Salah", "salah@gmail.com", "SLPa$$w0rd"),
    new User(3, "Sarra", "sarra@gmail.com", "SRPa$$w0rd"),
  ];

  usersUpdated = new Subject<User[]>();

  constructor() { }

  getUsers() : User[]{
    return [...this.users];
  }

  getUserById(id : number) : User{
    return this.users.find(b=>b.id === id);
  }

  addUser(user : User){
    this.users = [...this.users, user];
  }

  editUser(user : User){
    this.users = this.users.map(
      u=>{
        if(u.id === user.id)
          return user;
        else
          return u;
      }
    )
  }

  deleteUser(id : number){
    //console.log(id);
    this.users = this.users.filter(
      u=>u.id !== id
    );
    this.usersUpdated.next(this.users);
  }


  getLastId(){
    return this.users[this.users.length - 1].id;
  }
}
