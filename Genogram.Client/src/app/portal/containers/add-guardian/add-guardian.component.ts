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
  imports: [CommonModule,ReactiveFormsModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatInputModule,MatSelectModule,MatCheckboxModule,MatButtonModule,MatIconModule],
  templateUrl: './add-guardian.component.html',
  styleUrl: './add-guardian.component.scss'
})
export class AddGuardianComponent implements OnInit {
  form!: FormGroup; 
  relationshipTypes: string[] = []; 
  isEditMode: boolean = false; 
  relationships:Relationship[]=[];

  constructor(
    public dialogRef: MatDialogRef<AddGuardianComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder
  ){
    debugger; 
    if (this.data && this.data.relationshipTypes) {
      this.relationshipTypes = this.data.relationshipTypes; 
    }
  }

  
  ngOnInit(): void {
    debugger;
    this.relationshipTypes = this.data.relationshipTypes;
    this.relationships=this.data.relationships;
    this.isEditMode = !!this.data.relationship; 

    this.form = this.fb.group({
      firstName: [this.isEditMode ? this.data.relationship.firstName : '', Validators.required],
      lastName: [this.isEditMode ? this.data.relationship.lastName : '', Validators.required],
      relationshipType: [this.isEditMode ? this.data.relationship.relationshipType : '', Validators.required],
      email: [this.isEditMode ? this.data.relationship.email : '', [Validators.required, Validators.email]],
      phoneNumber: [this.isEditMode ? this.data.relationship.phoneNumber : '', Validators.required],
      isPrimaryContact: [this.isEditMode ? this.data.relationship.isPrimaryContact : false],
      remarks: [this.isEditMode ? this.data.relationship.remarks : '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
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
    if (option === 'Grandparent' && 
        currentRelationships.filter(r => r.relationshipType === 'Grandparent').length >= 4) {
      return true;
    }
    return false; 
  }

}
