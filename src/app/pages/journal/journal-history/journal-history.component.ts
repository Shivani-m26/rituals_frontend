import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JournalService, Journal } from '../../../services/journal.service';

@Component({
  selector: 'app-journal-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './journal-history.component.html',
  styleUrl: './journal-history.component.css'
})
export class JournalHistoryComponent implements OnInit {
  journals: Journal[] = [];
  loading = true;

  constructor(private journalService: JournalService) {}

  ngOnInit() {
    this.journalService.getJournalHistory().subscribe({
      next: (data) => {
        this.journals = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching journal history:', err);
        this.loading = false;
      }
    });
  }

  getThemeClass(themeId: number): string {
    const classes = ['bg-dots', 'bg-grid', 'bg-lined', 'bg-plain'];
    return classes[(themeId - 1) % classes.length];
  }
}
