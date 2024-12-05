import { Component, inject, Input, SimpleChanges, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-relationship-table',
  standalone: true,
  imports: [
    MatMenuModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './relationship-table.component.html',
  styleUrl: './relationship-table.component.scss',
})
export class RelationshipTableComponent implements OnInit {
  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  @Input() relationships: Relationship[] = [];
  @Input() childId: number | undefined;
  @Input() childName: string | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = NameOf.those<Relationship>([
    'actions',
    'firstName',
    'lastName',
    'relationshipType',
    'phoneNumber',
    'email',
    'isPrimaryContact',
    'remarks',
  ]);

  relationshipService = inject(RelationshipService);
  id: number | undefined;
  dataSource = new MatTableDataSource<Relationship>();

  ngOnInit(): void {
    this.dataSource.data = this.relationships;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['relationships']) {
      this.dataSource.data = this.relationships || [];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAdd(): void {
    if (this.childId != undefined) {
      const dialogRef = this.dialog.open(AddGuardianComponent, {
        width: '600px',
        data: {
          relationships: this.relationships,
          relationshipTypes: Object.values(RelationshipTypes),
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if (result.isPrimaryContact) {
            this.dataSource.data = this.dataSource.data.map((rel) =>
              rel.id === result.id
                ? { ...rel, ...result }
                : { ...rel, isPrimaryContact: false }
            );
          }
          result.childId = this.childId;
          this.relationshipService.addRelationship(result).subscribe(() => {
            this.dataSource.data = [...this.dataSource.data, result];
            this.toastr.success('Relation Added Successfully');
            setTimeout(() => {
              location.reload();
            }, 2000);
          });
        }
      });
    }
  }

  onEdit(relationship: Relationship): void {
    const originalData = { ...relationship };
    this.id = relationship.id;
    const dialogRef = this.dialog.open(AddGuardianComponent, {
      width: '600px',
      data: {
        relationship: relationship,
        relationshipTypes: Object.values(RelationshipTypes),
        relationships: this.relationships,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const fieldsToCompare: (keyof Relationship)[] = [
          'firstName',
          'lastName',
          'relationshipType',
          'isPrimaryContact',
          'email',
          'phoneNumber',
          'remarks',
        ];
        const isChanged = fieldsToCompare.some(
          (key) => originalData[key] !== result[key]
        );
        if (isChanged) {
          if (result.isPrimaryContact) {
            this.dataSource.data = this.dataSource.data.map((rel) =>
              rel.id === result.id
                ? { ...rel, ...result }
                : { ...rel, isPrimaryContact: false }
            );
          }
          result.id = this.id;
          result.childId = this.childId;
          this.relationshipService.updateRelationship(result).subscribe(() => {
            const index = this.dataSource.data.findIndex(
              (item) => item.id === result.id
            );
            if (index !== -1) {
              this.dataSource.data[index] = result;
              this.dataSource.data = [...this.dataSource.data];
              this.toastr.success('Relation Updated Successfully');
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
      this.dialog.open(ShowGenogramComponent, {
        width: '850px',
        height: '590px',
        data: {
          relationships: this.dataSource.data,
          childId: this.childId,
          childName: this.childName,
        },
      });
    }
  }

  onDelete(relationship: Relationship): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const id = this.getIdByName(relationship);
        if (id !== undefined) {
          this.relationshipService.deleteRelationship(id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (item) => item.id !== id
            );
            this.toastr.success('Relation Deleted Successfully');
          });
        }
      }
    });
  }

  onRemarks(element: any): void {
    this.dialog.open(RemarksDialogComponent, {
      data: { remarks: element.remarks },
      width: '400px',
      height: '150px',
    });
  }

  getIdByName(relationship: Relationship): number | undefined {
    const foundRelationship = this.dataSource.data.find(
      (rel) =>
        rel.firstName === relationship.firstName &&
        rel.lastName === relationship.lastName &&
        rel.relationshipType === relationship.relationshipType &&
        rel.phoneNumber === relationship.phoneNumber &&
        rel.email === relationship.email
    );
    return foundRelationship ? foundRelationship.id : undefined;
  }
}
