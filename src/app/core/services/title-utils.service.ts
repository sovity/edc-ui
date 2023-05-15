import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TitleUtilsService {
  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
  ) {}

  startUpdatingTitleFromRouteData() {
    const defaultTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute.snapshot.data?.title ?? defaultTitle),
      )
      .subscribe((title: string) => this.titleService.setTitle(title));
  }
}
