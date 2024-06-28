/*
 * Copyright (c) 2021-2024. sovity GmbH
 * Copyright (c) 2024. Fraunhofer Institute for Applied Information Technology FIT
 * Contributors:
 *    - Fraunhofer FIT: Internationalization and German Localization
 */
import {Inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../config/app-config';

@Injectable({providedIn: 'root'})
export class ParticipantIdLocalization {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private translateService: TranslateService,
  ) {
    this.translateService
      .stream([
        'component_library.connector_id',
        'component_library.participant_id',
      ])
      .subscribe((translations) => {
        this.participantId = this.mds
          ? translations['component_library.connector_id']
          : translations['component_library.participant_id'];
        this.participantIdPlural = this.participantId + 's';
      });
  }
  private mds = this.config.features.has('mds-connector-id');
  participantId = ''; // init, will be updated by translateService
  participantIdPlural = this.participantId + 's';
  participantIdPlaceholder = this.mds
    ? 'MDSL1234XX.C1234XX'
    : 'other-connector-participant-id';
}
