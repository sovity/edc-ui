import {Injectable} from '@angular/core';
import {sanitize} from 'isomorphic-dompurify';

@Injectable({providedIn: 'root'})
export class HtmlSanitizer {
  sanitize(html: string) {
    return sanitize(html);
  }
}
