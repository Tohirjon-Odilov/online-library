import { Component, OnInit } from '@angular/core';
import { RegisterDTO } from '../../../../core/models/register.model';
import { AuthService } from '../../../../core/authentication/auth.service';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CountryService } from '../../../home/services/country.service';
import {NzMessageService} from "ng-zorro-antd/message";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private countries: CountryService,
    private message: NzNotificationService
  ) {}

  isSignIn: boolean = true;
  countriesList: any[] = [];

  ngOnInit(): void {
    this.countries.getAllCountries().subscribe((response) => {
      this.countriesList = response;
    })
    setTimeout(() => {
      this.isSignIn = true;
    }, 200);
  }

  toggle() {
    this.isSignIn = !this.isSignIn;
  }

  loginDTO: any = {
    email: '',
    password: ''
  }

  registerData: RegisterDTO = {
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    country_id: 0,
    picture: undefined
  };

  errorMessage = '';

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.registerData.picture = file;
    }
  }

  register(): void {
    this.authService.registerUser(this.registerData).subscribe(
      (_) => {
        const person = {
          count: "1",
          countryId: this.registerData.country_id
        };

        this.countries.addPersonCountry(person).subscribe();
        this.toggle();
        this.message.success('Muvaffaqiyatli','Ro\'yxatdan muvaffaqiyatli o\'tdingiz.');
      },
      (error) => {
        if(error.status === 409){
          this.message.warning('Ma\'lumot','Email orqali oldin ro`yhatdan o`tilgan!');
          this.errorMessage = "Email orqali oldin ro`yhatdan o`tilgan!";
        }else{
          this.message.error('Xatolik','Xatolik mavjud!');
          // this.toaster.error('Xatolik mavjud!', 'Xatolik');
          console.log('Xatolik mavjud!');
          this.errorMessage = error.error.title;
        }
        console.dir(error);
      }
    );
  }

  login(): void {
    this.authService.login(this.loginDTO).subscribe(
      (response) => {
        this.message.success('Muvaffaqiyatli','Muvaffaqiyatli tizimga kirdingiz.');
        // console.log("Muvaffaqiyatli tizimga kirdingiz.");
        this.router.navigate(['/']);
        // window.location.href = '/';
      },
      (error) => {
        this.message.error('Xatolik','Email yoki parol xato!');
        console.error(error);
      }
    )
  }

}
