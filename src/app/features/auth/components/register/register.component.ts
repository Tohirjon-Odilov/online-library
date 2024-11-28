import { Component, OnInit } from '@angular/core';
import { RegisterDTO } from '../../../../core/models/register.model';
import { AuthService } from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}
  
  isSignIn: boolean = true;
  
  ngOnInit(): void {
    setTimeout(() => {
      this.isSignIn = true;
    }, 200);
  }

  toggle() {
    this.isSignIn = !this.isSignIn;
  }

  registerData: RegisterDTO = {
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    country_id: 0,
    picture: undefined
  };


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
      },
      (error) => {
        console.error('Xatolik yuz berdi:', error);
      }
    );
  }
  
}
