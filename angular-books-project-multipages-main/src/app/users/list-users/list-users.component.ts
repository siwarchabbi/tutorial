import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users : User[];
  subscription : Subscription;

  constructor(private userService : UsersService) { }

  deleteUser(id : number){

    if(confirm("Êtes-vous sûre de vouloir supprimer l'utilisateur?")){
      this.userService.deleteUser(id);
      //console.log(this.userService.getUsers());
    }
  }

  ngOnDestroy() : void{
    this.subscription.unsubscribe();
    //console.log("unsubsribed...");
  }

  ngOnInit(): void {
    this.subscription = this.userService.usersUpdated.subscribe(
      users => this.users = users
    );
    this.users = this.userService.getUsers();
  }

}
