/*
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RouterStateSnapshot, TitleStrategy} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class CustomPageTitleStrategy extends TitleStrategy {
  constructor(
    private translateService: TranslateService,
    private readonly title: Title,
  ) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.translateService.get(title).subscribe((translatedTitle) => {
        this.title.setTitle(translatedTitle);
      });
    } else {
      this.title.setTitle('DEFAULT_TITLE');
    }
  }
}
