import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class EaasApiBaseService {
    baseApiUrl = environment.apiUrl;

    headerOptions = new RequestOptions(
        { 
            headers: new Headers(
                { 
                    'Content-Type': 'application/json', 
                    'Accept' : 'application/json' 
                })
        }
    );

	constructor(protected http: Http) { }

	protected extractData(res: Response) {
		const body = res.json();
		return body || {};
	}

	protected handleError(error: Response | any) {
		let errInfo: any;
		if (error instanceof Response) {
			const body = error.json() || '';

			if (body.Errors && body.Errors.length) {
				body.errorMessage = body.Error[0].ErrorMessage;
			} else if (body.ValidationErrors && body.ValidationErrors.length) {
				body.errorMessage = body.ValidationErrors[0].ErrorMessage;
			} else {
				const err = body.error || JSON.stringify(body);
				body.errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
			}

			errInfo = body;
		} else {
			errInfo = error;
		}

		return errInfo;
	}
}
