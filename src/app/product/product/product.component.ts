import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from '../../models';
import { CategoryService } from '../../services/category.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    RouterModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    CommonModule,
  ],
  providers: [
    MessageService, 
    CategoryService, 
    provideNoopAnimations(),
    ProductService
  ],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  formProduct!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.formProduct = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.edit = true;
      this.getProduct(+id);
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('loadCategories - Categories loaded:', this.categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las categorías',
        });
      }
    });
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (foundProduct) => {
        this.formProduct.patchValue({
          id: foundProduct.id,
          name: foundProduct.name,
          price: foundProduct.price,
          category: foundProduct.category
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Producto no encontrado',
        });
        this.router.navigate(['/']);
      },
    });
  }

  saveProduct() {
    if (this.formProduct.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revisar los campos',
      });
      return;
    }
    if (this.edit) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  createProduct() {
    this.productService.createProduct(this.formProduct.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Producto guardado',
        });
        this.router.navigateByUrl('/products');
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al guardar el producto',
        });
      }
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.formProduct.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Producto actualizado',
        });
        this.router.navigateByUrl('/products');
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar el producto',
        });
      }
    });
  }
}