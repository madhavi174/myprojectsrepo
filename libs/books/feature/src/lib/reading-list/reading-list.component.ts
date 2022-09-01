import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Inject } from '@nestjs/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  actionButtonLabel: string = 'Undo';
  snackmessage: string = 'Your book has been removed from the reading list'
  today = new Date();
  changedDate = '';
  pipe = new DatePipe('en-US');
  isShowDivIf: boolean = false;

  // @Inject(MAT_SNACK_BAR_DATA) public data: any
  constructor(private readonly store: Store, private _snackBar: MatSnackBar) { }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this._snackBar.open(this.snackmessage, this.actionButtonLabel, {
      duration: 5000
    });
  }
  formatDate() {
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.changedDate = ChangedFormat;
    this.isShowDivIf = !this.isShowDivIf;
    console.log(ChangedFormat, 'ChangedFormat')
  }

}
