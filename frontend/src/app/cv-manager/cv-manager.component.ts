import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CV } from '../cv/cv.model';
import  { CvService } from '../Service/cv.service';


@Component({
  selector: 'app-cv-manager',
  standalone: true,
  imports: [ CommonModule ,FormsModule],
  templateUrl: './cv-manager.component.html',
  styleUrls: ['./cv-manager.component.css']
})
export class CvManagerComponent {
  cvs: any[] = [];
  newCvName: string = '';
  newCvFilePath: string = '';

  constructor(private cvService: CvService) {
    this.loadCvs();
  }

  loadCvs(){
    this.cvService.getAll().subscribe({
      next: (data) => this.cvs = data,
      error: (err) => {
        console.error('Error loading CVs', err);
// fallback dummy CVs
        this.cvs = [
          { id: 1, name: 'John Doe CV', filePath: 'path/to/john_doe_cv.pdf' },
          { id: 2, name: 'Jane Smith CV', filePath: 'path/to/jane_smith_cv.pdf' }
        ];
      }
    })
  }

  addcv(){
    if(!this.newCvName || !this.newCvFilePath){
      alert('Please enter both name and file path');
      return;
    }

    this.cvService.add({ name: this.newCvName, filePath: this.newCvFilePath })
      .subscribe({
        next: (cv) => {
          this.cvs.push(cv);
          this.newCvName = '';
          this.newCvFilePath = '';
        },
        error: (err) => console.error('Error adding CV', err)
      });

  }
}
