import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';
import {
  PolicyDefinition,
  PolicyService,
  policyDefinitionId,
} from '../../../edc-dmgmt-client';
import {Fetched} from '../../models/fetched';
import {NotificationService} from '../../services/notification.service';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from '../confirmation-dialog/confirmation-dialog.component';
import {NewPolicyDialogResult} from '../new-policy-dialog/new-policy-dialog-result';
import {NewPolicyDialogComponent} from '../new-policy-dialog/new-policy-dialog.component';

export interface PolicyList {
  filteredPolicies: PolicyDefinition[];
  numTotalPolicies: number;
}

@Component({
  selector: 'app-policy-view',
  templateUrl: './policy-view.component.html',
  styleUrls: ['./policy-view.component.scss'],
})
export class PolicyViewComponent implements OnInit {
  policyList: Fetched<PolicyList> = Fetched.empty();
  searchText: string = '';
  private fetch$ = new BehaviorSubject(null);

  constructor(
    private policyService: PolicyService,
    private notificationService: NotificationService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.fetch$
      .pipe(
        switchMap(() => {
          return this.policyService.getAllPolicies().pipe(
            map(
              (policies): PolicyList => ({
                filteredPolicies: policies.filter((policy) =>
                  this.isFiltered(policy, this.searchText),
                ),
                numTotalPolicies: policies.length,
              }),
            ),
            Fetched.wrap({
              failureMessage: 'Failed fetching policies.',
            }),
          );
        }),
      )
      .subscribe((policyList) => (this.policyList = policyList));
  }

  onSearch() {
    this.refresh();
  }

  onCreate() {
    const dialogRef = this.dialog.open(NewPolicyDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((result: NewPolicyDialogResult) => {
        if (result.refreshList) {
          this.refresh();
        }
      });
  }

  private refresh() {
    this.fetch$.next(null);
  }

  /**
   * simple full-text search - serialize to JSON and see if "searchText"
   * is contained
   */
  private isFiltered(policy: PolicyDefinition, searchText: string) {
    return JSON.stringify(policy).includes(searchText);
  }

  delete(policy: PolicyDefinition) {
    const dialogData = ConfirmDialogModel.forDelete('policy', this.id(policy));
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '20%',
      data: dialogData,
    });
    ref.afterClosed().subscribe((res) => {
      if (res) {
        this.policyService.deletePolicy(this.id(policy)).subscribe({
          complete: () => {
            this.fetch$.next(null);
            this.notificationService.showInfo('Successfully deleted policy.');
          },
          error: (err) => {
            console.error(err);
            this.notificationService.showError('Failed deleting policy.');
          },
        });
      }
    });
  }

  id(policyDefinition: PolicyDefinition): string {
    return policyDefinitionId(policyDefinition);
  }
}
