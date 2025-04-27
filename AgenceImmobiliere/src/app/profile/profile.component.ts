import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {
   
    email: '',
    password: '',
    
  };

  constructor(private location: Location) {}

  ngOnInit() {
    // Charger les données du profil
  }

  onSubmit() {
    // Sauvegarder les modifications du profil
  }

  goBack() {
    this.location.back();
  }
}
