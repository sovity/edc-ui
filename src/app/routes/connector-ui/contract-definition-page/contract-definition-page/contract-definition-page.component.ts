import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, Observable, distinctUntilChanged} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ContractDefinitionPage} from '@sovity.de/edc-client';
import {EdcApiService} from '../../../../core/services/api/edc-api.service';
import {Fetched} from '../../../../core/services/models/fetched';
import {value$} from '../../../../core/utils/form-group-utils';
import {ContractDefinitionEditorDialogResult} from '../contract-definition-editor-dialog/contract-definition-editor-dialog-result';
import {ContractDefinitionEditorDialog} from '../contract-definition-editor-dialog/contract-definition-editor-dialog.component';
import {
  ContractDefinitionPageData,
  FetchResult,
} from './contract-definition-page.data';

@Component({
  selector: 'app-contract-definition-page',
  templateUrl: './contract-definition-page.component.html',
  styleUrls: ['./contract-definition-page.component.scss'],
})
export class ContractDefinitionPageComponent implements OnInit {
  contractDefinitionList: Fetched<ContractDefinitionPageData> = Fetched.empty();
  searchText = new FormControl<string>('');
  deleteBusy = false;

  private fetch$ = new BehaviorSubject(null);

  constructor(
    private edcApiService: EdcApiService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.edcApiService
      .getContractDefinitionPage()
      .pipe(
        map((data): ContractDefinitionPageData => ({})),
        Fetched.wrap({failureMessage: 'Failed fetching contract list.'}),
      )
      .subscribe((contractDefinitionList) => {
        this.contractDefinitionList = contractDefinitionList;
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(ContractDefinitionEditorDialog);
    dialogRef
      .afterClosed()
      .pipe(
        map((it) => it as ContractDefinitionEditorDialogResult | null),
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
