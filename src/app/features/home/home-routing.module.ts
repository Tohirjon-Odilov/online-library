import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoleGuard } from '../../core/guards/role.guard';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AllAuthorsComponent } from './components/all-authors/all-authors.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard, RoleGuard], // HomeComponent ni AuthGuard va RoleGuard orqali himoya qilish
    // data: { roles: ['designer', 'director'] }, // Foydalanuvchi ro'lini tekshirish
  },
  {
    path: "profile",
    canActivate: [AuthGuard, RoleGuard], // HomeComponent ni AuthGuard va RoleGuard orqali himoya qilish
    data: { roles: ['user', 'admin'] }, // Foydalanuvchi ro'lini tekshirish
    component: ProfileComponent
  },
  {
    path: 'all-books',
    component: AllBooksComponent
  },
  {
    path: 'book-detail',
    canActivate: [AuthGuard, RoleGuard], // HomeComponent ni AuthGuard va RoleGuard orqali himoya qilish
    data: { roles: ['user', 'admin'] }, // Foydalanuvchi ro'lini tekshirish
    component: BookDetailComponent
  },
  {

    path: 'all-authors',
    component: AllAuthorsComponent
  },
  {
    path: 'all-categories',
    component: AllCategoriesComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
