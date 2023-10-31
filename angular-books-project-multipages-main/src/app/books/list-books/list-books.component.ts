import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit, OnDestroy {
  books : Book[];
  subscription: Subscription;


  constructor(private bookService : BooksService) { }

  deleteBook(id : number){
    if(confirm("Êtes-vous sûre de vouloir supprimer le livre?")){
      this.bookService.deleteBook(id).subscribe(
        data =>{
          this.bookService.getBooks().subscribe(
            books => this.books = books
          );
        }
      )
      console.log(this.bookService.getBooks());
    }
  }

  ngOnDestroy() : void{
    this.subscription.unsubscribe();
    console.log("unsubsribed...");
  }

  ngOnInit(): void {
    this.subscription = this.bookService.booksUpdated.subscribe(
      books => this.books = books
    );
    this.bookService.getBooks().subscribe(
      books => this.books = books
    );

  }

}
