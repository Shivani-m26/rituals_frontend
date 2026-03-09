import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface CarouselSlide {
  emoji: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slideState: 'active' | 'slide-in' | 'slide-out' = 'active';
  private autoPlayInterval: any;

  benefits: CarouselSlide[] = [
    {
      emoji: '📈',
      title: 'Build Consistency',
      description: 'Track your daily habits and watch your streaks grow. Small steps every day lead to life-changing results. Our visual tracker makes consistency feel rewarding.',
      color: 'text-coffee-dark',
      bgColor: 'bg-pastel-pink'
    },
    {
      emoji: '🧠',
      title: 'Mindful Reflection',
      description: 'Journal your thoughts alongside your habits. Understand the patterns behind your behavior and grow with intention through daily self-reflection.',
      color: 'text-coffee-dark',
      bgColor: 'bg-baby-blue'
    },
    {
      emoji: '🏆',
      title: 'Celebrate Progress',
      description: 'Visualize your journey with beautiful analytics. Every completed habit is a tiny victory worth celebrating — and we make sure you feel it!',
      color: 'text-coffee-dark',
      bgColor: 'bg-mint'
    }
  ];

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide() {
    this.slideState = 'slide-out';
    setTimeout(() => {
      this.currentSlide = (this.currentSlide + 1) % this.benefits.length;
      this.slideState = 'slide-in';
      setTimeout(() => {
        this.slideState = 'active';
      }, 500);
    }, 400);
  }

  prevSlide() {
    this.slideState = 'slide-out';
    setTimeout(() => {
      this.currentSlide = (this.currentSlide - 1 + this.benefits.length) % this.benefits.length;
      this.slideState = 'slide-in';
      setTimeout(() => {
        this.slideState = 'active';
      }, 500);
    }, 400);
  }

  goToSlide(index: number) {
    if (index === this.currentSlide) return;
    this.stopAutoPlay();
    this.slideState = 'slide-out';
    setTimeout(() => {
      this.currentSlide = index;
      this.slideState = 'slide-in';
      setTimeout(() => {
        this.slideState = 'active';
        this.startAutoPlay();
      }, 500);
    }, 400);
  }
}
