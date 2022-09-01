import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable, pipe } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { BooksService } from 'libs/api/books/src/lib/books.service';
@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  //term = new FormControl();
  //options = [];
  //filteredOptions: Observable<Book[]>;




  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    //private service: BooksService
  ) {
    // this.filteredOptions = this.term.valueChanges.pipe(
    //   startWith(''),
    //   distinctUntilChanged(),
    //   switchMap(val => {
    //     return this.filter(val || '')
    //   })
    // )
  }
  // this.filteredOptions {
  //  // return this.service.search("title")
  //     pipe(
  //       map(response => response.filter(option => {
  //         return option.title.toLowerCase().indexOf(val.toLowerCase()) === 0
  //       }))
  //     )
  // }
  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }


  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}

