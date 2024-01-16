import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[externalLink]',
})
export class ExternalLinkDirective implements AfterViewInit {
  @Input()
  removeClass!: string;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement as HTMLAnchorElement;
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noopener noreferrer');
  }
}
