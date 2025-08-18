import { MatDialogModule } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataModel } from '../../../domain/models/dataDialog.model';

@Component({
  selector: 'app-dialog-elements',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-elements.html',
  styleUrl: './dialog-elements.scss',
})
export class DialogElements {
  data = inject<DialogDataModel>(MAT_DIALOG_DATA);
}
