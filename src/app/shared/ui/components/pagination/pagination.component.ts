import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  imports: [RouterLink],
})
export class PaginationComponent {
  private static readonly FIRST_PAGE = 1;
  private static readonly MAX_PAGE = 20;

  currentPage = input<number>(PaginationComponent.FIRST_PAGE);
  prevPage = computed(() => this.currentPage() - PaginationComponent.FIRST_PAGE);
  nextPage = computed(() => this.currentPage() + PaginationComponent.FIRST_PAGE);
  isFirstPage = computed(() => this.currentPage() === PaginationComponent.FIRST_PAGE);
  isMaxPage = computed(() => this.currentPage() === PaginationComponent.MAX_PAGE);
  prevQueryParams = computed(() => {
    const prev = this.prevPage();
    return prev <= PaginationComponent.FIRST_PAGE ? null : { page: prev };
  });
  nextQueryParams = computed(() => {
    const next = this.nextPage();
    return next > PaginationComponent.MAX_PAGE ? null : { page: next };
  });
}
