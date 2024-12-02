import { Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { RemarksDialogComponent } from '../remarks-dialog/remarks-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-relationship-table',
  standalone: true,
  imports: [MatMenuModule, CommonModule, MatDialogModule, MatTableModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './relationship-table.component.html',
  styleUrl: './relationship-table.component.scss'
})
export class RelationshipTableComponent {
  constructor(public dialog: MatDialog, private toastr: ToastrService) { }

  @Input() relationships: Relationship[] = [];
  @Input() childId: number | undefined;
  @Input() childName:string|undefined;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = NameOf.those<Relationship>(['actions', 'firstName', 'lastName', 'relationshipType', 'phoneNumber', 'email', 'isPrimaryContact', 'remarks']);

  relationshipService = inject(RelationshipService);
  id: number | undefined;
  dataSource: Relationship[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['relationships']) {
      this.dataSource = this.relationships || [];
    }
  }

  onAdd(): void {
    if (this.childId != undefined) {
      const dialogRef = this.dialog.open(AddGuardianComponent, {
        width: '600px',
        data: {
          relationships: this.relationships,
          relationshipTypes: Object.values(RelationshipTypes)
        }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if (result.isPrimaryContact) {
            this.dataSource = this.dataSource.map(rel =>
              rel.id === result.id
                ? { ...rel, ...result }
                : { ...rel, isPrimaryContact: false }
            );
          }
          result.childId = this.childId;
          this.relationshipService.addRelationship(result).subscribe(() => {
            this.dataSource = [...this.dataSource, result];
            this.toastr.success("Relation Added Successfully");
            setTimeout(() => {
              location.reload(); 
            }, 2000);
          });
        }
      });
    }
  }
  

  onEdit(relationship: Relationship): void {
    debugger;
    const originalData = { ...relationship };
    this.id = relationship.id;
    const dialogRef = this.dialog.open(AddGuardianComponent, {
      width: '600px',
      data: {
        relationship: relationship,
        relationshipTypes: Object.values(RelationshipTypes),
        relationships: this.relationships
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      debugger;
      if (result) {
       
        const fieldsToCompare: (keyof Relationship)[] = [
          'firstName',
          'lastName',
          'relationshipType',
          'isPrimaryContact',
          'email',
          'phoneNumber',
          'remarks'
        ];
        const isChanged = fieldsToCompare.some(key => originalData[key] !== result[key]);
        debugger;
        if (isChanged) {
          if (result.isPrimaryContact) {
            this.dataSource = this.dataSource.map(rel =>
              rel.id === result.id
                ? { ...rel, ...result } 
                : { ...rel, isPrimaryContact: false }
            );
          }
          result.id = this.id;
          result.childId = this.childId;
          this.relationshipService.updateRelationship(result).subscribe((response) => {
            const index = this.dataSource.findIndex(item => item.id === result.id);
            if (index !== -1) {
              this.dataSource[index] = result;
              this.dataSource = [...this.dataSource];
              this.toastr.success("Relation Updated Successfully")
              setTimeout(() => {
                location.reload(); 
              }, 2000);
            }
          });
        } else {
          console.log('No changes detected, skipping API call.');
        }
      }
    });
  }

  onGenogram(): void {
    if (this.childId != undefined) {
      const dialogRef = this.dialog.open(ShowGenogramComponent, {
        width: '850px',
        height: '600px',
        data: {
          relationships:this.dataSource,
          childId: this.childId,
          childName:this.childName
        }

      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('Genogram dialog closed', result);
      });
    }
  }

  onDelete(relationship:Relationship) {
    
    const id=this.getIdByName(relationship);
    
    debugger;
    console.log(id);
    this.relationshipService.deleteRelationship(id).subscribe((res) => {
      debugger;
      this.dataSource = this.dataSource.filter((item) => item.id !== id);
      this.dataSource = [...this.dataSource];
      this.toastr.success("Relation Deleted Successfully");
      setTimeout(() => {
        location.reload(); // Reload the page after 2 seconds
      }, 2000);
    }
    )
  }

  onRemarks(element: any): void {
    this.dialog.open(RemarksDialogComponent, {
      data: { remarks: element.remarks },
      width: '400px', 
      height:'150px'
    });
  }

  getIdByName(relationship: Relationship): number | undefined {
    const foundRelationship = this.dataSource.find(
      rel =>
        rel.firstName === relationship.firstName &&
        rel.lastName === relationship.lastName &&
        rel.relationshipType === relationship.relationshipType &&
        rel.phoneNumber === relationship.phoneNumber &&
        rel.email === relationship.email
    );
    return foundRelationship ? foundRelationship.id : undefined;
  }
  

}
