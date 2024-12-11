import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../../config/constants'; // Global o'zgaruvchilar
import { LoggerService } from './logger.service'; // Logger xizmati

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private logger: LoggerService) {}

  getUsers(): Observable<any> {
    this.logger.info('Fetching all users'); // Logger orqali loglash
    return this.http.get(API_URLS.USER);
  }

  getUserById(id: number): Observable<any> {
    this.logger.info(`Fetching user with id: ${id}`); // Logger orqali loglash
    return this.http.get(`${API_URLS.USER}/${id}`);
  }

  updateUser(id: number, userData: any): Observable<any> {
    this.logger.info(`Updating user with id: ${id}`); // Logger orqali loglash
    return this.http.put(`${API_URLS.USER}/${id}`, userData);
  }

  addBookToUser(ids: any): Observable<any> {
    // this.logger.info(`Adding book with id: ${bookId} to user with id: ${userId}`); // Logger orqali loglash
    return this.http.post(`${API_URLS.USER_ADD_BOOK}`, ids);
  }
}
