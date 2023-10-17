import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {
  private isModalOpen: boolean = false;
  onOpen = new EventEmitter<{ categoryId: number; categoryName: string }>();

  // Properties to store category details
  categoryId: number | null = null;
  categoryName: string | null = null;

  openModal(categoryId: number, categoryName: string) {
    this.isModalOpen = true;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.onOpen.emit({ categoryId, categoryName });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  isModalVisible(): boolean {
    return this.isModalOpen;
  }
}
