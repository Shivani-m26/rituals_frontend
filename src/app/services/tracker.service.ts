import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserHabit {
  id: number;
  name: string;
  description?: string;
  domain?: string;
  difficulty?: string;
  planType: string;
  startDate: string;
  endDate: string;
  preferredStartTime: string;
  isActive: boolean;
  streakCount: number;
  totalCompletions: number;
  totalPointsAttained: number;
  totalPointsLost: number;
  masterHabit?: any;
}

export interface TrackerLog {
  id: number;
  date: string;
  isCompleted: boolean;
  remark: string;
  pointsChanged: number;
}

export interface Badge {
  id: number;
  name: string;
  earnedAt: string;
  habitReferenceName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  private apiUrl = '/api/habits';

  constructor(private http: HttpClient) {}

  getActiveHabits(): Observable<UserHabit[]> {
    return this.http.get<UserHabit[]>(`${this.apiUrl}/active`);
  }

  startHabit(data: { masterHabitId: number, planType: string, startTime: string, startDate?: string }): Observable<UserHabit> {
    return this.http.post<UserHabit>(`${this.apiUrl}/start`, data);
  }

  startCustomHabit(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/start-custom`, data);
  }

  logProgress(habitId: number, data: { remark: string, completed: boolean, date?: string }): Observable<TrackerLog> {
    return this.http.post<TrackerLog>(`${this.apiUrl}/${habitId}/log`, data);
  }

  getHabitLogs(habitId: number): Observable<TrackerLog[]> {
    return this.http.get<TrackerLog[]>(`${this.apiUrl}/${habitId}/logs`);
  }

  claimBadge(habitId: number): Observable<Badge> {
    return this.http.post<Badge>(`${this.apiUrl}/${habitId}/claim-badge`, {});
  }

  deleteHabit(habitId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${habitId}`);
  }
}
