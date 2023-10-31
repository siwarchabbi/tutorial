import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  private books = [];
  private baseUrl = "http://localhost:3000";

  booksUpdated = new Subject<Book[]>();

  constructor(private http : HttpClient) { }

  getBooks() : Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/books`)
  }

  getBookById(id : number) : Observable<Book>{
    //return this.books.find(b=>b.id === id);
    return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
  }

  addBook(book : Object) : Observable<Book>{
    //this.books = [...this.books, book];
    console.log(book);
    const headers = new HttpHeaders({ 'content-type': 'application/json'});
    const options = {
      headers: headers
    };
    const body = JSON.stringify(book)
    return(this.http.post<Book>(`${this.baseUrl}/books`, body, options));
  }

  editBook(book : Book) : Observable<Book>{
    /*this.books = this.books.map(
      b=>{
        if(b.id === book.id)
          return book;
        else
          return b;
      }
    )*/
    const headers = new HttpHeaders({ 'content-type': 'application/json'});
    const options = {
      headers: headers
    };
    const body = JSON.stringify({
      titre : book.titre,
      auteur : book.auteur,
      prix : book.prix
    });
    return(this.http.put<Book>(`${this.baseUrl}/books/${book.id}`, body, options));
  }

  deleteBook(id : number):Observable<{}>{
    /*this.books = this.books.filter(
      b=>b.id !== id
    );
    this.booksUpdated.next(this.books);*/
    const headers = new HttpHeaders({ 'content-type': 'application/json'});
    const options = {
      headers: headers
    };
    return this.http.delete(`${this.baseUrl}/books/${id}`, options);

  }


  getLastId(){
    return this.books[this.books.length - 1].id;
  }

}
