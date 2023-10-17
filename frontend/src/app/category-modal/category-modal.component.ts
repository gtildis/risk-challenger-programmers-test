import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalService } from '../modal.service';
import { WordManipulationService } from '../word-manipulation.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
  films: any[] = [];
  categoryName: any;
  totalDuration: string = '0 hours 0 minutes';

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private renderer: Renderer2,
    private el: ElementRef,
    private wordManipulationService: WordManipulationService
  ) {}

  ngOnInit() {
    this.modalService.onOpen.subscribe(({ categoryId, categoryName }) => {
      this.categoryName = categoryName;
      const modalElement = this.el.nativeElement.querySelector('.modal');
      this.renderer.setStyle(modalElement, 'display', 'block');

      this.fetchFilmsForCategory(categoryId);
    });
  }

  fetchFilmsForCategory(categoryId: number) {
    this.apiService.getFilmsByCategory(categoryId).subscribe((films: any) => {
      this.films = films;

      // Create the "Add Film" card
      const addFilmCard = {
        film_id: 0,
        title: 'Add Film',
        description: '+',
        duration: 0,
      };

      // Add the "Add Film" card at the beginning of the films array
      this.films.unshift(addFilmCard);

      // Format film titles using WordManipulationService
      this.films.map((film) => {
        film.title = this.wordManipulationService.formatCategoryDescription(
          film.title
        );
        return film;
      });
      this.calculateTotalDuration();
    });
  }

  // Returns the total duration of the films on the specific category in hours and minutes
  calculateTotalDuration() {
    const totalMinutes = this.films.reduce(
      (total, film) => total + film.duration,
      0
    );

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    this.totalDuration = `${hours} hours ${minutes} minutes`;
  }

  // Update the modal's CSS class to change display from block to none
  closeModal() {
    const modalElement = this.el.nativeElement.querySelector('.modal');
    this.renderer.setStyle(modalElement, 'display', 'none');
    this.modalService.closeModal();
  }
}
