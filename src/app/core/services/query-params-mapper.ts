import {Injectable} from '@angular/core';
import {HttpDatasourceQueryParamFormValue} from '../../routes/connector-ui/asset-page/asset-edit-dialog/form/model/http-datasource-query-param-form-model';
import {everythingAfter, everythingBefore} from '../utils/string-utils';

@Injectable({providedIn: 'root'})
export class QueryParamsMapper {
  getBaseUrlWithoutQueryParams(rawUrl: string): string {
    return everythingBefore('?', this.trimOrEmpty(rawUrl));
  }

  /**
   * Merges query params from the base URL with the additional ones.
   */
  getFullQueryString(
    baseUrlWithQueryParams: string,
    additionalQueryParams: HttpDatasourceQueryParamFormValue[],
  ): string | null {
    const queryParamSegments = additionalQueryParams.map((param) =>
      this.encodeQueryParam(param),
    );

    return [
      everythingAfter('?', this.trimOrEmpty(baseUrlWithQueryParams)),
      ...queryParamSegments,
    ]
      .filter((it) => !!it)
      .join('&');
  }

  private encodeQueryParam(param: HttpDatasourceQueryParamFormValue): string {
    const k = encodeURIComponent(this.trimOrEmpty(param.paramName));
    const v = encodeURIComponent(this.trimOrEmpty(param.paramValue));
    return this.buildQueryParam(k, v);
  }

  private trimOrEmpty(s: string | null | undefined): string {
    return s?.trim() ?? '';
  }

  private buildQueryParam(name: string, value: string) {
    return `${name}=${value}`;
  }
}
