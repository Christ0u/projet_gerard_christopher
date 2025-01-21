import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  disableSubmitButton: Boolean = true;
  hideTable: Boolean = true;

  passwordIsValid: Boolean = false;
  phoneIsValid: Boolean = true;

  login: string = "";

  password: string = "";

  onSubmit() {
    if (this.login == "" || this.password == "") {
      alert("Tous les champs obligatoires (*) ne sont pas renseignés");
    }
    else {
      this.disableSubmitButton = !this.disableSubmitButton;
      this.hideTable = !this.hideTable;
    }
  }
}