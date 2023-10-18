import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalService } from '../modal.service';
import { WordManipulationService } from '../word-manipulation.service';

// Initialize the types of the category object
interface Category {
  category_id: number;
  name: string;
  description: string | '';
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  // Initial properties and their types
  name: string = 'Programmers test';
  categories: Category[] = [];
  searchQuery: string = '';

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private wordManipulationService: WordManipulationService
  ) {}

  // Fetching the categories when the component mounts
  ngOnInit(): void {
    this.fetchCategories();
  }

  // Fetching the categories and changing the format of the description
  fetchCategories(): void {
    this.apiService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.categories.map((category) => {
        category.description =
          this.wordManipulationService.formatCategoryDescription(
            category.description
          ) || '';
        return category;
      });
    });
  }

  // Filter the categories based on the search input
  filterCategories(): void {
    if (this.searchQuery) {
      this.categories = this.categories.filter((category) =>
        category.name[0]?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchCategories();
    }
  }

  // Initialize the modal to be closed
  isModalOpen: boolean = false;

  // Opens the modal and passing the correct values
  openModal(categoryId: number, name: string): void {
    this.isModalOpen = true;
    this.modalService.openModal(categoryId, name);
  }

  // Closes the modal
  closeModal(): void {
    this.isModalOpen = false;
  }
}
