import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'truncated-short-description',
  templateUrl: './truncated-short-description.component.html',
})
export class TruncatedShortDescription implements OnInit {
  @Input() text!: string | undefined;
  @HostBinding('class.italic') italic = false;
  @HostBinding('class')
  get classes() {
    return 'whitespace-pre-line truncate-lines-5';
  }

  ngOnInit() {
    this.italic = !this.text;
  }
}
