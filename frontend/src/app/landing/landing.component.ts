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
  // initialize the name of the app and the categories array
  name = 'Programmers test';
  categories: any[] = [];

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private wordManipulationService: WordManipulationService // Inject WordManipulationService
  ) {}

  // when the component mounts it fetch the categories
  ngOnInit() {
    this.fetchCategories();
  }

  // fetch the categories and slice the first 6 to show. Also formating the category description
  fetchCategories() {
    this.apiService.getCategories().subscribe((categories: any) => {
      // Slice the first six
      this.categories = categories.slice(0, 6);
      // Format the category descriptions using WordManipulationService
      this.categories.map((category) => {
        category.description =
          this.wordManipulationService.formatCategoryDescription(
            category.description
          );
        return category;
      });
    });
  }

  // Initialize the modal to be closed
  isModalOpen = false;

  // Opens the modal with setting the isModalOpen boolean to true and passing the category.name and categoryId
  openModal(categoryId: number, name: string) {
    // Pass the category ID to the modal service
    this.isModalOpen = true;
    this.modalService.openModal(categoryId, name);
  }


  // Closes the modal
  closeModal() {
    this.isModalOpen = false;
  }
}
