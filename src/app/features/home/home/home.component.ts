import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentIndex = 0;
  interval: any;
  
  carouselList = [
    {
      bannerImg: "assets/banner_img/img_1.jpg",
      title: "Apple iPhone",
      description: "Explore iPhone, the world's most powerful personal device",
    },
    {
      bannerImg: "assets/banner_img/img_3.jpg",
      title: "Never Settle - OnePlus",
      description: "OnePlus creates beautifully designed products with premium build quality & brings the best technology to users around the world",
    },
    {
      bannerImg: "assets/banner_img/img_4.jpg",
      title: "Google Pixel",
      description: "Discover a better way to capture, store, and see the world",
    },
  ];

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselList.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselList.length) % this.carouselList.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetAutoSlide();
  }

  resetAutoSlide() {
    clearInterval(this.interval);
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}