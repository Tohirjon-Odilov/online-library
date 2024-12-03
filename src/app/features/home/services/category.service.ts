import { Injectable } from '@angular/core';
import { LoggerService } from '../../../core/services/logger.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private logger: LoggerService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  getCategories(): Observable<any> {
    return this.httpClient.get(`${API_URLS.CATEGORIES}`);
  }
}
