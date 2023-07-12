import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationMessages = {
    email: [
      { type: "required", message: "El mensaje es obligatorio" },
      { type: "pattern", message: "Debe de tener un email valido" },
    ]
  }
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9.-]+$")
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6)
          ])
        )
      }
    );
  }

  ngOnInit() {
  }

}
