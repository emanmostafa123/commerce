import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeclarationHelper } from '../../shared/DeclarationHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm : any
  constructor(
    public fb : FormBuilder,
    public router : Router
  ) { 
    if(localStorage.getItem("token") != null) this.router.navigate(['/dashboard'])
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usrNm: ['', [Validators.required, Validators.minLength(4)]],
      usrPss: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  login(){
    if(!this.loginForm.invalid){
      console.log(this.loginForm.invalid)
      localStorage.setItem('token','dfghjklsdfghsdfghjertyuugfdsxcftgvxertygdfffdsdrfvygvcdexartyfdxs') 
      this.router.navigate(['/dashboard'])
    }
  }
}
