import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: [''], // Prénom
      lastName: [''], // Nom
      email: ['', [Validators.required, Validators.email]], // E-mail (required)
      interest: ['Achat'], // Intéressé.e par (default to Achat)
      message: [''] // Message
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      this.contactForm.reset({ interest: 'Achat' }); // Reset form, keeping default interest
    }
  }
}