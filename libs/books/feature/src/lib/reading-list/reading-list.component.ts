import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Inject } from '@nestjs/common';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  actionButtonLabel: string = 'Undo';
  snackmessage: string = 'Your book has been removed from the reading list'
  // @Inject(MAT_SNACK_BAR_DATA) public data: any
  constructor(private readonly store: Store, private _snackBar: MatSnackBar) { }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this._snackBar.open(this.snackmessage, this.actionButtonLabel, {
      duration: 5000
    });
  }
}
