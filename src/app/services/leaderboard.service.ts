import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LeaderboardEntry {
  username: string;
  totalPoints: number;
  badgeCount: number;
  rank: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private apiUrl = '/api/leaderboard';

  constructor(private http: HttpClient) { }

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(this.apiUrl);
  }
}
