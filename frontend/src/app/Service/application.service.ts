import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './job.service';
import { CV } from '../cv/cv.model';

export interface Application {
  id: string;
  jobId: Job;
  cvId: CV;
  status?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  send(application: Partial<Application>): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

updateStatus(id: string, status: string): Observable<Application> {
  return this.http.patch<Application>(`/applications/${id}/status`, { status });
}


}
