import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from '../../../@core/helper/helper.service';
import { UserService } from '../../../@core/shared/user.service';

@Component({
  selector: 'ngx-user-register',
  templateUrl: './user-register.component.html',
  styles: []
})
export class UserRegisterComponent {

  constructor(private router: Router, public service: UserService, private helper: HelperService) { }

  registerModel = {
    username: '',
    email: '',
    fullname: '',
    phoneNumber: '',
    doorNumber: 0,
    userRole: false,
    password: '',
  };

  showLoading = false;
  isAdmin = false;

  checkValue(event: any) {
    this.isAdmin = event.target.checked;
  }

  onSubmit(form: NgForm) {
    this.showLoading = true;
    form.value.userRole = this.isAdmin;
    form.value.doorNumber = +form.value.doorNumber;
    this.service.register(form.value).subscribe(
      res=>{
        if(res['succeeded']) {
          this.helper.toast('success', 'Register Succeed', '');
          this.showLoading = false;
        }
        else {
          this.helper.toast('danger', 'Register failed', '');
          this.helper.toast('warning', res['errors'][0].code, res['errors'][0].description);
          this.showLoading = false;
        }
      },
      err => {
        this.helper.toast('danger', 'Register failed', '');
        if(err.status == 400){
          this.helper.toast('warning', err['error'], '');
          console.log(err['error']);
        }
        else{
          console.log(err);
        }
        this.showLoading = false;
      }
    )
  }

}
