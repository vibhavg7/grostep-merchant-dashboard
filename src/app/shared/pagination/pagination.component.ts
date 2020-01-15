import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PagerService } from '../pager.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  // tslint:disable-next-line:no-input-rename
  @Input('totalItemCount') totalItemCount: number;
  // tslint:disable-next-line:no-input-rename
  @Input('pagesize') pagesize: number;
  pager: any = {};
  pagedItems: any[];
  // tslint:disable-next-line:no-output-rename
  @Output('currentPage') currentPage = new EventEmitter<number>();
  constructor(private pagerService: PagerService) { }


  ngOnInit() {
  }

  ngOnChanges() {
    this.pager = this.pagerService.getPager(this.totalItemCount, 1, this.pagesize);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalItemCount, page, this.pagesize);
    this.currentPage.emit(page);
  }


}
