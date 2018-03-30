import { ServiceParams } from './../core/service-params';
import { CoreApiService } from './../core/core.api-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseServiceAPIUrl, CoreAPIURLs } from '../core/constants';
import { log } from 'util';

@Injectable()
export class SchedulerService {
    public sucessResult: boolean = false;
    public calendarEvents: any[] = [];
    public calendarResources: any[] = [];
    public scheduleDate: string;

    public calendar: any = {
        scheduleDate: {},
        sucessResult: {},
        resourceList: [],
        eventList: []
    };

    public result: Subject<any>;

    constructor(private http: HttpClient,
        private coreApiService: CoreApiService) {
        this.result = new Subject();
    }

    getScheduler(scheduledDate: string, locationCode: number): Observable<any> {
        let params: ServiceParams[] = [];
        this.calendarEvents = []
        this.scheduleDate = scheduledDate;
        console.log("Core Service Executed");
        params.push(
            { Key: "scheduleDate", Value: this.scheduleDate },
            { Key: "scheduleLocation", Value: "1" }
        );

        return this.coreApiService.GET<any>(CoreAPIURLs.getAppointmentsUrl, params)
            .map((result) => {
                let response = result.body;
                if (response.IsOperationSuccess) {
                    this.calendar.successResult = true;
                }
                if (response.Result.Appointments) {
                    response.Result.Appointments.forEach(appointment => {
                        this.calendarEvents.push({
                            start: appointment.AppointmentTime.toString(),
                            resourceId: "1",
                            title: appointment.QuoteNumber
                        });
                    });
                    //console.log(result)
                }

                if (response.Result.Resources) {
                    response.Result.Resources.forEach(resource => {
                        this.calendarResources.push({
                            id: resource.Id.toString(),
                            title: resource.Description
                        });
                    });
                }

                this.calendar.scheduleDate = response.Result.ScheduledDate;
                this.calendar.resourceList = this.calendarResources;
                this.calendar.eventList = this.calendarEvents;

                //console.log(this.calendar);

                return this.calendar;
            });
    }
}