import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

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

  constructor(private fb: FormBuilder) {
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
  }

  ngOnInit(): void {}

  // Custom validator for matching passwords
  private passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const passwordValidation = group.get('passwordValidation')?.value;
    return password === passwordValidation ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.hideTable = !this.hideTable;
      this.hideForm = !this.hideForm;
    } else {
      alert("Certains champs sont invalides ou non renseignés.");
    }
  }
}
