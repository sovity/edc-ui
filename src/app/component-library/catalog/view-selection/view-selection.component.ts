import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'view-selection',
  templateUrl: './view-selection.component.html',
})
export class ViewSelectionComponent {
  @Input() selected!: string;
  @Output() selectedChange = new EventEmitter<string>();

  onSelection(viewName: string) {
    this.selectedChange.emit(viewName);
  }
}
