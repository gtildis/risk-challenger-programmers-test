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
  categoryName: string | null = null;
  totalDuration: string = '0 hours 0 minutes';
  isRChecked: boolean = true;
  isNC17Checked: boolean = true;
  isPG13Checked: boolean = true;
  filteredFilms: any[] = [];

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private renderer: Renderer2,
    private el: ElementRef,
    private wordManipulationService: WordManipulationService
  ) {}

  ngOnInit(): void {
    this.modalService.onOpen.subscribe(({ categoryId, categoryName }) => {
      this.categoryName = categoryName;
      const modalElement = this.el.nativeElement.querySelector('.modal');
      this.renderer.setStyle(modalElement, 'display', 'block');

      this.fetchFilmsForCategory(categoryId);
    });
  }

  // Fetch the films for the chosen category
  fetchFilmsForCategory(categoryId: number): void {
    this.apiService.getFilmsByCategory(categoryId).subscribe((films: any) => {
      this.films = films;

      // Create the "Add Film" card
      const addFilmCard = {
        film_id: 0,
        title: 'Add Film',
        description: '+',
        duration: 0,
        rating: '',
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
      this.filteredFilms = [...this.films];
      console.log(this.filteredFilms);
      this.calculateTotalDuration();
    });
  }

  // Returns the total duration of the films on the specific category in hours and minutes
  calculateTotalDuration(): void {
    const totalMinutes = this.filteredFilms.reduce(
      (total, film) => total + film.duration,
      0
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    this.totalDuration = `${hours} hours ${minutes} minutes`;
  }

  // Updates the films by filtering only the films that need to be visible
  updateFilteredFilms(): void {
    this.filteredFilms = this.films.filter((film) => this.isFilmVisible(film));
    this.calculateTotalDuration();
  }

  // Checks if film.rating matches with the checked boxes
  isFilmVisible(film: any): boolean {
    // Skipping the first entry which is for creating a new film
    if (film.film_id === 0) {
      return true;
    }

    const isVisible =
      film.rating === 'G' ||
      (film.rating === 'R' && this.isRChecked) ||
      (film.rating === 'NC-17' && this.isNC17Checked) ||
      (film.rating === 'PG-13' && this.isPG13Checked);

    return isVisible;
  }

  // Update the modal's CSS class to change display from block to none
  closeModal(): void {
    const modalElement = this.el.nativeElement.querySelector('.modal');
    this.renderer.setStyle(modalElement, 'display', 'none');
    this.modalService.closeModal();
  }
}
