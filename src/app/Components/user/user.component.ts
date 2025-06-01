import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastComponent } from '../toast/toast.component';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { RayahenService } from '../../Services/rayahen.service';

@Component({
  selector: 'app-user',
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      TranslateModule,
      ToastComponent,
      Select,
      InputTextModule,
      TextareaModule,
      FloatLabel
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  addusrForm: any;
toastMessage: any;
toastBgColor: any;
  @ViewChild('toastRef') toastComponent!: ToastComponent;
  roleOptions: any;

  constructor(
    private fb : FormBuilder,
    public translate : TranslateService,
    public rayahenService : RayahenService
  ){
    this.intializeObjects()
  }

  intializeObjects(){
 
    this.roleOptions = [
      { name: this.translate.instant('tickets.usrCard.admin'), id: 1 },
        { name: this.translate.instant('tickets.usrCard.usr'), id: 2 }
      
    ]
       this.addusrForm = this.fb.group({
        id: ['', [Validators.required]],
        email:['',[Validators.required]],
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
        branch: ['', [Validators.required]],
        department: ['', [Validators.required]],
        role: [''],
        roleFld: ['', [Validators.required]],

      })
  }


    ngOnInit(): void {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.roleOptions = [
       { name: this.translate.instant('tickets.usrCard.admin'), id: 1 },
        { name: this.translate.instant('tickets.usrCard.usr'), id: 2 }
      ];
          });
   
    }
 
      addUser(){
    if(!this.addusrForm.invalid){
      this.addusrForm.value.role = this.addusrForm.value.roleFld.id
      this.rayahenService.addUser(this.addusrForm.value ).subscribe({
      next:(res)=>{
        console.log(res)
          this.toastMessage = "Done"
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
      } ,
      error: (err) =>{
        console.log(err)
        this.toastMessage = err.error.message
        this.toastBgColor = 'bg-danger'
        this.toastComponent.show();
      },
      // })
    })
  }
}

}
