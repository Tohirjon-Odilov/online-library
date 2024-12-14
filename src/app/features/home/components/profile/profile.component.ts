import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { LoggerService } from '../../../../core/services/logger.service';
import { UserService } from '../../../../core/services/user.service';
import { jwtDecode } from 'jwt-decode';
import { API_URLS } from '../../../../config/constants';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(
    private profileService: UserService,
    private toaster: ToastrService,
    private logger: LoggerService,
    private userService: UserService
  ) { }
  
  favoriteBooks = [
    { name: 'The Stranger', author: 'Albert Camus', picture_url: '../../../../../assets/imgs/book1.png' },
    { name: 'Der Process', author: 'Franz Kafka', picture_url: '../../../../../assets/imgs/book2.png' },
    { name: 'The Idiot', author: 'Fyodor Dostoevsky', picture_url: '../../../../../assets/imgs/book3.png' }
  ];

  user: any;
  userPicture: string = "";
  baseUrl = environment.baseUrl
  date = new Date();
  createdAt: any
  userId: any

  ngOnInit() {
    this.logger.log('ProfileComponent initialized');
    const user: any = jwtDecode(localStorage.getItem('userData') as string);
    this.userId = user.UserId

    this.profileService.getUserById(user.UserId).subscribe(
      (response) => {
        this.user = response
        this.date = new Date(this.user.created_at)
        this.favoriteBooks = this.user.user_books
        this.logger.log(response);
        if(response.picture_url){
          this.userPicture = this.baseUrl + response.picture_url
        }else{
          this.userPicture = "../../../../../assets/imgs/avatar.png"
        }
      },
      (error) => {
        this.logger.error(error);
        // this.toaster.error('Error fetching profile data');
      }
    );
  }

  // addToFavorites(book: any): void {
  //   const formData = new FormData();
  //   formData.append('UserId', this.userId);
  //   formData.append('BookId', book.id.toString());
  
  //   this.userService.addBookToUser(formData).subscribe(
  //     (response) => {
  //       this.toaster.success('Yoqgan kitoblarga muvaffaqiyatli qo\'shildi.', 'Muvaffaqiyat');
  //       if (!book.user_ids) {
  //         book.user_ids = [];
  //       }
  //       book.user_ids.push(this.userId); // Kitobning user_ids qatoriga qo'shish
  //     },
  //     (error) => {
  //       this.toaster.error('Allaqachon yoqgan kitoblarga qo\'shilgan!', 'Xatolik');
  //     }
  //   );
  // }
  
  removeFromFavorites(event: any, book: any): void {
    const formData = new FormData();
    formData.append('UserId', this.userId);
    formData.append('BookId', book.id.toString());
    const selectedBook = event.target.parentNode.parentNode as HTMLElement;
  
    this.userService.removeBookFromUser(formData).subscribe(
      (response) => {
        this.toaster.info('Kitob yoqqanlardan o\'chirildi.', 'O\'chirildi');
        selectedBook.style.display = "none";
        // book.user_ids = book.user_ids.filter((id: number) => id !== this.userId); // Foydalanuvchini user_ids qatoridan o'chirish
      },
      (error) => {
        this.toaster.error('Xatolik yuz berdi!', 'Xatolik');
      }
    );
  }
  
  // toggleFavorite(book: any): void {
  //   if (book.user_ids?.includes(this.userId)) {
  //     this.removeFromFavorites(book); // Yoqqanlardan o'chirish
  //   } else {
  //     // this.addToFavorites(book); // Yoqqanlarga qo'shish
  //   }
  // }
  
  getIcon(book: any): string {
    // if (book.user_ids?.includes(this.userId)) {
      return 'fa-solid fa-bookmark'; // Saqlangan ikonka
    // } else {
      // return 'fa-regular fa-bookmark'; // Oddiy ikonka
    // }
  }
}
