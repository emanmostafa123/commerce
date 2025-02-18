import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeclarationHelper } from '../../shared/DeclarationHelper';
import { Router } from '@angular/router';
import { RayahenService } from '../../Services/rayahen.service';

@Component({
  selector: 'app-login',
  standalone: true,
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
    public router : Router,
    public rayahenService : RayahenService
  ) { 
    if(localStorage.getItem("token") != null) this.router.navigate(['/dashboard'])
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  // P@ssword123
  login(){
    if(!this.loginForm.invalid){
      this.rayahenService.login(this.loginForm.value).subscribe((res)=>{
        debugger
        console.log(res)
        localStorage.setItem('token',res.body.data.token) 
        this.router.navigate(['/dashboard'])
      })
    }
  }
}
