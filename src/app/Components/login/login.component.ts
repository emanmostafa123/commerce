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
      // this.rayahenService.login(this.loginForm.value).subscribe((res)=>{
      //   debugger
        localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IkFtaXJhIiwiVXNlcklkIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzQxMTc3MDI2LCJpc3MiOiJUaWNrZXRTeXN0ZW1BUEkiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjAyIn0.j4W_cTfl2loJ2I1SrIlwe8MmxOVk79GT6SbyZY5fSYM') 
        this.router.navigate(['/dashboard'])
      // })
    }
  }
}
