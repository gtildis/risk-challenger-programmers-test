import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalService } from '../modal.service';
import { WordManipulationService } from '../word-manipulation.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  name: string = 'Programmers test';
  categories: any[] = [];
  searchQuery: string = '';

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private wordManipulationService: WordManipulationService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.apiService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
      this.categories.map((category) => {
        category.description =
          this.wordManipulationService.formatCategoryDescription(
            category.description
          ) || null;
        return category;
      });
    });
  }

  filterCategories(): void {
    if (this.searchQuery) {
      this.categories = this.categories.filter((category) =>
        category.name[0]?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchCategories();
    }
  }

  isModalOpen: boolean = false;

  openModal(categoryId: number, name: string): void {
    this.isModalOpen = true;
    this.modalService.openModal(categoryId, name);
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
