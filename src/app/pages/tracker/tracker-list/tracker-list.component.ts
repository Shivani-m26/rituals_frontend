import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrackerService, UserHabit } from '../../../services/tracker.service';

@Component({
  selector: 'app-tracker-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tracker-list.component.html',
  styleUrl: './tracker-list.component.css'
})
export class TrackerListComponent implements OnInit {
  allHabits: UserHabit[] = [];
  totalPoints = 0;
  isLoading = true;

  constructor(private trackerService: TrackerService) {}

  ngOnInit(): void {
    this.loadHabits();
  }

  loadHabits(): void {
    this.isLoading = true;
    this.trackerService.getActiveHabits().subscribe({
      next: (habits: UserHabit[]) => {
        // Sort: Active first, then by startDate descending
        this.allHabits = habits.sort((a, b) => {
          if (a.isActive === b.isActive) {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
          }
          return a.isActive ? -1 : 1;
        });
        
        // Calculate Total Wisdom Points from all rituals
        this.totalPoints = this.allHabits.reduce((sum, h) => sum + (h.totalPointsAttained || 0), 0);
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  dropHabit(id: number): void {
    if (confirm('Are you sure you want to drop this ritual? All progress will be lost.')) {
      this.trackerService.deleteHabit(id).subscribe({
        next: () => this.loadHabits(),
        error: (err) => console.error('Failed to drop habit:', err)
      });
    }
  }
}
