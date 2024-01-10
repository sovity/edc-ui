import {Component, Input, OnInit} from '@angular/core';
import {HtmlSanitizer} from 'src/app/core/services/html-sanitizer';
import {MarkdownConverter} from 'src/app/core/services/markdown-converter';

@Component({
  selector: 'markdown-description',
  templateUrl: './markdown-description.component.html',
})
export class MarkdownDescriptionComponent implements OnInit {
  @Input() description!: string | undefined;

  constructor(
    public markdownConverter: MarkdownConverter,
    public htmlSanitizer: HtmlSanitizer,
  ) {}

  ngOnInit(): void {}
}
