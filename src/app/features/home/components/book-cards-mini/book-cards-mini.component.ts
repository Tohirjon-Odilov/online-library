import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {jwtDecode} from "jwt-decode";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {environment} from "../../../../../environments/environment";
import {BookService} from "../../services/book.service";
import {Book} from "../book-detail/book-detail.model";

@Component({
  selector: 'app-book-cards-mini',
  templateUrl: './book-cards-mini.component.html',
  styleUrl: './book-cards-mini.component.scss'
})
export class BookCardsMiniComponent implements OnInit {
  userId: number | null = null
  baseUrl: string = ""
  @Input() books: any
  data: Book | null = null
  @Input() bookId: number | null = null

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private bookService: BookService,
    private message: NzNotificationService
  ) {
  }

  ngOnInit() {
    const user: any = jwtDecode(localStorage.getItem('userData') as string);
    this.userId = user.UserId
    this.baseUrl = environment.baseUrl
    console.log(this.books)
    if (this.bookId) {
      console.log(this.getBook(this.bookId))
    } else (
      console.log("ma'lumot yo'q")
    )
  }

  removeFromFavorites(event: any, book: any): void {
    const formData = new FormData();
    formData.append('UserId', this.userId + "");
    formData.append('BookId', book.id.toString());
    const selectedBook = event.target.parentNode.parentNode as HTMLElement;

    this.userService.removeBookFromUser(formData).subscribe(
      (_) => {
        this.notification.info('O\'chirildi', 'Kitob yoqqanlardan o\'chirildi.');
        this.books = []
      },
      (_) => {
        this.notification.error('Xatolik', 'Xatolik yuz berdi!');
      }
    );
  }

  getBook(id: number): any {
    this.bookService.getBookById(id).subscribe(
      (book: any) => {
        console.log(book)
        this.data = book
      }
    )
  }

  getIcon(book: any): string {
    return 'fa-solid fa-bookmark';
  }

  //
  addToFavorites(book: any): void {
    const formData = new FormData();
    formData.append('UserId', this.userId!.toString());
    formData.append('BookId', book.id.toString());

    this.userService.addBookToUser(formData).subscribe(
      (response) => {
        this.message.success('Muvaffaqiyat', 'Yoqgan kitoblarga muvaffaqiyatli qo\'shildi.');
        if (!book.user_ids) {
          book.user_ids = [];
        }
        book.user_ids.push(this.userId); // Kitobning user_ids qatoriga qo'shish
      },
      (error) => {
        this.message.error('Xatolik', 'Allaqachon yoqgan kitoblarga qo\'shilgan!');
      }
    );
  }

  removeFromFavorites2(book: any): void {
    const formData = new FormData();
    formData.append('UserId', this.userId!.toString());
    formData.append('BookId', book.id.toString());

    this.userService.removeBookFromUser(formData).subscribe(
      (response) => {
        this.message.info('O\'chirildi', 'Kitob yoqqanlardan o\'chirildi.');
        book.user_ids = book.user_ids
          .filter((id: number) => id !== this.userId); // Foydalanuvchini user_ids qatoridan o'chirish
      },
      (error) => {
        this.message.error('Xatolik', 'Xatolik yuz berdi!');
      }
    );
  }

  toggleFavorite(book: any): void {
    if (book.user_ids?.includes(this.userId)) {
      this.removeFromFavorites2(book); // Yoqqanlardan o'chirish
    } else {
      this.addToFavorites(book); // Yoqqanlarga qo'shish
    }
  }

  getIcon2(book: any): string {
    if (book.user_ids?.includes(this.userId)) {
      return 'fa-solid fa-bookmark'; // Saqlangan ikonka
    } else {
      return 'fa-regular fa-bookmark'; // Oddiy ikonka
    }
  }
}
