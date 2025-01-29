import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../../../config/constants';
import {Book} from "../components/book-detail/book-detail.model";

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
    return this.httpClient.get(`${API_URLS.ALL_BOOKS}?page=1&limit=10`);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`${API_URLS.BOOK}/${bookId}`);
  }
}
