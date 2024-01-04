import {Injectable} from '@angular/core';
import {sanitize} from 'isomorphic-dompurify';
import {marked} from 'marked';

@Injectable({providedIn: 'root'})
export class MarkdownConverter {
  toHtml(markdown: string) {
    return sanitize(marked.parse(markdown).toString());
  }
}
