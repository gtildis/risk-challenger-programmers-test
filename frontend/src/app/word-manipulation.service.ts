import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordManipulationService {
  formatCategoryDescription(description: string): string {
    const words = description.split(' ');

    const formattedWords = words.map((word) => {
      if (word) {
        const firstLetter = word[0].toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();
        return firstLetter + restOfWord;
      }
      return '';
    });

    const formattedDescription = formattedWords.join(' ');

    return formattedDescription;
  }

  constructor() {
    // Constructor logic, if needed
  }
}
