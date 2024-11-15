import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-authors',
  templateUrl: './all-authors.component.html',
  styleUrls: ['./all-authors.component.scss'],
})
export class AllAuthorsComponent implements OnInit {
  authors = [
    {
      title: 'The Stranger',
      author: 'Albert Camus',
      price: 18,
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
    },
    {
      title: 'Der Process',
      author: 'Franz Kafka',
      price: 22,
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    },
    {
      title: 'Confessions of a Mask',
      author: 'Yukio Mishima',
      price: 15,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    },
    {
      title: 'The Rebel',
      author: 'Albert Camus',
      price: 19,
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
    },
    {
      title: 'The Myth of Sisyphus',
      author: 'Albert Camus',
      price: 20,
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    },
    {
      title: 'Thus Spoke Zarathustra',
      author: 'Friedrich Nietzsche',
      price: 25,
      image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe',
    }
];



  ngOnInit(): void {
    // You can load book data here from an API if necessary
  }
}
