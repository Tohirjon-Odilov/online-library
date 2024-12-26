import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../../../../core/services/logger.service';
import { CategoryService } from '../../services/category.service';
import { BookService } from '../../services/book.service';
import { List, shuffle } from 'lodash';
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
    private bookService: BookService,
  ){}

  randomBook: any
  randomCategories: Array<any> = []
  topBooks: Array<any> = []
  baseUrl = environment.baseUrl
  
  ngOnInit(): void {
    this.bookService.getRandomBook().subscribe(res => {
      this.randomBook = res;
    })

    this.bookService.getBooks().subscribe(res => {
      this.topBooks = res.items.slice(0, 3);
    })

    this.categoryService.getCategories().subscribe(res => {
      this.randomCategories = res;
    })
   }

   randomImage(imageArray: any): any {
    return shuffle(imageArray).slice(0, 4);
   }
  
   randomCategoryImage(imageArray: Array<any>): any {
    return shuffle(imageArray).slice(0, 3);
   }

   carouselImages = [
    'https://via.placeholder.com/800x300/FF5733/FFFFFF?text=Slide+1',
    'https://via.placeholder.com/800x300/33FF57/FFFFFF?text=Slide+2',
    'https://via.placeholder.com/800x300/5733FF/FFFFFF?text=Slide+3',
  ];
}
