import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NameOf } from '../../../core/Utilities/name-of-helper';
import { Relationship } from '../../../core/models/Relationship';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddGuardianComponent } from '../add-guardian/add-guardian.component';
import { RelationshipTypes } from '../../../core/Enums/RelationshipTypes';
import { RelationshipService } from '../../../core/services/relationship.service';
import { ShowGenogramComponent } from '../show-genogram/show-genogram.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relationship-table',
  standalone: true,
  imports: [CommonModule,MatDialogModule, MatTableModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './relationship-table.component.html',
  styleUrl: './relationship-table.component.scss'
})
export class RelationshipTableComponent {
  constructor(public dialog: MatDialog) { }

  @Input() relationships: Relationship[] = [];
  @Input() childId: number|undefined;

  displayedColumns: string[] = NameOf.those<Relationship>(['actions','firstName', 'lastName', 'relationshipType', 'phoneNumber', 'email', 'isPrimaryContact', 'remarks']);
  
  relationshipService=inject(RelationshipService);
  id:number|undefined;
  dataSource: Relationship[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['relationships']) {
      this.dataSource = this.relationships || [];
    }

  }
  onAdd(): void {
    const dialogRef = this.dialog.open(AddGuardianComponent, {
      width: '600px',
      data:
      {
      relationships: this.relationships,
      relationshipTypes: Object.values(RelationshipTypes) } 
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        debugger;
        if (result.isPrimaryContact) {
          this.dataSource = this.dataSource.map(rel =>
            rel.id === result.id ? result : { ...rel, isPrimaryContact: false }
          );
        }
        result.childId=this.childId;
        this.relationshipService.addRelationship(result).subscribe((response)=>{
          console.log(response);
        });
        debugger;
        this.dataSource = [...this.dataSource, result]; 
      }
    });
  }

  onEdit(relationship: Relationship): void {
    const originalData = { ...relationship }; 
    this.id=relationship.id;
    const dialogRef = this.dialog.open(AddGuardianComponent, {
      width: '600px',
      data: {
        relationship: relationship, 
        relationshipTypes: Object.values(RelationshipTypes),
        relationships: this.relationships
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const fieldsToCompare: (keyof Relationship)[] = [
          'firstName',
          'lastName',
          'relationshipType',
          'isPrimaryContact',
          'email',
          'phoneNumber'
        ];
        const isChanged = fieldsToCompare.some(key => originalData[key] !== result[key]);
          debugger;   
        if (isChanged) {
          if (result.isPrimaryContact) {
            this.dataSource = this.dataSource.map(rel =>
              rel.id === result.id ? result : { ...rel, isPrimaryContact: false }
            );
          }
          result.id = this.id;
          result.childId=this.childId;
          this.relationshipService.updateRelationship(result).subscribe((response) => {
            console.log(response);
            const index = this.dataSource.findIndex(item => item.id === result.id);
            if (index !== -1) {
              this.dataSource[index] = result;
              this.dataSource = [...this.dataSource];
            }
          });
        } else {
          console.log('No changes detected, skipping API call.');
        }
      }
    });
  }

 onGenogram(): void {
  const dialogRef = this.dialog.open(ShowGenogramComponent, {
    width: '850px',
    height: '600px', 
    data: {
      relationships: this.relationships, 
      childId: this.childId
    }
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('Genogram dialog closed', result);
  });
}

  
}
