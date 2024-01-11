import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {HtmlSanitizer} from 'src/app/core/services/html-sanitizer';
import {MarkdownConverter} from 'src/app/core/services/markdown-converter';

const COLLAPSED_DESCRIPTION_HEIGHT = 600;

@Component({
  selector: 'markdown-description',
  templateUrl: './markdown-description.component.html',
})
export class MarkdownDescriptionComponent implements OnInit, AfterViewInit {
  @Input() description!: string | undefined;
  @ViewChild('content')
  elementView!: ElementRef;
  isLargeDescription = false;
  isCollapsed = false;
  collapsedDescriptionHeight!: number;

  constructor(
    private cd: ChangeDetectorRef,
    public markdownConverter: MarkdownConverter,
    public htmlSanitizer: HtmlSanitizer,
  ) {}

  ngOnInit(): void {
    this.collapsedDescriptionHeight = COLLAPSED_DESCRIPTION_HEIGHT;
  }

  ngAfterViewInit() {
    const contentHeight = this.elementView.nativeElement.offsetHeight;

    if (contentHeight > this.collapsedDescriptionHeight) {
      this.isLargeDescription = true;
      this.isCollapsed = true;
      this.cd.detectChanges();
    }
  }
}
