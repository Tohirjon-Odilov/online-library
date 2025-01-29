import {Component, OnInit} from '@angular/core';
import {AuthorService} from "../../services/author.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.scss'
})
export class AuthorDetailComponent implements OnInit {
  author: any;
  baseUrl = environment.baseUrl;
  constructor(
    private authorService: AuthorService,
    private message: NzMessageService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.getAuthorDetail(params['authorId']);
    });
  }

  getAuthorDetail(authorId: number): void {
    this.authorService.getAuthorById(authorId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.message.error('Error while getting author detail');
      }
    );
  }
}
