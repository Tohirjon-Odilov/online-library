import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { LoggerService } from '../../../../core/services/logger.service';
import { UserService } from '../../../../core/services/user.service';
import { jwtDecode } from 'jwt-decode';
import { API_URLS } from '../../../../config/constants';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(
    private profileService: UserService,
    // private toaster: ToastrService,
    private logger: LoggerService
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

  ngOnInit() {
    this.logger.log('ProfileComponent initialized');

    const user: any = jwtDecode(localStorage.getItem('userData') as string);

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
        console.log('Error fetching profile data');
      }
    );

    this.date.setHours(this.date.getHours());
    this.createdAt = this.date.toLocaleTimeString('uz-UZ', { hour12: false });
    
// const formattedDate = createdAt.toLocaleTimeString('en-GB', { hour12: false });
  }
}
