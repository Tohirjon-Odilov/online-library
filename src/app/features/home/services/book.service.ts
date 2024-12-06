import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getRandomBook(): Observable<any> {
    return this.httpClient.get(`${API_URLS.RANDOM_BOOKS}`);
  }

  getBooks(): Observable<any> {
    return this.httpClient.get(`${API_URLS.ALL_BOOKS}`);
  }
}
