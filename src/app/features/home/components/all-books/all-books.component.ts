import {Component, OnInit} from '@angular/core';
import { BookService } from '../../services/book.service';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../../../core/services/user.service';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {ActivatedRoute} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";

interface MyJwtPayload extends JwtPayload {
  UserId: number | null;
}

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss'],
})

export class AllBooksComponent implements OnInit {
  books: any = [];
  baseUrl = environment.baseUrl

  userId: number | null = null

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private toaster: NzNotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = ((jwtDecode(localStorage.getItem('userData') as string)) as MyJwtPayload).UserId;

    this.route.queryParams.subscribe(params => {
      if (params['bookId']) {
        // this.bookService.getBooksByCategory(params['category']).subscribe(res => {
        //   this.books = res.items
        // })
      }
    })


    this.bookService.getBooks().subscribe(res => {
      this.books = res.items
    })

  }

  addToFavorites(book: any): void {
    const formData = new FormData();
    formData.append('UserId', this.userId!.toString());
    formData.append('BookId', book.id.toString());

    this.userService.addBookToUser(formData).subscribe(
      (response) => {
        this.toaster.success('Muvaffaqiyat','Yoqgan kitoblarga muvaffaqiyatli qo\'shildi.');
        if (!book.user_ids) {
          book.user_ids = [];
        }
        book.user_ids.push(this.userId); // Kitobning user_ids qatoriga qo'shish
      },
      (error) => {
        this.toaster.error('Xatolik', 'Allaqachon yoqgan kitoblarga qo\'shilgan!');
      }
    );
  }

  removeFromFavorites(book: any): void {
    const formData = new FormData();
    formData.append('UserId', this.userId!.toString());
    formData.append('BookId', book.id.toString());

    this.userService.removeBookFromUser(formData).subscribe(
      (response) => {
        this.toaster.info('O\'chirildi','Kitob yoqqanlardan o\'chirildi.');
        book.user_ids = book.user_ids.filter((id: number) => id !== this.userId); // Foydalanuvchini user_ids qatoridan o'chirish
      },
      (error) => {
        this.toaster.error('Xatolik','Xatolik yuz berdi!');
      }
    );
  }

  toggleFavorite(book: any): void {
    if (book.user_ids?.includes(this.userId)) {
      this.removeFromFavorites(book); // Yoqqanlardan o'chirish
    } else {
      this.addToFavorites(book); // Yoqqanlarga qo'shish
    }
  }

  getIcon(book: any): string {
    if (book.user_ids?.includes(this.userId)) {
      return 'fa-solid fa-bookmark'; // Saqlangan ikonka
    } else {
      return 'fa-regular fa-bookmark'; // Oddiy ikonka
    }
  }

}
