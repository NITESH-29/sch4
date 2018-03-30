import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from './shared/scheduler.component';

const routes: Routes = [
    { path: '', redirectTo: 'calendar', pathMatch: 'full' },
    { path: 'calendar', component: SchedulerComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouting {

}