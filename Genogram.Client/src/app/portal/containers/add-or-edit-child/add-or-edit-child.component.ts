import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Child } from '../../../core/models/Child';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-add-or-edit-child',
  standalone: true,
  imports: [MatNativeDateModule,MatDatepickerModule,CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule, MatIconModule,FormsModule],
  templateUrl: './add-or-edit-child.component.html',
  providers: [ 
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
 ],
  styleUrl: './add-or-edit-child.component.scss'
})
export class AddOrEditChildComponent implements OnInit{
  form!: FormGroup;
  child: Child |undefined;
  isEditMode: boolean = false;
  base64Image: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddOrEditChildComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    debugger;
    
  }
  ngOnInit(): void {
    debugger;
    this.child=this.data.child;
    if(this.child){
    this.isEditMode=true;
    }
    this.form = this.fb.group({
      name: [
        this.isEditMode ? this.data.child.name : '', 
        [Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/), Validators.required]
      ],
      address: [
        this.isEditMode ? this.data.child.address : '', 
        Validators.required
      ],
      nationality: [
        this.isEditMode ? this.data.child.nationality : '', 
        Validators.required
      ],
      language: [
        this.isEditMode ? this.data.child.language : '', 
        Validators.required
      ],
      dateOfBirth: [
        this.isEditMode ? this.data.child.dateOfBirth! : '', 
        Validators.required
      ],
      image: [
        this.isEditMode ? this.data.child.image : null
      ]
    });
    
    
    
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    debugger;
    if (this.form.valid) {
      this.form.value.image=this.base64Image;
      this.dialogRef.close(this.form.value);
    }
  }

  
}
