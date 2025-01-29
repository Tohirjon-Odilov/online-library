import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { LoggerService } from '../../../../core/services/logger.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-all-institute-literature',
  templateUrl: '../all-categories/all-categories.component.html',
  styleUrl: '../all-categories/all-categories.component.scss'
})

export class AllInstituteLiteratureComponent implements OnInit, AfterViewChecked{
  @ViewChild('book') book!: ElementRef;
  categoryHeight: any;

  constructor(
    // private logger: LoggerService,
    private router: Router,
    private categoriesService: CategoryService
  ) { }

  categories: any[] = [];
  filterCategories: any[] = [];

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.categories.forEach(element => {
          if(element.is_institute_literature){
            this.filterCategories.push(element)
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(this.filterCategories);
  }

  ngAfterViewChecked(): void {

    this.categoryHeight = this.book; // Elementning balandligi
    console.log('Div height:', this.categoryHeight);

  }

  getHeight(): string {
    this.categoryHeight = this.book.nativeElement.offsetHeight; // Elementning balandligi
    console.log('Div height:', this.categoryHeight);

    return this.categoryHeight + 'px';
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
