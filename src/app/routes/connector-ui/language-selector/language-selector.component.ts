/*
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
// language-selector.component.ts
import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  supportedLanguages = [
    {code: 'en', name: 'English'},
    {code: 'de', name: 'Deutsch'},
    // Add more languages as needed
  ];

  selectedLanguage!: string;
  constructor(private translateService: TranslateService) {}
  ngOnInit(): void {
    // Set the initial selected language from localStorage
    this.selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    this.translateService.use(this.selectedLanguage);
  }

  onLanguageChange(): void {
    // Update selected language in localStorage
    localStorage.setItem('selectedLanguage', this.selectedLanguage);

    this.translateService.use(this.selectedLanguage);
  }
}
