import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JournalService, Journal } from '../../../services/journal.service';

@Component({
  selector: 'app-journal-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './journal-detail.component.html',
  styleUrl: './journal-detail.component.css'
})
export class JournalDetailComponent implements OnInit {
  journal?: Journal;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private journalService: JournalService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.journalService.getJournalById(+id).subscribe({
        next: (data: Journal) => {
          this.journal = data;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error fetching journal detail:', err);
          this.loading = false;
        }
      });
    }
  }

  getThemeClass(themeId?: number): string {
    if (!themeId) return 'bg-dots';
    const classes = ['bg-dots', 'bg-grid', 'bg-lined', 'bg-plain'];
    return classes[(themeId - 1) % classes.length];
  }
}
