import {Component, Input} from '@angular/core';

@Component({
  selector: 'tag-list',
  templateUrl: './tag-list.component.html',
})
export class TagListComponent {
  @Input() numberOfKeywordsDisplayed: number = 3;
  @Input() keywords: string[] | undefined;
  @Input() version: string | undefined;
}
