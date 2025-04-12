import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() propertySubmitted = new EventEmitter<any>(); // Emit the new property when the form is submitted
  @Output() cancel = new EventEmitter<void>(); // Emit when the user cancels the form

  newProperty: any = {
    superficie: null,
    nombrePieces: null,
    localisation: '',
    prix: null,
    photos: [],
    description: '',
    contact: '',
    type: 'Location'
  };

  onFileChange(event: any) {
    const files = event.target.files;
    this.newProperty.photos = Array.from(files);
  }

  onSubmit() {
    const newProperty = { ...this.newProperty };
    this.propertySubmitted.emit(newProperty); // Emit the new property to the parent
    this.resetForm();
  }

  onCancel() {
    this.cancel.emit(); // Emit the cancel event to the parent
    this.resetForm();
  }

  resetForm() {
    this.newProperty = {
      superficie: null,
      nombrePieces: null,
      localisation: '',
      prix: null,
      photos: [],
      description: '',
      contact: '',
      type: 'Location'
    };
  }
}
