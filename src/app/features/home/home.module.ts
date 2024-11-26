import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AllAuthorsComponent } from './components/all-authors/all-authors.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    AllBooksComponent,
    BookDetailComponent,
    AllAuthorsComponent,
    AllCategoriesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
