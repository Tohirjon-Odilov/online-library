import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss'],
})
export class AllBooksComponent implements OnInit {
  books = [
    {
      title: 'The Stranger',
      author: 'Albert Camus',
      price: 18,
      image: '../../../../../assets/imgs/book1.png',
    },
    {
      title: 'Der Process',
      author: 'Franz Kafka',
      price: 22,
      image: '../../../../../assets/imgs/book2.png',
    },
    {
      title: 'Confessions of a Mask',
      author: 'Yukio Mishima',
      price: 15,
      image: '../../../../../assets/imgs/book3.png',
    },
    {
      title: 'Confessions of a Mask',
      author: 'Yukio Mishima',
      price: 15,
      image: '../../../../../assets/imgs/book3.png',
    },
    
    // Add more books as needed
  ];

  ngOnInit(): void {
    // You can load book data here from an API if necessary
  }
}
