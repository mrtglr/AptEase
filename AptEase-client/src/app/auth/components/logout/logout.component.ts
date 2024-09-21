import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../../@core/helper/helper.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-logout',
  template: '',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private service: AuthService, private router: Router, private helper: HelperService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.service.destroyUserToken();
    this.helper.toast('info', 'Logout Successfull!', 'Redirecting to login page', 'log-out-outline');
    this.router.navigateByUrl('/auth/login');
  }

}
