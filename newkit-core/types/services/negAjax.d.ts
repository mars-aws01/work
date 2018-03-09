import { Http } from '@angular/http';
import { NegAlert } from './negAlert';
import { NegGlobalLoading } from './negGlobalLoading';
export declare class NegAjax {
    private http;
    private negGlobalLoading;
    private negAlert;
    private requestCount;
    constructor(http: Http, negGlobalLoading: NegGlobalLoading, negAlert: NegAlert);
    get(url: string, options?: any): Promise<any>;
    post(url: string, body: any, options?: any): Promise<any>;
    put(url: string, body: any, options?: any): Promise<any>;
    delete(url: string, options?: any): Promise<any>;
    setCommonHeaders(headers: {
        [key: string]: string;
    }): void;
    removeCommonHeader(headerKey: string): void;
    private _buildOptions(options, type);
    private _request(type, url, body, options);
    private _tryGetJsonData(res);
    private _handlerError(errRes);
    private _processLoading();
}
