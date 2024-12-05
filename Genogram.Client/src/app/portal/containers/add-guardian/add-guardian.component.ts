import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { Relationship } from '../../../core/models/Relationship';

@Component({
  selector: 'app-add-guardian',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './add-guardian.component.html',
  styleUrl: './add-guardian.component.scss'
})
export class AddGuardianComponent implements OnInit {
  form!: FormGroup;
  relationshipTypes: string[] = [];
  isEditMode: boolean = false;
  relationships: Relationship[] = [];
  relationship?:Relationship;

  constructor(
    public dialogRef: MatDialogRef<AddGuardianComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
   
    if (this.data && this.data.relationshipTypes) {
      this.relationshipTypes = this.data.relationshipTypes;
    }
  }

  ngOnInit(): void {
    
    this.relationshipTypes = this.data.relationshipTypes;
    this.relationships = this.data.relationships;
    this.relationship=this.data.relationship;
    this.isEditMode = !!this.data.relationship;

    this.form = this.fb.group({
      firstName: [this.isEditMode ? this.data.relationship.firstName : '', [Validators.minLength(3),Validators.pattern(/^[A-Za-z\s]+$/), Validators.required]],
      lastName: [this.isEditMode ? this.data.relationship.lastName : '', Validators.required],
      relationshipType: [this.isEditMode ? this.data.relationship.relationshipType : '', Validators.required],
      email: [this.isEditMode ? this.data.relationship.email : '', [Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]+/)]],
      phoneNumber: [this.isEditMode ? this.data.relationship.phoneNumber : '',[Validators.required ,Validators.pattern(/^[0-9]{10}$/)]],
      isPrimaryContact: [this.isEditMode ? this.data.relationship.isPrimaryContact : false],
      remarks: [this.isEditMode ? this.data.relationship.remarks : '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  isOptionDisabled(option: string): boolean {
    const currentRelationships = this.relationships;
  
    if ((option === 'Mother' || option === 'Father') &&
      currentRelationships.some(r => r.relationshipType === option)) {
      return true;
    }
  
    if (option === 'Grandfather' &&
      currentRelationships.filter(r => r.relationshipType === 'Grandfather').length >= 2) {
      return true;
    }
  
    if (option === 'Grandmother' &&
      currentRelationships.filter(r => r.relationshipType === 'Grandmother').length >= 2) {
      return true;
    }
    return false;
  }
  

}
