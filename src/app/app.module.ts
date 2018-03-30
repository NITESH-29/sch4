import { CoreApiService } from './core/core.api-service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { SchedulerComponent } from './shared/scheduler.component';
import { SchedulerService } from './shared/scheduler.service';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRouting,
    HttpClientModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    CoreApiService,
    SchedulerService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
