import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() propertySubmitted = new EventEmitter<Partial<Property>>();
  @Output() cancel = new EventEmitter<void>();

  propertyForm: FormGroup;
  imageFiles: File[] = [];

  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      type: ['for_rent', Validators.required],
      area: [null, [Validators.required, Validators.min(0)]],
      rooms: [null, [Validators.required, Validators.min(1)]],
      features: [[]],
      contact: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.imageFiles = Array.from(files);
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      const formValue = this.propertyForm.value;
      const propertyData: Partial<Property> = {
        ...formValue,
        status: 'pending',
        images: [] // This would be handled by file upload service in a real application
      };
      this.propertySubmitted.emit(propertyData);
      this.resetForm();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.resetForm();
  }

  resetForm() {
    this.propertyForm.reset({
      title: '',
      description: '',
      price: null,
      location: '',
      type: 'for_rent',
      area: null,
      rooms: null,
      features: [],
      contact: ''
    });
    this.imageFiles = [];
  }

  get title() { return this.propertyForm.get('title'); }
  get description() { return this.propertyForm.get('description'); }
  get price() { return this.propertyForm.get('price'); }
  get location() { return this.propertyForm.get('location'); }
  get type() { return this.propertyForm.get('type'); }
  get area() { return this.propertyForm.get('area'); }
  get rooms() { return this.propertyForm.get('rooms'); }
  get contact() { return this.propertyForm.get('contact'); }
}
