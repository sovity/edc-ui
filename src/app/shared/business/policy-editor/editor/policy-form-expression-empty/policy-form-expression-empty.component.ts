import {Component, HostBinding, Input} from '@angular/core';
import {TreeNode} from '../../model/tree';
import {ExpressionFormValue} from '../expression-form-value';

@Component({
  selector: 'policy-form-expression-empty',
  templateUrl: './policy-form-expression-empty.component.html',
})
export class PolicyFormExpressionEmptyComponent {
  @HostBinding('class.flex')
  @HostBinding('class.h-[4rem]')
  @HostBinding('class.items-center')
  cls = true;

  @Input()
  treeNode!: TreeNode<ExpressionFormValue>;
}
