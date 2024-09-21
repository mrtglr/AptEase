import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      AptEase Apartment Management System
    </span>
    <div class="socials">
      <a class="client" target="_blank" href="https://AptEase-client.web.app/auth/login">Go to client application</a>
    </div>
  `,
})
export class FooterComponent {
}
