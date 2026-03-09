import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Journal {
  id?: number;
  title: String;
  content: string;
  date?: string;
  themeId: number;
  fontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = '/api/journals';

  constructor(private http: HttpClient) { }

  saveJournal(journal: Journal): Observable<Journal> {
    return this.http.post<Journal>(this.apiUrl, journal);
  }

  getJournalHistory(): Observable<Journal[]> {
    return this.http.get<Journal[]>(`${this.apiUrl}/history`);
  }

  getJournalById(id: number): Observable<Journal> {
    return this.http.get<Journal>(`${this.apiUrl}/${id}`);
  }
}
