import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../services/book.service";
import {environment} from "../../../../../environments/environment";
import {Book} from "./book-detail.model";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  // @Input() book: any;
  activeTab: string = 'info';
  showPdfViewer: boolean = false; // PDF viewer modal
  currentFile: string = ''; // Hozir ochilgan fayl
  book: Book | null = null;
  pdfUrl: string | null = null
  baseUrl = environment.baseUrl

  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['bookId']);
      this.getBooks(params['bookId']);
    })

    window.scrollTo(0, 0);
  }

  getBooks(bookId: number): void {
    this.bookService.getBookById(bookId).subscribe(book => {
      this.book = book;
      console.log(book);
    })
  }

  closePdfViewer(): void {
    this.showPdfViewer = false;
    this.currentFile = '';
    document.exitFullscreen();
  }

  // To'liq ekran rejimiga o'tish funksiyasi
  openFullscreen(): void {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  // Fullscreen rejimidan chiqish funksiyasi
  closeFullscreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  openPdfViewer(fileUrl: string): void {
    this.currentFile = fileUrl;
    this.showPdfViewer = true;
  }

  selectTab(tab: string) {
    this.activeTab = tab;

  }
}
