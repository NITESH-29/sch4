import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { debug } from 'util';
import { BaseServiceAPIUrl, CoreAPIURLs } from './constants';
import { ServiceParams } from './service-params';

@Injectable()
export class CoreApiService {

    constructor(private http: HttpClient) { }

    // Http GET Method
    public GET<T>(actionUrl: string, serviceParams: ServiceParams[] | null) {
        let serviceUrl = BaseServiceAPIUrl + actionUrl;
        let paramaters = this.bindParameters(serviceParams);

        // API service calling
        return this.http
            .get<T>(serviceUrl, {
                params: paramaters,
                observe: 'response'
            }).catch(this.handleErrorResponse);
    }

    // Http POST Method
    public POST<T>(actionUrl: string, serviceParams: ServiceParams[] | null, data?: any) {
        let serviceUrl = BaseServiceAPIUrl + actionUrl;
        let paramaters = this.bindParameters(serviceParams);

        // API service calling
        return this.http
            .post<T>(serviceUrl, data, {
                params: paramaters,
                observe: 'response'
            }).catch(this.handleErrorResponse);
    }

    // common method to handle service error response
    private handleErrorResponse = (error: Response) => {
        // Do messaging and error handling here
        //console.log(error);
        return Observable.throw(error);
    }

    // common method to bind service paramaters
    private bindParameters = (serviceParams: ServiceParams[] | null) => {
        let paramaters = new HttpParams();
        if (serviceParams != null) {
            serviceParams.forEach(param => {
                paramaters = paramaters.append(param.Key, param.Value);
            });
        }
        return paramaters;
    }
}
