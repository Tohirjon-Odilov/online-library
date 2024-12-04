import { Component, OnInit } from '@angular/core';
import { RegisterDTO } from '../../../../core/models/register.model';
import { AuthService } from '../../../../core/authentication/auth.service';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CountryService } from '../../../home/services/country.service';

@Component({
  selector: 'app-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    // private toaster: ToastrService,
    private router: Router,
    private countries: CountryService
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

  confirmPassword: any = '';
  errorMessage = '';

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.registerData.picture = file;
    }
  }

  register(): void {
    this.authService.registerUser(this.registerData).subscribe(
      (response) => {
        const person = {
          count: "1",
          countryId: this.registerData.country_id
        };
        
        this.countries.addPersonCountry(person).subscribe();
        
        console.log('Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi:', response);
        this.toggle();
        // this.toaster.success('Ro\'yxatdan muvaffaqiyatli o\'tdingiz.', 'Muvaffaqiyat');
        console.log("Ro'yxatdan muvaffaqiyatli o'tdingiz.");
      },
      (error) => {
        if(error.status === 409){
          // this.toaster.error('Email orqali oldin ro`yhatdan o`tilgan!', 'Xatolik');
          console.log('Email orqali oldin ro`yhatdan o`tilgan!');
          this.errorMessage = "Email orqali oldin ro`yhatdan o`tilgan!";
        }else{
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
        console.log('Foydalanuvchi muvaffaqiyatli tizimga kirdi:', response);
        // this.toggle();
        // this.toaster.success('Muvaffaqiyatli tizimga kirdingiz.', 'Muvaffaqiyat');
        console.log("Muvaffaqiyatli tizimga kirdingiz.");
        // this.router.navigate(['/']);
        window.location.href = '/';
      },
      (error) => {
        console.error(error);
      }
    )
  }
  
}
