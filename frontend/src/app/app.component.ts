import { Component } from '@angular/core';
import { CvManagerComponent } from './cv-manager/cv-manager.component';
import { JobListComponent } from './job-list/job-list.component';
import { HttpClientJsonpModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CvManagerComponent, JobListComponent, HttpClientJsonpModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
