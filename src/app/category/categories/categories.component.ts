import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    ToastModule,
    TableModule,
    RouterModule,
  ],
  providers: [MessageService, CategoryService],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {

  categories!: Category[];
  isDeleteInProgress: boolean = false;

  constructor(private categoryService: CategoryService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    })
  }

  deleteCategory(id: number) {
    this.isDeleteInProgress = true;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Categoría eliminada',
        });
        this.loadCategories();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la categoría',
        });
      },
      complete: () => {
        this.isDeleteInProgress = false;
      }
    });
  }
}
