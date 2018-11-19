import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authServ: AuthServiceService) { }

  ngOnInit() {
  }

  onSignup( signupForm: NgForm) {
    if (signupForm.invalid) {
      return;
    }

      this.authServ.createUser(signupForm.value.email, signupForm.value.password);
      console.log(signupForm.value);
      signupForm.resetForm();
    }
}
