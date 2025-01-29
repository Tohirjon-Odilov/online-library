import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AllAuthorsComponent } from './components/all-authors/all-authors.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { AllInstituteLiteratureComponent } from './components/all-institute-literature/all-institute-literature.component';
import { CarouselComponent } from './components/carusel/carusel.component';
import {NzAlertComponent} from "ng-zorro-antd/alert";
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import {NzCardComponent} from "ng-zorro-antd/card";


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    AllBooksComponent,
    BookDetailComponent,
    AllAuthorsComponent,
    AllCategoriesComponent,
    AllInstituteLiteratureComponent,
    CarouselComponent,
    AuthorDetailComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzAlertComponent,
    NzCardComponent
  ]
})
export class HomeModule { }
