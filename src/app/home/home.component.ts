import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{

  currentUser:User;
  currentUserSubscription:Subscription;
  users:User[]=[];
  constructor(
    private authenticationService:AuthenticationService,
    private userService:UserService
    ) { 
      this.currentUserSubscription=this.authenticationService.currentUser
      .subscribe(user=>{
        this.currentUser=user;
      })
    }

  ngOnInit() {
    this.loadAllUsers();
  }  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}
 deleteUser(id:number){
  this.userService.delete(id)
  .pipe(first()).subscribe(()=>
  {
    this.loadAllUsers();
  })
 }
 loadAllUsers(){
   this.userService.getAll()
   .pipe(first()).subscribe(users=>
   {
     this.users=users;
   })
 }
}
