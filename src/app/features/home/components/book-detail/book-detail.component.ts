import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  @Input() book: any;
  activeTab: string = 'info';

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Placeholder data, replace this with actual book data from the parent component or service
    this.book = this.book || {
      cover: '../../../../../assets/imgs/book1.png',
      title: 'Sample Book Title',
      description: 'A brief description of the book.',
      details: ['Author: John Doe', 'Published: 2023', 'Pages: 320'],
      fullDescription: 'This is the full description of the book with detailed information...',
      reviews: ['Great read!', 'Very informative.', 'Enjoyed every chapter!']
    };
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
