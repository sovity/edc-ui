import {Component, Input, OnInit} from '@angular/core';
import {MarkdownConverter} from 'src/app/core/services/markdown-converter';

@Component({
  selector: 'markdown-description',
  templateUrl: './markdown-description.component.html',
  styleUrls: ['./markdown-description.component.scss'],
})
export class MarkdownDescriptionComponent implements OnInit {
  @Input() description!: string | undefined;

  constructor(public markdownConverter: MarkdownConverter) {}

  ngOnInit(): void {}
}
