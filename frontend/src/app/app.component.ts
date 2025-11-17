import { Component } from '@angular/core';
import { CvManagerComponent } from './cv-manager/cv-manager.component';
import { JobListComponent } from './job-list/job-list.component';
import { CV } from './cv/cv.model';
import { CommonModule } from '@angular/common';
import { CvService } from './Service/cv.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CvManagerComponent, JobListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Cv Sender';
  cvs: CV[] = [];

  constructor(private cvService: CvService) {
    this.loadCvs();
  }

  loadCvs(){
    this.cvService.getAll().subscribe({
      next: (data) => this.cvs = data,
      error: ()=> {

        this.cvs = [
          {id: '1', name: 'Frontend Cv', filePath: '/path/to/frontend_cv.pdf'},
          {id: '2', name: 'Backend Cv', filePath: '/path/to/backend_cv.pdf'},
          {id: '3', name: 'Fullstack Cv', filePath: '/path/to/fullstack_cv.pdf'}
        ]
      }
    })
  }
}
