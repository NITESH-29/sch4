import { Observable } from 'rxjs/Rx';
import { Component, ElementRef, Directive, OnDestroy, Input, EventEmitter, IterableDiffers, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerService } from './scheduler.service';
import { DatePipe } from '@angular/common';

declare var jQuery: any;

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  scheduleDate: Date = new Date(2018, 2, 3);
  showCalendar: boolean = false;
  events: any[];
  resources: any[];
  header: any = {
    left: 'calendarButton',
    center: 'title',
    right: ''
  };
  style: any;
  styleClass: string;
  rtl: boolean;
  weekends: boolean;
  hiddenDays: number[];
  fixedWeekCount: boolean;
  weekNumbers: boolean;
  businessHours: any;
  height: any;
  contentHeight: any;
  aspectRatio: number = 1.35;
  eventLimit: any;
  defaultDate: any;
  editable: boolean;
  droppable: boolean;
  eventStartEditable: boolean;
  eventDurationEditable: boolean;
  resourceLabelText: string = '';
  defaultView: string = 'timelineDay';
  allDaySlot: boolean = false;
  allDayText: string = 'all-day';
  slotDuration: any = '00:30:00';
  slotLabelInterval: any;
  snapDuration: any;
  scrollTime: any = '00:00';
  minTime: any = '08:00';
  maxTime: any = '20:00';
  slotEventOverlap: boolean = true;
  nowIndicator: boolean;
  dragRevertDuration: number = 500;
  dragOpacity: number = .75;
  dragScroll: boolean = true;
  eventOverlap: any;
  eventConstraint: any;
  locale: string;
  timezone: boolean | string = false;
  timeFormat: string | null = null;
  eventRender: Function;
  dayRender: Function;
  navLinks: boolean;
  options: any;
  onDayClick: EventEmitter<any> = new EventEmitter();
  onDrop: EventEmitter<any> = new EventEmitter();
  onEventClick: EventEmitter<any> = new EventEmitter();
  onEventMouseover: EventEmitter<any> = new EventEmitter();
  onEventMouseout: EventEmitter<any> = new EventEmitter();
  onEventDragStart: EventEmitter<any> = new EventEmitter();
  onEventDragStop: EventEmitter<any> = new EventEmitter();
  onEventDrop: EventEmitter<any> = new EventEmitter();
  onEventResizeStart: EventEmitter<any> = new EventEmitter();
  onEventResizeStop: EventEmitter<any> = new EventEmitter();
  onEventResize: EventEmitter<any> = new EventEmitter();
  onViewRender: EventEmitter<any> = new EventEmitter();
  onViewDestroy: EventEmitter<any> = new EventEmitter();
  initialized: boolean;
  stopNgOnChangesPropagation: boolean;
  differ: any;
  schedule: any;
  datePicker: any;
  config: any;

  constructor(public el: ElementRef,
    differs: IterableDiffers,
    private schedulerService: SchedulerService,
    public datePipe: DatePipe) {
    this.initialized = false;
    console.log('Constructor Called');
  }

  ngOnInit() {
    console.log('ngOnInit Called');
    this.config = {
      theme: true,
      header: this.header,
      isRTL: this.rtl,
      weekends: this.weekends,
      hiddenDays: this.hiddenDays,
      fixedWeekCount: this.fixedWeekCount,
      weekNumbers: this.weekNumbers,
      businessHours: this.businessHours,
      height: this.height,
      contentHeight: this.contentHeight,
      aspectRatio: this.aspectRatio,
      eventLimit: this.eventLimit,
      defaultDate: this.defaultDate,
      locale: this.locale,
      timezone: this.timezone,
      timeFormat: this.timeFormat,
      editable: this.editable,
      droppable: this.droppable,
      eventStartEditable: this.eventStartEditable,
      eventDurationEditable: this.eventDurationEditable,
      defaultView: this.defaultView,
      allDaySlot: this.allDaySlot,
      resourceLabelText: this.resourceLabelText,
      allDayText: this.allDayText,
      slotDuration: this.slotDuration,
      slotLabelInterval: this.slotLabelInterval,
      snapDuration: this.snapDuration,
      scrollTime: this.scrollTime,
      minTime: this.minTime,
      maxTime: this.maxTime,
      slotEventOverlap: this.slotEventOverlap,
      nowIndicator: this.nowIndicator,
      dragRevertDuration: this.dragRevertDuration,
      dragOpacity: this.dragOpacity,
      dragScroll: this.dragScroll,
      eventOverlap: this.eventOverlap,
      eventConstraint: this.eventConstraint,
      eventRender: this.eventRender,
      dayRender: this.dayRender,
      navLinks: this.navLinks
    };

    if (this.options) {
      for (let prop in this.options) {
        this.config[prop] = this.options[prop];
      }
    }

    console.log('Service Called Start');
    this.callAPIService(this.scheduleDate, 1);
  }

  callAPIService(scheduledDate: Date, locationCode: number) {

    this.events = [];
    this.resources = [];
    console.log('Service Running');
    //console.log(this.events);
    //console.log(this.resources);

    let scheduleDateParam = this.datePipe.transform(this.scheduleDate, 'yyyy-MM-dd');
    this.schedulerService.getScheduler(scheduleDateParam, locationCode).subscribe(data => {
      if (data.successResult) {
        this.events = [];
        this.events = data.eventList;
        this.resources = data.resourceList;
        this.config.defaultDate = scheduledDate;
        this.scheduleDate = new Date(scheduledDate);
        console.log('Service Called Complete');

        //console.log(this.events);
        //console.log(this.resources);

        this.initialize();
      }
    });
  }

  initialize() {

    if (this.initialized) {
      this.schedule.fullCalendar('destroy');
      this.schedule = null;
    }

    console.log('Initialized');
    this.schedule = jQuery(this.el.nativeElement.children[0]);
    this.datePicker = jQuery(this.el.nativeElement.children[1]);
    //console.log(this.schedule);
    //console.log(this.datePicker);

    this.schedule.fullCalendar({
      customButtons: {
        calendarButton: {
          text: '-- SELECT DATE --',
          click: () => {
            this.showCalendar = !this.showCalendar;
          }
        }
      },
      header: this.header,
      defaultView: this.config.defaultView,
      defaultDate: this.config.defaultDate,
      aspectRatio: this.config.aspectRatio,
      scrollTime: this.config.scrollTime,
      minTime: this.config.minTime,
      maxTime: this.config.maxTime,
      resourceLabelText: this.config.resourceLabelText,
      resourceRender: (resource, cellEls) => {
        cellEls.on('click', () => {
          //// TODO :: Click event Handler on resource click
        });
      },
      eventClick: (calEvent, jsEvent, view) => {
        alert('Quote No : ' + calEvent.title);
      },
      eventMouseover: (calEvent, jsEvent, view) => {
        console.log('Show ToolTip');
      },
      eventMouseout: (calEvent, jsEvent, view) => {
        console.log('Hide ToolTip');

      },
      eventRender: (event, element) => {
        console.log('Handle Event Render Function');
      },
      resources: this.resources,
      events: this.events
    });

    this.initialized = true;
  }

  // Find Event Method
  _findEvent(id: string) {
    let event;
    if (this.events) {
      for (let e of this.events) {
        if (e.id === id) {
          event = e;
          break;
        }
      }
    }
    return event;
  }

  // Update Event Method
  _updateEvent(event: any) {
    let sourceEvent = this._findEvent(event.id);
    if (sourceEvent) {
      sourceEvent.start = event.start.format();
      if (event.end) {
        sourceEvent.end = event.end.format();
      }
    }
  }

  changeScheduler(date: any) {
    this.scheduleDate = date;
    this.callAPIService(this.scheduleDate, 1);
    this.showCalendar = !this.showCalendar;
  }
  gotoDate(date: any) {
    this.schedule.fullCalendar('gotoDate', date);
  }

  getDate() {
    return this.schedule.fullCalendar('getDate');
  }

  clearScheduler() {
    jQuery(this.el.nativeElement.children[0]).clear();
    this.initialized = false;
    this.schedule = null;
  }
}
