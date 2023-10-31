import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  constructor(
    private bookService : BooksService,
    private router : Router) { }

  addBook(f : NgForm){
    //console.log(f);
    const newBook = {
      titre : f.value.titre,
      auteur : f.value.auteur,
      prix : f.value.prix
    }
    this.bookService.addBook(newBook).subscribe(
      book=>{
        console.log(book);
        this.router.navigate(['/books']);
      }
    );
  }

  ngOnInit(): void {
  }

}
