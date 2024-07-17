import {FormControl, ɵFormGroupValue} from '@angular/forms';

/**
 * Form Model for Asset Create Form > Datasource > HTTP/REST > Header
 */
export interface HttpDatasourceHeaderFormModel {
  headerName: FormControl<string>;
  headerValue: FormControl<string>;
}

/**
 * Form Value for Asset Create Form > Datasource > HTTP/REST > Header
 */
export type HttpDatasourceHeaderFormValue =
  ɵFormGroupValue<HttpDatasourceHeaderFormModel>;
