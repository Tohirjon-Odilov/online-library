import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {jwtDecode} from "jwt-decode";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-book-cards-mini',
  templateUrl: './book-cards-mini.component.html',
  styleUrl: './book-cards-mini.component.scss'
})
export class BookCardsMiniComponent implements OnInit{
  userId: string = ""
  baseUrl: string = ""
  @Input() favoriteBooks: any

  constructor(
    private userService: UserService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    const user: any = jwtDecode(localStorage.getItem('userData') as string);
    this.userId = user.UserId
    this.baseUrl = environment.baseUrl
  }

  removeFromFavorites(event: any, book: any): void {
    const formData = new FormData();
    formData.append('UserId', this.userId);
    formData.append('BookId', book.id.toString());
    const selectedBook = event.target.parentNode.parentNode as HTMLElement;

    this.userService.removeBookFromUser(formData).subscribe(
      (_) => {
        this.notification.info('O\'chirildi', 'Kitob yoqqanlardan o\'chirildi.');
        selectedBook.style.display = "none";
        // book.user_ids = book.user_ids.filter((id: number) => id !== this.userId); // Foydalanuvchini user_ids qatoridan o'chirish
      },
      (_) => {
        this.notification.error('Xatolik', 'Xatolik yuz berdi!');
      }
    );
  }

  getIcon(book: any): string {
    // if (book.user_ids?.includes(this.userId)) {
    return 'fa-solid fa-bookmark'; // Saqlangan ikonka
    // } else {
    // return 'fa-regular fa-bookmark'; // Oddiy ikonka
    // }
  }
}
