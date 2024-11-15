import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  favoriteBooks = [
    { title: 'The Stranger', author: 'Albert Camus', image: '../../../../../assets/imgs/book1.png' },
    { title: 'Der Process', author: 'Franz Kafka', image: '../../../../../assets/imgs/book2.png' },
    { title: 'The Idiot', author: 'Fyodor Dostoevsky', image: '../../../../../assets/imgs/book3.png' }
  ];
}
