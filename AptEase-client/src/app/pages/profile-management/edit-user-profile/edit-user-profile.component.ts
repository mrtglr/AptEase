import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HelperService } from '../../../@core/helper/helper.service';
import { UserService } from '../../../@core/shared/user.service';

@Component({
  selector: 'ngx-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styles: []
})
export class EditUserProfileComponent implements OnInit {

  constructor(private service: UserService, private helper: HelperService) { }

  loading = false;
  user: any;
  changePassword = false;

  updateModel = {
    email: '',
    fullname: '',
    phoneNumber: '',
  };

  updatePasswordModel = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  ngOnInit(): void {
    this.loading = true,
    this.service.getCurrentUser().subscribe(
      res => {
        this.loading = false;
        this.user = res;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    )
  }

  showChangePasswordTab() {
    this.changePassword = true;
  }

  hideChangePasswordTab() {
    this.changePassword = false;
  }

  updateUserProfile(form: NgForm) {
    this.loading = true,
    this.updateModel.email = form.value.email;
    this.updateModel.fullname = form.value.fullname;
    this.updateModel.phoneNumber = form.value.phoneNumber;
    this.service.updateUser(this.updateModel).subscribe(
      res => {
        this.helper.toast('success', 'Profile updated', '');
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  updatePassword(form: NgForm) {
    this.loading = true,
    this.service.updateUserPassword(form.value).subscribe(
      res => {
        this.loading = false;
        if(res){
          this.helper.toast('success', 'Password changed successfully', '');
        } else {
          this.helper.toast('danger', 'Current password is not matching', '');
        }
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

}
