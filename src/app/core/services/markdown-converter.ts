import {Injectable} from '@angular/core';
import {marked} from 'marked';

@Injectable({providedIn: 'root'})
export class MarkdownConverter {
  toHtml(markdown: string) {
    return marked.parse(markdown).toString();
  }
}
