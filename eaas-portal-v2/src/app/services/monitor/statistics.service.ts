import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { EaasApiBaseService } from '../eaas-api-base.service';
import { environment } from '../../../environments/environment';
import { StatisticRequest } from '../../entities/monitor/statistic';

@Injectable()
export class StatisticsService extends EaasApiBaseService {
    apiBaseUrl = environment.apiUrl;
    mockApiBaseUrl = 'http://172.16.12.154:8513/05fbc18/runtime/statistics/';
    headerOptions = new RequestOptions({ headers:
    	new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
    });
    constructor(public http: Http) {
        super(http);
    }
    
    getOrganization(): Promise<any> {
        return this.http.get(this.apiBaseUrl + 'edi/v1/eaas/organization', this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getPartnerList(): Promise<any> {
        return this.http.get(this.apiBaseUrl + 'eaas/v2/tpm/partner', this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getStationList(): Promise<any> {
        return this.http.get(this.apiBaseUrl + 'edi/v1/eaas/station', this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getMessageType(request): Promise<any> {
        return this.http.get(this.apiBaseUrl + 'edi/v1/eaas/custom-setting?organizationid=' + request.organizationid, this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getTotalMessage(request): Promise<any> {
        return this.http.post(this.apiBaseUrl + 'eaas/v2/runtime/statistics/message', request, this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getPopularFailedMessage(request): Promise<any> {
        return this.http.post(this.apiBaseUrl + 'eaas/v2/runtime/statistics/popular/failed-message', request, this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getPopularFailedMessageRate(request): Promise<any> {
        return this.http.post(this.apiBaseUrl + 'eaas/v2/runtime/statistics/popular/failed-message-rate', request, this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getTrendAvgMessage(request): Promise<any> {
        return this.http.post(this.apiBaseUrl + 'eaas/v2/runtime/statistics/trend/avg-response-time', request, this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getTrendFailedMessage(request): Promise<any> {
        return this.http.post(this.apiBaseUrl + 'eaas/v2/runtime/statistics/trend/failed-message', request, this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getTrendMessage(request): Promise<any> {
        return this.http.post(this.apiBaseUrl + 'eaas/v2/runtime/statistics/trend/message', request, this.headerOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
}
