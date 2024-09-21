import { Injectable, isDevMode } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  readonly baseUrl = environment.baseUrl;
  
}
