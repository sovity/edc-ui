import {Component, HostBinding, Input} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {PolicyOperatorConfig} from '../../model/policy-operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'policy-operator-select',
  templateUrl: 'policy-operator-select.component.html',
})
export class PolicyOperatorSelectComponent {
  @Input()
  operators: PolicyOperatorConfig[] = [];

  @Input()
  control!: UntypedFormControl;

  @HostBinding('class.flex')
  @HostBinding('class.flex-row')
  cls = true;

  constructor(public translationService: TranslateService) {}
  
  label = this.translationService.instant('general.operator');
  
}
