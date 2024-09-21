import { Component } from '@angular/core';
import { HelperService } from '../../../@core/helper/helper.service';
import { AnnouncementService } from '../../../@core/shared/announcement.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent {

  constructor(private service: AnnouncementService, private router: Router, private helper: HelperService) { }

  loading = false;

  announcementModel = {
    header: '',
    body: '',
  };

  settings = {
    columns: {
      header: {
        title: 'Title',
      },
      body: {
        title: 'Detail',
      },
      createDate: {
        title: 'Create Date',
        valuePrepareFunction: (createDate: any) => {
          return this.helper.formatDate(createDate);
        }
      }
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: true,
      position: 'left'
    },
  };

  data = [
    this.loading = true,
    this.service.getAnnouncements().subscribe(
      res => {
        this.loading = false;
        this.data = res;
      },
      err => {
        this.loading = false;
        console.log(err);
      },
    )
  ];

  onSubmit(form: NgForm) {
    this.loading = true;
    this.service.createAnnouncement(form.value).subscribe(
      res => {
        this.helper.toast('success', 'Announcement Created', '');
        this.service.getAnnouncements().subscribe(
          res => {
            this.loading = false;
            this.data = res;
          },
          err => {
            this.loading = false;
            console.log(err);
          },
        );
      },
      err => {
        this.helper.toast('danger', 'Fail', '');
        this.loading = false;
      }
    );
  }

  onDelete(event) {
    this.service.deleteAnnouncement(event.data.id).subscribe(
      res => {
        this.helper.toast('success', 'Announcement Deleted', '');
        this.service.getAnnouncements().subscribe(
          res => {
            this.loading = false;
            this.data = res;
          },
          err => {
            this.loading = false;
            console.log(err);
          },
        );
      },
      err => {
        this.helper.toast('danger', 'Fail', '');
        this.loading = false;
      }
    );
  }
}
