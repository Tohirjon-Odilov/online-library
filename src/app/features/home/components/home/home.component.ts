import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../../../../core/services/logger.service';
import { CategoryService } from '../../services/category.service';
import { BookService } from '../../services/book.service';
import { shuffle } from 'lodash';
import { API_URLS } from '../../../../config/constants';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private router: Router,
    private logger: LoggerService,
    private categoryService: CategoryService,
    private bookService: BookService
  ){}

  randomBook: any
  randomBook2: any
  randomBook3: any
  baseUrl = environment.baseUrl
  
  ngOnInit(): void {
    this.bookService.getRandomBook().subscribe(res => {
      // console.log(res);
      this.randomBook = res.slice(0, 4);
      this.randomBook2 = shuffle(res).slice(0, 4);
      this.randomBook3 = shuffle(res).slice(0, 4);
    })
   }
  
}
