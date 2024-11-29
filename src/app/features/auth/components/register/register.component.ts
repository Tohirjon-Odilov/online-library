import { Component, OnInit } from '@angular/core';
import { RegisterDTO } from '../../../../core/models/register.model';
import { AuthService } from '../../../../core/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  
  isSignIn: boolean = true;
  
  ngOnInit(): void {
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
      (response) => {
        console.log('Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi:', response);
        this.toggle();
        this.toaster.success('Ro\'yxatdan muvaffaqiyatli o\'tdingiz.', 'Muvaffaqiyat');
      },
      (error) => {
        if(error.status === 409){
          this.toaster.error('Email orqali oldin ro`yhatdan o`tilgan!', 'Xatolik');
          this.errorMessage = "Email orqali oldin ro`yhatdan o`tilgan!";
        }else{
          this.toaster.error('Xatolik mavjud!', 'Xatolik');
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
        this.toaster.success('Muvaffaqiyatli tizimga kirdingiz.', 'Muvaffaqiyat');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
      }
    )
  }
  
}
