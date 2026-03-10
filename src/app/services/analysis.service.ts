import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HabitRecommendation {
  id: number;
  name: string;
  domain: string;
  preference: string;
  difficulty: string;
  timeMinutes: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private apiUrl = '/api/analysis';

  constructor(private http: HttpClient) {}

  savePreferences(preferences: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/preferences`, preferences);
  }

  getRecommendations(): Observable<HabitRecommendation[]> {
    return this.http.get<HabitRecommendation[]>(`${this.apiUrl}/recommendations`);
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-info`);
  }
}
