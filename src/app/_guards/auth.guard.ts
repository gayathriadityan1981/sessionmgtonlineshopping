import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router:Router,
    private authenticationService:AuthenticationService){}

  canActivate(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
    ){
      const currentUser=this.authenticationService.currentUserValue;
     
      if(currentUser){
        console.log("-------currentUser----"+currentUser);
        //authorised so return
        return true;
      }
      
      //if not logged in redirect to login page
      else{
        console.log("-------state.url--else--"+state.url);
      this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}})
      }
    }
}
