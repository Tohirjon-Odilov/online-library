import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../../../core/services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private logger: LoggerService,
    private toaster: ToastrService
  ) { }

  // getAllCountries(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl, {
  //     headers: {
  //       Accept: "*/*",
  //     },
  //   });
  // }
}
