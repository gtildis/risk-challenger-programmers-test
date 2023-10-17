// modal.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {
  private isModalOpen = false;
  onOpen = new EventEmitter<{ categoryId: number; categoryName: string }>();

  // Properties to store category details
  categoryId: any;
  categoryName: any;

  // Opens the modal and pass the category.categoryId and category.name
  openModal(categoryId: number, categoryName: string) {
    this.isModalOpen = true;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.onOpen.emit({ categoryId, categoryName });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  isModalVisible() {
    return this.isModalOpen;
  }
}
