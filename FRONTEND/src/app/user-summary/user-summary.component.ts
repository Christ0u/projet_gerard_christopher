import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../services/user-auth.service';
import { Users } from '../models/users.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-summary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css']
})
export class UserSummaryComponent implements OnInit {
  userForm: FormGroup;
  currentUser: Users | null = null;

  constructor(private fb: FormBuilder, private userAuthService: UserAuthService) {
    this.userForm = this.fb.group({
      civility: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      login: [''],
      address: [''],
      zipCode: [''],
      city: [''],
      country: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      if (this.currentUser) {
        this.userForm.patchValue(this.currentUser);
      }
    }
  }
  
  // onSubmit() {
  //   if (this.userForm.valid) {
  //     this.userAuthService.updateUser(this.userForm.value).subscribe(
  //       (response: any) => {
  //         console.log('User updated successfully:', response);
  //         alert('Informations mises à jour avec succès.');
  //       },
  //       (error: any) => {
  //         console.error('Error updating user:', error);
  //         alert('Erreur lors de la mise à jour des informations.');
  //       }
  //     );
  //   } else {
  //     alert("Certains champs sont invalides ou non renseignés.");
  //   }
  // }
}