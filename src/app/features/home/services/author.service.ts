import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {AUTHORS_URL} from "../../../config/constants";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<any> {
    return this.http.get<any>(AUTHORS_URL.ALL_AUTHORS + "?page=1&limit=10");
  }

  getAuthorById(authorId: number): Observable<any> {
    return this.http.get<any>(AUTHORS_URL.AUTHOR_BY_ID + authorId);
  }
}
