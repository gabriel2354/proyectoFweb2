import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carouselSlide', { static: false }) carouselSlide!: ElementRef;

  currentIndex: number = 0;
  totalSlides: number = 3;
  autoSlideInterval!: any;

  constructor() {}

  ngAfterViewInit() {
    this.startAutoSlide();
    this.initScrollAnimations();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.showNextSlide();
    }, 3000); // Cambia de imagen cada 3 segundos
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  showNextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
  }

  showPrevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }

  updateCarousel() {
    if (this.carouselSlide) {
      const offset = -this.currentIndex * 100;
      this.carouselSlide.nativeElement.style.transform = `translateX(${offset}%)`;
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  private initScrollAnimations() {
    const elements = document.querySelectorAll('.animate__animated');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__fadeIn', 'opacity-100');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    elements.forEach(element => observer.observe(element));
  }
}
