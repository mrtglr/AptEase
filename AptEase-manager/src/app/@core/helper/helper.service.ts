import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toastrService: NbToastrService) { }

  getUrlParameter(param: any) {
    return new URLSearchParams(window.location.search).get(param);
  }

  formatDate(date: any) {
    var datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'dd/MM/yyyy');
  }

  toast(status: string, title_content: string, content: string, icon?: string) {
    this.showToast(true, status, title_content, content, icon);
  }

  private showToast(success: boolean, status: string, title_content: string, content: string, icon?: string) {
    if(success && icon) {
      const config = {
        status: status,
        destroyByClick: true,
        duration: 3000,
        hasIcon: true,
        icon: icon,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        preventDuplicates: false,
      };
      const titleContent = title_content;
  
      this.toastrService.show(
        content,
        titleContent,
        config);
    } else {
      const config = {
        status: status,
        destroyByClick: true,
        duration: 3000,
        hasIcon: false,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        preventDuplicates: false,
      };
      const titleContent = title_content;
  
      this.toastrService.show(
        content,
        titleContent,
        config);
    }
  }
}
