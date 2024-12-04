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
    { title: 'The Stranger', author: 'Albert Camus', image: '../../../../../assets/imgs/book1.png' },
    { title: 'Der Process', author: 'Franz Kafka', image: '../../../../../assets/imgs/book2.png' },
    { title: 'The Idiot', author: 'Fyodor Dostoevsky', image: '../../../../../assets/imgs/book3.png' }
  ];

  user: any;
  userPicture: string = "";

  ngOnInit() {
    this.logger.log('ProfileComponent initialized');

    const user: any = jwtDecode(localStorage.getItem('userData') as string);

    this.profileService.getUserById(user.UserId).subscribe(
      (response) => {
        this.user = response
        this.logger.log(response);
        if(response.picture_url){
          this.userPicture = environment.baseUrl + response.picture_url
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
  }
}
