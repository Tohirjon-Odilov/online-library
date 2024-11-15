import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router, 
    private toastr: ToastrService
  ) {}

  jumpTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  isDropdownVisible = false;

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  goToProfile(): void {
    this.isDropdownVisible = false;
    this.router.navigate(['/profile']); // Profil sahifasiga yo'naltirish
  }

  logout(): void {
    this.isDropdownVisible = false;
    // Logout jarayonini bajarish (tokenni o'chirish yoki API chaqiruv)
    this.router.navigate(['/auth/register']); // Login sahifasiga yo'naltirish
  }

  showReportInfo(): void {
    this.toastr.info('Iltimos ctrl+enter tugmasidan foydalaning!', 'Info');
  }
}
