import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AllBooksComponent} from './components/all-books/all-books.component';
import {BookDetailComponent} from './components/book-detail/book-detail.component';
import {AllAuthorsComponent} from './components/all-authors/all-authors.component';
import {AllCategoriesComponent} from './components/all-categories/all-categories.component';
import {
  AllInstituteLiteratureComponent
} from './components/all-institute-literature/all-institute-literature.component';
import {CarouselComponent} from './components/carusel/carusel.component';
import {NzAlertComponent} from "ng-zorro-antd/alert";
import {AuthorDetailComponent} from './components/author-detail/author-detail.component';
import {NzCardComponent, NzCardModule} from "ng-zorro-antd/card";
import {NzTagComponent, NzTagModule} from "ng-zorro-antd/tag";
import {NzTypographyComponent, NzTypographyModule} from "ng-zorro-antd/typography";
import {SharedModule} from "../../shared/shared.module";
import {NzListItemComponent, NzListModule} from "ng-zorro-antd/list";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import { BookCardsMiniComponent } from './components/book-cards-mini/book-cards-mini.component';
import {NzEmptyModule} from "ng-zorro-antd/empty";


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
    BookCardsMiniComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzAlertComponent,
    NzCardComponent,
    NzTagComponent,
    NzTypographyComponent,
    SharedModule,
    NzCardModule,
    NzListModule,
    NzTagModule,
    NzTabsModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzEmptyModule,
    NzTypographyModule,
  ]
})
export class HomeModule {
}
