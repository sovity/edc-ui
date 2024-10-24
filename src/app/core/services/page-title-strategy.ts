import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class CustomPageTitleStrategy extends TitleStrategy {
  rawTitle$ = new Subject<string>();

  constructor(
    private translateService: TranslateService,
    private title: Title,
  ) {
    super();
    this.rawTitle$.subscribe((title) =>
      this.title.setTitle(this.translateService.instant(title)),
    );
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const data = this.getRouteDataRecursively(snapshot);
    const titleUntranslated = data.title ?? 'EDC Connector';
    this.rawTitle$.next(titleUntranslated);
  }

  private getRouteDataRecursively(
    routerStateSnapshot: RouterStateSnapshot,
  ): any {
    let snapshot: ActivatedRouteSnapshot | null = routerStateSnapshot.root;
    let data = {};
    while (snapshot) {
      data = {...data, ...snapshot.data};
      snapshot = snapshot.firstChild;
    }
    return data;
  }
}
