import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

import { Users } from '../models/users.model'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hideTable: boolean = true;
  hideForm: boolean = false;

  user: Users;

  constructor(private fb: FormBuilder, private userAuthService: UserAuthService, private router: Router) { // Injection du service
    this.registerForm = this.fb.group({
      civility: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      address: [''],
      zipCode: [null],
      city: [''],
      country: [''],
      phone: ['', Validators.pattern(/^(\+\d{1,3}|0)[1-9](\s?\d{2}){4}$/)],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordValidation: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.user = {
      civility: '',
      firstName: '',
      lastName: '',
      email: '',
      login: '',
      address: '',
      zipCode: 0,
      city: '',
      country: '',
      phone: '',
      password: '',
      passwordValidation: ''
    };
  }

  ngOnInit(): void {}

  private passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const passwordValidation = group.get('passwordValidation')?.value;
    return password === passwordValidation ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.user = { ...this.registerForm.value };
      console.log('Données envoyées:', this.user);

      this.userAuthService.register(this.user).subscribe(
        (response: any) => {
          console.log('Utilisateur enregistré:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement:', error);
        }
      );
    } else {
      alert("Certains champs sont invalides ou non renseignés.");
    }
  }
}