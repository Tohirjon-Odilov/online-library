import { Component } from '@angular/core';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent {
  categories: string[] = [
    'Technology',
    'Health',
    'Education',
    'Business',
    'Lifestyle',
    'Entertainment'
  ];
  selectedCategory: string | null = null;

  toggleCategory(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? null : category;
  }
}
