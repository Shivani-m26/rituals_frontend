import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-8 animate-fade-in font-outfit">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Left: Basic Info -->
        <div class="md:col-span-1">
          <div class="journal-card bg-white p-8 shadow-sticky relative overflow-hidden h-full border-2 border-cream rounded-journal">
            <div class="washi-tape-accent absolute top-4 -right-8 rotate-12 bg-pastel-pink/50"></div>
            <div class="text-center">
              <div class="w-32 h-32 bg-cream rounded-full mx-auto mb-6 flex items-center justify-center text-5xl border-4 border-white shadow-sm relative">
                <span class="absolute -top-2 -right-2 text-2xl" *ngIf="user?.gender === 'Female'">🌸</span>
                <span class="absolute -top-2 -right-2 text-2xl" *ngIf="user?.gender === 'Male'">⚔️</span>
                {{ getAvatarIcon() }}
              </div>
              <h1 class="font-handwritten text-4xl text-coffee mb-1">{{ user?.username }}</h1>
              <div class="flex flex-col gap-1 mb-6">
                <p class="text-coffee-light italic text-xs">{{ user?.email }}</p>
                <span class="text-[10px] uppercase font-bold tracking-widest text-mint-dark">{{ user?.gender }}</span>
              </div>
              
              <div class="flex flex-col gap-4">
                <div class="p-4 bg-cream/30 rounded-2xl border border-coffee/5">
                  <h3 class="font-bold text-coffee-dark mb-1 text-[10px] uppercase tracking-widest">Ritual Balance</h3>
                  <p class="text-3xl font-handwritten text-coffee">{{ user?.totalPoints || 0 }} ✨</p>
                </div>
                <div class="p-4 bg-cream/30 rounded-2xl border border-coffee/5">
                  <h3 class="font-bold text-coffee-dark mb-1 text-[10px] uppercase tracking-widest">Active Rituals</h3>
                  <p class="text-3xl font-handwritten text-coffee">{{ user?.habitCount || 0 }} 🌱</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Badge Vault -->
        <div class="md:col-span-2">
          <div class="bg-white p-12 rounded-journal shadow-journal border-2 border-cream h-full min-h-[500px]">
            <div class="flex justify-between items-end mb-10">
              <h2 class="font-handwritten text-6xl text-coffee">Badge Vault</h2>
              <p class="text-[10px] font-bold text-coffee-light uppercase tracking-[0.2em]">Ranked by prestige</p>
            </div>
            
            <div *ngIf="user?.badges?.length > 0" class="space-y-12">
               <!-- Badge Tiers -->
               <div *ngFor="let tier of ['PLATINUM', 'GOLD', 'SILVER']" class="badge-tier-group">
                 <h4 class="text-[10px] font-bold text-coffee-light/40 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                   {{ tier }} ASSETS
                   <div class="h-px bg-cream flex-1"></div>
                 </h4>
                 
                 <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
                   <div *ngFor="let badge of getBadgesByTier(tier)" class="group relative">
                     <div class="aspect-square rounded-journal border-2 flex flex-col items-center justify-center p-4 transition-all hover:scale-105"
                          [class.bg-gradient-to-br]="true"
                          [class.from-white]="!badge.isPrime"
                          [class.to-cream]="!badge.isPrime"
                          [class.border-soft-blue]="badge.tier === 'PLATINUM'"
                          [class.border-soft-yellow]="badge.tier === 'GOLD'"
                          [class.border-cream-dark]="badge.tier === 'SILVER'"
                          [class.shadow-lg]="badge.isPrime"
                          [class.border-4]="badge.isPrime"
                          [class.animate-pulse]="badge.isPrime">
                       
                       <span class="text-5xl mb-2">
                         <ng-container [ngSwitch]="badge.tier">
                           <span *ngSwitchCase="'PLATINUM'">{{ badge.isPrime ? '🌌' : '💎' }}</span>
                           <span *ngSwitchCase="'GOLD'">{{ badge.isPrime ? '🏛️' : '🥇' }}</span>
                           <span *ngSwitchCase="'SILVER'">{{ badge.isPrime ? '🛡️' : '🥈' }}</span>
                         </ng-container>
                       </span>
                       <p class="text-[10px] font-bold text-coffee text-center uppercase tracking-tighter" [class.text-mint-dark]="badge.isPrime">
                         {{ badge.isPrime ? 'PRIME ' + badge.name : badge.name }}
                       </p>
                     </div>
                     <!-- Tooltip -->
                     <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-coffee text-white text-[10px] p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 shadow-xl border border-white/10">
                       <p class="font-bold mb-1">{{ badge.habitReferenceName }}</p>
                       <p class="italic text-coffee-light border-t border-white/10 pt-1">Ascended on {{ badge.earnedAt | date }}</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <div *ngIf="user?.badges?.length === 0" class="flex flex-col items-center justify-center h-full py-12 text-center opacity-30">
                <span class="text-7xl mb-6">📜</span>
                <p class="font-handwritten text-4xl text-coffee">The scrolls remain blank...</p>
                <p class="text-coffee-light italic mt-2">Begin your first ritual to earn a mark of discipline.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; padding-top: 2rem; }
    .rounded-journal { border-radius: 2rem; }
    .shadow-journal { box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff; }
    .washi-tape-accent {
      width: 120px;
      height: 35px;
      background: #D14D7288;
      clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%);
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: () => console.error('Failed to fetch profile')
    });
  }

  getBadgesByTier(tier: string) {
    if (!this.user?.badges) return [];
    return this.user.badges.filter((b: any) => b.tier === tier);
  }

  getAvatarIcon() {
    return this.user?.gender === 'Female' ? '👩‍🎨' : '👨‍💻';
  }
}
