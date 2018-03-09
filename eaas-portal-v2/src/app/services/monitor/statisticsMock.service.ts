import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { TrendMessage } from '../../entities/monitor/statistic';
import { EaasApiBaseService } from '../eaas-api-base.service';

@Injectable()
export class StatisticsMockService extends EaasApiBaseService {

    headerOptions = new RequestOptions({ headers:
    	new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
    });
    constructor(public http: Http) {
        super(http);
    }

    GetMessage(subUrl: string):Promise<any>{
        return this.http.post("http://172.16.12.154:8513/05fbc18" + subUrl, this.headerOptions)
                   .toPromise()
                   .then(this.extractData)
                   .catch(this.handleError);
    }
}