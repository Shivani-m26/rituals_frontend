import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardService, LeaderboardEntry } from '../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto py-12 px-4 animate-fade-in">
      <div class="text-center mb-12">
        <h1 class="font-handwritten text-6xl text-coffee mb-4">The Hall of Rituals</h1>
        <p class="text-coffee-light italic">Honoring those with the most disciplined souls.</p>
      </div>

      <div class="bg-white rounded-journal shadow-journal border-2 border-cream overflow-hidden">
        <table class="w-full">
          <thead class="bg-cream/30 text-coffee-light text-[10px] uppercase tracking-widest font-bold">
            <tr>
              <th class="px-6 py-4 text-left">Rank</th>
              <th class="px-6 py-4 text-left">User</th>
              <th class="px-6 py-4 text-center">Points</th>
              <th class="px-6 py-4 text-center">Badges</th>
              <th class="px-6 py-4 text-right">Title</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-cream/50">
            <tr *ngFor="let entry of leaderboard; let i = index" class="hover:bg-cream/10 transition-colors">
              <td class="px-6 py-4">
                <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold" 
                  [class.bg-soft-yellow]="i === 0" [class.bg-cream]="i > 0">
                  {{ i + 1 }}
                </span>
              </td>
              <td class="px-6 py-4 font-handwritten text-2xl text-coffee">{{ entry.username }}</td>
              <td class="px-6 py-4 text-center font-bold text-coffee">{{ entry.totalPoints }}</td>
              <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 bg-pastel-pink/10 text-pastel-pink text-xs font-bold rounded-full">
                  {{ entry.badgeCount }} 🏅
                </span>
              </td>
              <td class="px-6 py-4 text-right text-coffee-light italic text-sm">{{ entry.rank }}</td>
            </tr>
            <tr *ngIf="leaderboard.length === 0 && !isLoading">
              <td colspan="5" class="px-6 py-12 text-center text-coffee-light italic">The ledger is currently blank...</td>
            </tr>
          </tbody>
        </table>
        
        <div *ngIf="isLoading" class="p-12 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pastel-pink mx-auto"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .rounded-journal { border-radius: 2rem; }
    .shadow-journal { box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff; }
  `]
})
export class LeaderboardComponent implements OnInit {
  leaderboard: LeaderboardEntry[] = [];
  isLoading = true;

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.leaderboardService.getLeaderboard().subscribe({
      next: (data) => {
        this.leaderboard = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }
}
