import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '/api/contact';

  constructor(private http: HttpClient) {}

  submitContactForm(data: { name: string, email: string, phone: string, comments: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
