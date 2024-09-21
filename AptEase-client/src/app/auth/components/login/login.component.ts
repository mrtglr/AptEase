import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from '../../../@core/helper/helper.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  formModel = {
    username: '',
    password: ''
  };

  loadingMediumGroup = false;

  constructor(private service: AuthService, private router: Router, private helper: HelperService) { }

  ngOnInit(): void {
    if(localStorage.getItem('AptEase_client_auth_token') != null) 
      this.router.navigateByUrl('/pages/dashboard');
  }

  onSubmit(form: NgForm) {
    this.loadingMediumGroup = true;
    this.service.login(form.value).subscribe(
      (res:any)=>{
        this.helper.toast('success', 'Login Successful!', 'Redirecting to dashboard...');
        this.generateToken(res.token);
        localStorage.setItem('AptEase_client_auth_token',JSON.stringify(this.service.UserToken));
        this.service.destroyUserToken();
        this.loadingMediumGroup = false;
        this.router.navigateByUrl('/pages/dashboard');
      },
      (err:any) => {
        this.helper.toast('danger', 'Login Failed!', 'Incorrect user creadentials');
        if(err.status == 400){
          console.log(err);
        }
        else{
          console.log(err);
        }
        this.loadingMediumGroup = false;
      }
    )
  }

  generateToken(token: any) {
    this.service.UserToken.name = 'AptEase-client:auth:token';
    this.service.UserToken.date = new Date();
    this.service.UserToken.value = token;
  }
}