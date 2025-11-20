import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CV } from '../cv/cv.model';
import { FormsModule } from '@angular/forms';
import { JobService, Job } from '../Service/job.service';
import { ApplicationService } from '../Service/application.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent {
  jobs: Job[] = [];
  @Input() cvs: CV[] = [];
  selectedCvId: number | null = null;

  constructor(private http: HttpClient,
              private jobService: JobService,
              private applicationService: ApplicationService
  ){
    this.loadJobs();
  }

loadJobs() {
  this.jobService.getAll().subscribe({
    next: (data) => {
      this.jobs = Array.isArray(data) && data.length > 0 ? data : [
        { id: '1', title: 'Frontend Developer', company: 'TechCorp', location: 'Remote' },
        { id: '2', title: 'Angular Engineer', company: 'Innovate Ltd', location: 'Milan' }
      ];
    },
    error: (err) => {
      console.error('Error loading jobs', err);
      this.jobs = [
        { id: '1', title: 'Frontend Developer', company: 'TechCorp', location: 'Remote' },
        { id: '2', title: 'Angular Engineer', company: 'Innovate Ltd', location: 'Milan' }
      ];
    }
  });
}



  sendCv(jobId: string | number) {
    if (!this.selectedCvId) {
      alert('Please select a CV first!');
      return;
    }

    const selectedCv = this.cvs.find(cv => cv.id === String(this.selectedCvId));
    if (!selectedCv) {
      alert('Selected CV not found!');
      return;
    }

    const selectedJob = this.jobs.find(job => job.id === String(jobId));
    if (!selectedJob) {
      alert('Selected job not found!');
      return;
    }

    this.applicationService.send({
      jobId: selectedJob,
      cvId: selectedCv })
      .subscribe({
        next: () => alert(`CV ${this.selectedCvId} sent to job ${jobId}`),
        error: (err) => console.error('Error sending CV', err)
      });
  }
}

