import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CV } from '../cv/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private apiUrl = 'http://localhost:3000/cv';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CV[]> {
    return this.http.get<CV[]>(this.apiUrl);
  }

  add(cv: Partial<CV>): Observable<CV> {
    return this.http.post<CV>(this.apiUrl, cv);
  }
}
