import {Component} from '@angular/core';
import {ExpressionFormControls} from '../../../../component-library/policy-editor/editor/expression-form-controls';
import {ExpressionFormHandler} from '../../../../component-library/policy-editor/editor/expression-form-handler';

@Component({
  selector: 'policy-definition-create-page',
  templateUrl: './policy-definition-create-page.component.html',
  viewProviders: [ExpressionFormHandler, ExpressionFormControls],
})
export class PolicyDefinitionCreatePageComponent {
  constructor(public expressionFormHandler: ExpressionFormHandler) {}
}
