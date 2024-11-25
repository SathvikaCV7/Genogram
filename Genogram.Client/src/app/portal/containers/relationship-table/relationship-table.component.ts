import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-relationship-table',
  standalone: true,
  imports: [MatTableModule,MatCheckboxModule,MatButtonModule],
  templateUrl: './relationship-table.component.html',
  styleUrl: './relationship-table.component.scss'
})
export class RelationshipTableComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'relationship', 'phone', 'mail', 'mailContact', 'remarks'];
  dataSource = [
    { firstName: 'Anna', lastName: 'Hug-Meier', relationship: 'Mother', phone: '044 745 17 77', mail: 'anna.hug@mail.com', mailContact: true, remarks: '' },
    { firstName: 'Herbert', lastName: 'Hug', relationship: 'Father', phone: '044 745 17 77', mail: 'herbert.hug@mail.com', mailContact: false, remarks: '' },
    { firstName: 'Hilde', lastName: 'Meier', relationship: 'Grandmother', phone: '044 746 13 23', mail: '', mailContact: false, remarks: '' },
    { firstName: 'Petra', lastName: 'Sturzenegger', relationship: 'Kita Leiterin', phone: '044 747 18 28', mail: 'p.sturzenegger@kita.com', mailContact: false, remarks: '' },
    { firstName: 'Kevin', lastName: 'Hug', relationship: 'Brother', phone: '', mail: '', mailContact: false, remarks: '' }
  ];

  onAdd(): void {
    // Logic for "Add" button
    console.log("Add button clicked");
  }
  
  onGenogram(): void {
    // Logic for "Genogram" button
    console.log("Genogram button clicked");
  }
}
