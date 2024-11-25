import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { ChildDetailsComponent } from "./portal/containers/child-details/child-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule, ChildDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Genogram';
}
