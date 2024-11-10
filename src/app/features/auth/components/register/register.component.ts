import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSignIn: boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isSignIn = true;
    }, 200);
  }

  toggle() {
    this.isSignIn = !this.isSignIn;
  }
}
