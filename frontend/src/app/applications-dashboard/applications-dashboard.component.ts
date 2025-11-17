import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService, Application } from '../Service/application.service';
import { JobService, Job } from '../Service/job.service';
import { CvService } from '../Service/cv.service';
import { CV } from '../cv/cv.model';

@Component({
  selector: 'app-applications-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications-dashboard.component.html',
  styleUrl: './applications-dashboard.component.css'
})
export class ApplicationsDashboardComponent {
  applications: Application[] = [];
  cvs: CV[] = [];
  jobs: Job[] = [];

  constructor(
    private applicationService: ApplicationService,
    private cvService: CvService,
    private jobService: JobService
  ) {
    this.loadData();
  }

  loadData(){
    this.applicationService.getAll().subscribe({
      next: (apps) => this.applications = apps,
      error: (err) => console.error('Error Loading applications', err)
    })
    this.cvService.getAll().subscribe({
      next: (data) => this.cvs = data,
      error: (err) => console.error('Error Loading CVs', err)
    })
    this.jobService.getAll().subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Error Loading Jobs', err)
    })
  }

  getJobTitle(jobId: number): string {
    const job = this.jobs.find(j => Number  (j.id ) === jobId);
    return job ? job.title : 'Unknown Job';
  }

  getCvName(cvId: number): string {
    const cv = this.cvs.find(c => Number (c.id) === cvId);
    return cv ? cv.name : 'Unknown CV';
  }

}
