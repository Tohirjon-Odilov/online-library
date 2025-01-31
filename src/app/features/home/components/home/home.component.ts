import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoggerService} from '../../../../core/services/logger.service';
import {CategoryService} from '../../services/category.service';
import {BookService} from '../../services/book.service';
import {List, shuffle} from 'lodash';
import {API_URLS} from '../../../../config/constants';
import {environment} from '../../../../../environments/environment';
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  baseUrl = environment.baseUrl
  randomBook: any
  randomCategories: Array<any> = []
  topBooks: Array<any> = []
  authors: any;

  carouselImages = [
    'https://via.placeholder.com/800x300/FF5733/FFFFFF?text=Slide+1',
    'https://via.placeholder.com/800x300/33FF57/FFFFFF?text=Slide+2',
    'https://via.placeholder.com/800x300/5733FF/FFFFFF?text=Slide+3',
  ];

  constructor(
    private router: Router,
    private logger: LoggerService,
    private categoryService: CategoryService,
    private bookService: BookService,
    private authorService: AuthorService
  ) {
  }

  ngOnInit(): void {
    console.log('Home component initialized');
    this.bookService.getRandomBook().subscribe(res => {
      this.randomBook = this.randomImage(res);
    })

    this.bookService.getBooks().subscribe(res => {
      this.topBooks = res.items.slice(0, 3);
    })

    this.categoryService.getCategories().subscribe(res => {
      this.randomCategories = this.randomCategoryImage(res);
    })

    this.getAllAuthor();
  }

  randomImage(imageArray: any): any {
    console.log("randomImage");
    return shuffle(imageArray).slice(0, 4);
  }

  randomCategoryImage(imageArray: Array<any>): any {
    return shuffle(imageArray).slice(0, 3);
  }

  getAllAuthor(): void {
    this.authorService.getAuthors().subscribe(authors => {
      this.authors = authors
      console.log(authors);
    })
  }

  authorSelect(authors: any) {
    if(authors?.items?.length > 2) {
      return shuffle(authors.items).slice(0, 2);
    }
    return []
  }
}
