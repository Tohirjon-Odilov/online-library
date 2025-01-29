import { Component, OnInit } from '@angular/core';
import {AuthorService} from "../../services/author.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-all-authors',
  templateUrl: './all-authors.component.html',
  styleUrls: ['./all-authors.component.scss'],
})
export class AllAuthorsComponent implements OnInit {
  authors: any[] = [];
  baseUrl = environment.baseUrl

  constructor(
    private authorService: AuthorService,
  ) { }


  ngOnInit(): void {
    this.authorService.getAuthors().subscribe(response => {
      this.authors = response.items;  // API-dan kelgan ma'lumotlar
    });
  }
}
