import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, Observable, distinctUntilChanged} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {Fetched} from '../../../../core/services/models/fetched';
import {value$} from '../../../../core/utils/form-group-utils';
import {DataOfferEditorDialogResult} from '../data-offer-editor-dialog/data-offer-editor-dialog-result';
import {DataOfferEditorDialog} from '../data-offer-editor-dialog/data-offer-editor-dialog.component';
import {DataOffersPageData} from './data-offers-page.data';
import {DataOffersPageService} from './data-offers-page.service';

@Component({
  selector: 'app-data-offers-page',
  templateUrl: './data-offers-page.component.html',
  styleUrls: ['./data-offers-page.component.scss'],
})
export class DataOffersPageComponent implements OnInit {
  contractDefinitionList: Fetched<DataOffersPageData> = Fetched.empty();
  searchText = new FormControl<string>('');
  deleteBusy = false;

  private fetch$ = new BehaviorSubject(null);

  constructor(
    private dataOffersPageService: DataOffersPageService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dataOffersPageService
      .dataOffersPageData$(this.fetch$, this.searchText$())
      .subscribe((contractDefinitionList) => {
        this.contractDefinitionList = contractDefinitionList;
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(DataOfferEditorDialog);
    dialogRef
      .afterClosed()
      .pipe(
        map((it) => it as DataOfferEditorDialogResult | null),
        filter((it) => !!it?.refreshList),
      )
      .subscribe(() => this.refresh());
  }

  refresh() {
    this.fetch$.next(null);
  }

  private searchText$(): Observable<string> {
    return (value$(this.searchText) as Observable<string>).pipe(
      map((it) => (it ?? '').trim()),
      distinctUntilChanged(),
    );
  }
}
