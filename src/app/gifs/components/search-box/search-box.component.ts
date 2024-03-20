import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput') // Referencia a un elemento local
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;
    console.log(newTag);
  }

}
