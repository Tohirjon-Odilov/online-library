import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../../../core/services/user.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss'],
})
export class AllBooksComponent implements OnInit {
  books: any = [
    {
      title: 'The Stranger',
      author: 'Albert Camus',
      price: 18,
      image: '../../../../../assets/imgs/book1.png',
    },
    {
      title: 'Der Process',
      author: 'Franz Kafka',
      price: 22,
      image: '../../../../../assets/imgs/book2.png',
    },
    {
      title: 'Confessions of a Mask',
      author: 'Yukio Mishima',
      price: 15,
      image: '../../../../../assets/imgs/book3.png',
    },
    {
      title: 'Confessions of a Mask',
      author: 'Yukio Mishima',
      price: 15,
      image: '../../../../../assets/imgs/book3.png',
    },
    
    // Add more books as needed
  ];
  baseUrl = environment.baseUrl

  userId: any

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(res => {
      this.books = res.items
    })

    this.userId = jwtDecode(localStorage.getItem('userData') as string)
    this.userId = +this.userId.UserId
  }

  addToFavorites(book: any): void {
    const formData = new FormData();
    formData.append('UserId', this.userId);
    formData.append('BookId', book.id.toString());
  
    this.userService.addBookToUser(formData).subscribe(
      (response) => {
        this.toaster.success('Yoqgan kitoblarga muvaffaqiyatli qo\'shildi.', 'Muvaffaqiyat');
        if (!book.user_ids) {
          book.user_ids = [];
        }
        book.user_ids.push(this.userId); // Kitobning user_ids qatoriga qo'shish
      },
      (error) => {
        this.toaster.error('Allaqachon yoqgan kitoblarga qo\'shilgan!', 'Xatolik');
      }
    );
  }
  
  removeFromFavorites(book: any): void {
    const formData = new FormData();
    formData.append('UserId', this.userId);
    formData.append('BookId', book.id.toString());
  
    this.userService.removeBookFromUser(formData).subscribe(
      (response) => {
        this.toaster.info('Kitob yoqqanlardan o\'chirildi.', 'O\'chirildi');
        book.user_ids = book.user_ids.filter((id: number) => id !== this.userId); // Foydalanuvchini user_ids qatoridan o'chirish
      },
      (error) => {
        this.toaster.error('Xatolik yuz berdi!', 'Xatolik');
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
