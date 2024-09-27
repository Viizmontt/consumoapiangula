import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
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
    CommonModule
  ],
  providers: [MessageService],
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  formCategory!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  mostrarId: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formCategory = this.fb.group({
      id: [null],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.edit = true;
      this.mostrarId = false;
      this.getCategory(+id!);
    } else {
      this.edit = false;
      this.mostrarId = true;
    }
  }

  getCategory(id: number) {
    this.categoryService.getCategory(id).subscribe({
      next: (foundCategory) => {
        this.formCategory.patchValue(foundCategory);
      },
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }

  saveCategory() {
    if (this.formCategory.invalid) {
      return;
    }
    this.isSaveInProgress = true;
    if (this.edit) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }

  createCategory() {
    this.categoryService.createCategory(this.formCategory.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/categories');
      },
      error: () => {
        this.isSaveInProgress = false;
      },
      complete: () => {
        this.isSaveInProgress = false;
      }
    });
  }

  updateCategory() {
    this.categoryService.updateCategory(this.formCategory.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/categories');
      },
      error: () => {
        this.isSaveInProgress = false;
      },
      complete: () => {
        this.isSaveInProgress = false;
      }
    });
  }
}