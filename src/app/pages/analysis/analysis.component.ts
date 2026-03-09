import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalysisService, HabitRecommendation } from '../../services/analysis.service';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent {
  step = 1;
  analysisMode: 'suggest' | 'custom' = 'suggest';
  bioForm: FormGroup;
  preferencesForm: FormGroup;
  planForm: FormGroup;
  customHabitForm: FormGroup;

  domains = [
    { 
      name: 'Productivity', 
      icon: '🎯',
      preferences: ['Deep Work', 'Inbox Zero', 'Task Management', 'Pomodoro', 'Calendar Audit', 'Goal Setting', 'Review Sessions', 'Delegate Tasks', 'Focus Blocks', 'Note Taking']
    },
    { 
      name: 'Technology', 
      icon: '💻',
      preferences: ['Programming', 'Web Development', 'Testing', 'Debugging', 'System Design', 'DevOps', 'Automation', 'Code Optimization', 'Open Source Contribution', 'Technical Writing']
    },
    { 
      name: 'Art & Creativity', 
      icon: '🎨',
      preferences: ['Sketching', 'Painting', 'Digital Art', 'Writing', 'Music Composition', 'Photography', 'Crafting', 'Fashion Design', 'Video Editing', 'UI Design']
    },
    { 
      name: 'Fitness & Health', 
      icon: '🏃',
      preferences: ['HIIT', 'Yoga', 'Cardio', 'Strength Training', 'Pilates', 'Swimming', 'Cycling', 'Stretching', 'Hydration', 'Meal Planning']
    },
    { 
      name: 'Self Care & Mindfulness', 
      icon: '🧘',
      preferences: ['Meditation', 'Journaling', 'Breathing Exercises', 'Gratitude', 'Sleep Hygiene', 'Digital Detox', 'Skincare', 'Relaxing Bath', 'Nature Walk', 'Affirmations']
    },
    { 
      name: 'Learning & Growth', 
      icon: '📚',
      preferences: ['Reading', 'Language Learning', 'Online Courses', 'Skill Practice', 'Public Speaking', 'Memory Training', 'Networking', 'Mentorship', 'Financial Literacy', 'Speed Reading']
    }
  ];

  selectedDomain: any = null;
  selectedPreferences: string[] = [];
  recommendations: HabitRecommendation[] = [];
  isLoading = false;
  selectedHabit: HabitRecommendation | null = null;

  // AM/PM selection for planning
  periods = ['AM', 'PM'];
  selectedPeriod = 'AM';
  hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedHour = 6;
  selectedMinute = '00';

  constructor(
    private fb: FormBuilder,
    private analysisService: AnalysisService,
    private trackerService: TrackerService,
    private router: Router
  ) {
    this.bioForm = this.fb.group({
      age: [25, [Validators.required, Validators.min(5), Validators.max(99)]],
      gender: ['Male', [Validators.required]]
    });

    this.preferencesForm = this.fb.group({
      difficulty: ['Medium', [Validators.required]],
      timeMinutes: [30, [Validators.required]]
    });

    this.planForm = this.fb.group({
      planType: ['21', [Validators.required]],
      startDate: [new Date().toISOString().split('T')[0], [Validators.required]]
    });

    this.customHabitForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      domain: ['', [Validators.required]],
      difficulty: ['Medium', [Validators.required]],
      timeMinutes: [30, [Validators.required]]
    });
  }

  selectDomain(domain: any) {
    this.selectedDomain = domain;
    this.selectedPreferences = [];
  }

  togglePreference(pref: string) {
    const index = this.selectedPreferences.indexOf(pref);
    if (index > -1) {
      this.selectedPreferences.splice(index, 1);
    } else if (this.selectedPreferences.length < 3) {
      this.selectedPreferences.push(pref);
    }
  }

  nextStep() {
    if (this.step === 1 && this.bioForm.invalid) return;
    if (this.step === 2 && !this.selectedDomain) return;
    if (this.step === 3 && this.selectedPreferences.length === 0) return;
    
    this.step++;

    if (this.step === 6 && this.analysisMode === 'suggest') {
      this.getRecommendations();
    }
  }

  prevStep() {
    this.step--;
  }

  getRecommendations() {
    this.isLoading = true;
    const preferences = {
      age: this.bioForm.value.age,
      gender: this.bioForm.value.gender,
      selectedDomain: this.selectedDomain.name,
      selectedPreferences: this.selectedPreferences.join(','),
      difficulty: this.preferencesForm.value.difficulty,
      timeMinutes: this.preferencesForm.value.timeMinutes
    };

    console.log('[DEBUG] Saving preferences:', preferences);

    this.analysisService.savePreferences(preferences).subscribe({
      next: () => {
        this.analysisService.getRecommendations().subscribe({
          next: (res) => {
            this.recommendations = res;
            this.isLoading = false;
          },
          error: () => this.isLoading = false
        });
      },
      error: () => this.isLoading = false
    });
  }

  selectHabit(habit: HabitRecommendation) {
    this.selectedHabit = habit;
    this.step = 7;
  }

  switchToCustom() {
    this.analysisMode = 'custom';
    this.customHabitForm.patchValue({
      domain: this.selectedDomain.name,
      difficulty: this.preferencesForm.value.difficulty,
      timeMinutes: this.preferencesForm.value.timeMinutes
    });
    this.selectedHabit = null;
    this.step = 7;
  }

  startHabit() {
    // Convert AM/PM to 24h format
    let hour24 = this.selectedHour;
    if (this.selectedPeriod === 'PM' && hour24 < 12) hour24 += 12;
    if (this.selectedPeriod === 'AM' && hour24 === 12) hour24 = 0;
    const formattedTime = `${hour24.toString().padStart(2, '0')}:${this.selectedMinute}:00`;

    const planData = {
      planType: this.planForm.value.planType,
      startDate: this.planForm.value.startDate,
      startTime: formattedTime,
      duration: this.planForm.value.planType === 'Infinite' ? 36500 : parseInt(this.planForm.value.planType)
    };

    if (this.analysisMode === 'custom') {
      const payload = {
        ...this.customHabitForm.value,
        ...planData
      };
      this.trackerService.startCustomHabit(payload).subscribe({
        next: () => this.router.navigate(['/tracker']),
        error: () => this.isLoading = false
      });
    } else if (this.selectedHabit) {
      this.trackerService.startHabit({
        masterHabitId: this.selectedHabit.id,
        planType: planData.planType,
        startTime: planData.startTime,
        startDate: planData.startDate
      }).subscribe({
        next: () => this.router.navigate(['/tracker']),
        error: () => this.isLoading = false
      });
    }
  }
}
