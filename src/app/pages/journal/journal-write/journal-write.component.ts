import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JournalService, Journal } from '../../../services/journal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-write',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './journal-write.component.html',
  styleUrl: './journal-write.component.css'
})
export class JournalWriteComponent {
  // Options
  sheets = [
    { id: 'dots', name: 'Dots', icon: '⋮⋮', class: 'bg-dots' },
    { id: 'grid', name: 'Grid', icon: '▦', class: 'bg-grid' },
    { id: 'lined', name: 'Lined', icon: '☰', class: 'bg-lined' },
    { id: 'plain', name: 'Plain', icon: '☐', class: 'bg-plain' }
  ];

  colors = ['#6B4F47', '#D14D72', '#4D72D1', '#4D9172', '#A68B82'];
  thicknesses = [2, 4, 6, 8];
  fonts = [
    { id: 'caveat', name: 'Handwritten', family: "'Caveat', cursive" },
    { id: 'indie', name: 'Playful', family: "'Indie Flower', cursive" },
    { id: 'dancing', name: 'Elegant', family: "'Dancing Script', cursive" },
    { id: 'patrick', name: 'Neat', family: "'Patrick Hand', cursive" }
  ];
  emojis = ['✨', '🌱', '☕', '📚', '🌸', '📝', '🌙', '⭐', '💪', '🍎', '🧘', '🎨'];

  // State
  selectedSheet = this.sheets[0];
  selectedTool = 'pen'; // 'pen' or 'pencil'
  selectedColor = this.colors[0];
  selectedThickness = this.thicknesses[0];
  selectedFont = this.fonts[0];
  
  journalContent = '';
  showTitlePopup = false;
  journalTitle = '';

  constructor(
    private journalService: JournalService,
    private router: Router
  ) {}

  selectSheet(sheet: any) {
    this.selectedSheet = sheet;
  }

  selectTool(tool: string) {
    this.selectedTool = tool;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectThickness(thickness: number) {
    this.selectedThickness = thickness;
  }

  selectFont(font: any) {
    this.selectedFont = font;
  }

  addEmoji(emoji: string) {
    this.journalContent += emoji;
  }

  openSubmitPopup() {
    if (!this.journalContent.trim()) {
      alert('Please write something first! ✍️');
      return;
    }
    this.showTitlePopup = true;
  }

  closePopup() {
    this.showTitlePopup = false;
  }

  isSubmitting = false;

  submitJournal() {
    if (!this.journalTitle.trim()) {
      alert('Please give your entry a title! 📓');
      return;
    }

    this.isSubmitting = true;
    const newJournal: Journal = {
      title: this.journalTitle,
      content: this.journalContent,
      themeId: this.sheets.indexOf(this.selectedSheet) + 1,
      fontFamily: this.selectedFont.family
    };

    this.journalService.saveJournal(newJournal).subscribe({
      next: (res) => {
        console.log('Journal saved:', res);
        this.isSubmitting = false;
        this.router.navigate(['/journal/history']);
      },
      error: (err) => {
        console.error('Error saving journal:', err);
        this.isSubmitting = false;
        alert('Failed to save journal. Please try again.');
      }
    });
  }

  get textareaStyle() {
    return {
      'color': this.selectedColor,
      'font-size': (14 + this.selectedThickness) + 'px',
      'line-height': '1.6',
      'font-family': this.selectedFont.family,
      'opacity': this.selectedTool === 'pencil' ? '0.6' : '1',
      'font-weight': this.selectedTool === 'pencil' ? '400' : '600',
      'text-shadow': this.selectedTool === 'pencil' ? `0.5px 0.5px 1px ${this.selectedColor}44` : 'none',
      'filter': this.selectedTool === 'pencil' ? 'contrast(0.9) brightness(1.1)' : 'none'
    };
  }
}
