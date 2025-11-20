import { Pipe, PipeTransform } from '@angular/core';
import { Application } from '../Service/application.service';
@Pipe({
  name: 'statusFilter',
  standalone: true
})
export class StatusFilterPipe implements PipeTransform {
  transform(applications: Application[], status: string): Application[] {
    if (!status) return applications; // show all if no filter
    return applications.filter(app => app.status === status);
  }
}
