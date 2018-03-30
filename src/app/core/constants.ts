import { Injector } from '@angular/core';
import { Environment } from '../../environments/environment';

const injector = Injector.create([{ provide: Environment, useClass: Environment, deps: [] }]);
export const BaseServiceAPIUrl: string = injector.get(Environment).BaseServiceUrl;

export const CoreAPIURLs = {
    getAppointmentsUrl: 'api/scheduler/quote/appointments'
};