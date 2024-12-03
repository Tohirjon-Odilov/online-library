import { Component } from '@angular/core';
import { LoggerService } from '../../../../core/services/logger.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent {
  
  constructor(
    private logger: LoggerService,
    private router: Router,
    private categoriesService: CategoryService
  ) { }
  
  // categories: any[] = [
  //   'Texnalogiya',
  //   'Salomatlik',
  //   'Ta\'lim',
  //   'Bizness',
  //   'Hayot tarzi',
  //   'Ko\'ngilochar'
  // ];

  categories: any[] = [];
  
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        this.logger.error(error);
      }
    );
  }

  favoriteBooks = [
    { title: 'The Stranger', author: 'Albert Camus', image: '../../../../../assets/imgs/book1.png' },
    { title: 'Der Process', author: 'Franz Kafka', image: '../../../../../assets/imgs/book2.png' },
    { title: 'The Idiot', author: 'Fyodor Dostoevsky', image: '../../../../../assets/imgs/book3.png' }
  ];
  
  selectedCategory: number | null = null;
  selectedData: any | null = null;

  toggleCategory(category: any): void {
    this.selectedCategory = this.selectedCategory === category.id ? null : category.id;

    this.selectedData = category.books
  }
}
