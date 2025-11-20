import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService, Application } from '../Service/application.service';
import { JobService, Job } from '../Service/job.service';
import { CvService } from '../Service/cv.service';
import { CV } from '../cv/cv.model';
import { StatusFilterPipe } from '../pipe/status-filter.pipe';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-applications-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule , StatusFilterPipe],
  templateUrl: './applications-dashboard.component.html',
  styleUrl: './applications-dashboard.component.css'
})
export class ApplicationsDashboardComponent {
  applications: Application[] = [];
  cvs: CV[] = [];
  jobs: Job[] = [];
  selectedStatus: string = '';
  chart: any;
  statusChart: any;
  jobChart: any;

  constructor(
    private applicationService: ApplicationService,

  ) {
    this.loadData();
  }

  loadData(){
    this.applicationService.getAll().subscribe({
      next: (apps) => this.applications = apps,
      error: (err) => console.error('Error Loading applications', err)
    });
  }

   ngAfterViewInit() {
    this.createStatusChart();
    this.createJobChart();
    this.updateStatusChart();
    this.updateJobChart();

  }

createStatusChart() {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    this.statusChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pending', 'Sent', 'Accepted', 'Rejected'],
        datasets: [{
          label: 'Applications by Status',
          data: [0, 0, 0, 0],
          backgroundColor: ['#f0ad4e', '#5bc0de', '#5cb85c', '#d9534f']
        }]
      }
    });
  }

  updateStatusChart() {
    if (!this.statusChart) return;
    const stats = { pending: 0, sent: 0, accepted: 0, rejected: 0 };
    for (const app of this.applications) {
      if (app.status && stats.hasOwnProperty(app.status)) {
        stats[app.status as keyof typeof stats]++;
      }
    }
    this.statusChart.data.datasets[0].data = [
      stats.pending,
      stats.sent,
      stats.accepted,
      stats.rejected
    ];
    this.statusChart.update();
  }
  createJobChart() {
    const ctx = document.getElementById('jobChart') as HTMLCanvasElement;
    this.jobChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [], // job titles
        datasets: [{
          label: 'Applications per Job',
          data: [],
          backgroundColor: '#5bc0de'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  updateJobChart() {
    if (!this.jobChart) return;
    const jobCounts: { [key: string]: number } = {};
    for (const app of this.applications) {
      const jobTitle = app.jobId?.title || 'Unknown Job';
      jobCounts[jobTitle] = (jobCounts[jobTitle] || 0) + 1;
    }
    this.jobChart.data.labels = Object.keys(jobCounts);
    this.jobChart.data.datasets[0].data = Object.values(jobCounts);
    this.jobChart.update();
  }

  getJobTitle(jobId: string): string {
    const job = this.jobs.find(j => String  (j.id ) === jobId);
    return job ? job.title : 'Unknown Job';
  }

  getCvName(cvId: number): string {
    const cv = this.cvs.find(c => Number (c.id) === cvId);
    return cv ? cv.name : 'Unknown CV';
  }

  updateApplicationStatus(appId: string, status: string){
    this.applicationService.updateStatus(appId, status).subscribe({
      next: (updated) => {
        const index = this.applications.findIndex(a => a.id === appId);
        if ( index !== -1) this.applications[index] = updated;
      },
      error: (err) => console.error('Error updating application status', err)
    })
  }

  getFilteredApplications(): Application[] {
    if (!this.selectedStatus) return this.applications;
    return this.applications.filter(app => app.status === this.selectedStatus);
  }

  getStats(){
    const stats: {[key: string]: number} = { pending: 0, sent: 0, accepted: 0, rejected: 0 };
    const filteredApps = this.getFilteredApplications();
    for (const app of this.applications){
      if(app.status && stats.hasOwnProperty(app.status)){
        stats[app.status as keyof typeof stats]++;
      }
    }
    return stats;
  }

}
