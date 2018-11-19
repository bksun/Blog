import { Component, OnInit } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onLogin( loginForm: NgForm) {

    if (loginForm.invalid) {
      return;
    }
    console.log(loginForm.value);
     loginForm.resetForm();
    }

}
