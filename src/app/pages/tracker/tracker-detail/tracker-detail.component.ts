import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrackerService, UserHabit, TrackerLog } from '../../../services/tracker.service';

@Component({
  selector: 'app-tracker-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tracker-detail.component.html',
  styleUrl: './tracker-detail.component.css'
})
export class TrackerDetailComponent implements OnInit {
  habitId!: number;
  habit: UserHabit | null = null;
  logs: TrackerLog[] = [];
  displayLogs: any[] = []; // Unified list of all days in the plan
  isLoading = true;
  today = new Date().toISOString().split('T')[0];
  
  // For today's log input
  todayRemark = '';
  todayCompleted = false;
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trackerService: TrackerService
  ) {}

  ngOnInit(): void {
    this.habitId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    this.trackerService.getActiveHabits().subscribe((habits: UserHabit[]) => {
      this.habit = habits.find((h: UserHabit) => h.id === this.habitId) || null;
      if (this.habit) {
        this.trackerService.getHabitLogs(this.habitId).subscribe((logs: TrackerLog[]) => {
          this.logs = logs;
          this.generateDisplayLogs(logs);
          
          const todayLog = logs.find((l: TrackerLog) => l.date === this.today);
          if (todayLog) {
            this.todayRemark = todayLog.remark;
            this.todayCompleted = todayLog.isCompleted;
          }
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }

  generateDisplayLogs(actualLogs: TrackerLog[]) {
    if (!this.habit) return;

    this.displayLogs = [];
    const startDate = new Date(this.habit.startDate);
    const endDate = this.habit.endDate ? new Date(this.habit.endDate) : new Date();
    
    // Safety break for infinite
    const limit = this.habit.planType === 'Infinite' ? 30 : 100; 
    let current = new Date(startDate);
    let count = 0;

    while (current <= endDate && count < limit) {
      const dateStr = current.toISOString().split('T')[0];
      const existing = actualLogs.find(l => l.date === dateStr);
      
      this.displayLogs.push({
        date: dateStr,
        remark: existing ? existing.remark : '',
        isCompleted: existing ? existing.isCompleted : false,
        pointsChanged: existing ? existing.pointsChanged : 0,
        isLogged: !!existing
      });

      current.setDate(current.getDate() + 1);
      count++;
    }
    // Reverse to show newest on top? User usually likes newest on top.
    this.displayLogs.reverse();
  }

  saveProgress(date?: string) {
    this.isSaving = true;
    const targetDate = date || this.today;
    const remark = date ? 'Manual entry' : this.todayRemark;
    const completed = date ? true : this.todayCompleted;

    this.trackerService.logProgress(this.habitId, {
      remark: remark,
      completed: completed,
      date: targetDate
    } as any).subscribe({
      next: () => {
        this.isSaving = false;
        this.loadData();
      },
      error: () => this.isSaving = false
    });
  }

  canClaimBadge(): boolean {
    // For demonstration, allow claiming if active.
    // In a real app, we might check if (today >= endDate)
    return this.habit ? this.habit.isActive : false;
  }

  claimBadge() {
    this.isSaving = true;
    this.trackerService.claimBadge(this.habitId).subscribe({
      next: (badge) => {
        alert(`Congratulations! You've earned the ${badge.name} badge!`);
        this.isSaving = false;
        this.loadData();
      },
      error: (err) => {
        alert(err.error || 'Failed to claim badge.');
        this.isSaving = false;
      }
    });
  }

  isFrozen(logDate: string): boolean {
    return new Date(logDate) < new Date(this.today);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  dropHabit(): void {
    if (confirm('Are you sure you want to drop this ritual? All progress will be lost.')) {
      this.trackerService.deleteHabit(this.habitId).subscribe({
        next: () => this.router.navigate(['/tracker']),
        error: (err) => alert('Failed to drop habit.')
      });
    }
  }
}
