import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  id?: string;
  title: string;
  company: string;
  location?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000/jobs';


  constructor(private http: HttpClient) {}

  getAll(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  add(job: Partial<Job>): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }
}
