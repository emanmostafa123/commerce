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
import { ActivatedRoute, Router } from '@angular/router';
import { General } from '../../shared/general';

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
  userId: string | null;
  addMode: boolean | undefined;
  updMode: boolean | undefined;
  updusrForm: any;

  constructor(
    private fb : FormBuilder,
    public translate : TranslateService,
    public rayahenService : RayahenService,
    public router : Router,
     private route: ActivatedRoute,
    public general : General
  ){
      this.userId = this.route.snapshot.paramMap.get('id');
      this.intializeObjects()
    if(!this.userId){
      this.addMode = true
    }else{
      if(localStorage.getItem('userUpd') != null || localStorage.getItem('userUpd') != undefined){
        const user =  Object.entries(JSON.parse(localStorage.getItem('userUpd') || '{}'))
        user.forEach((element:any)=>{
          let control = element[0]
          let val = element[1]
          if(control == 'role'){
            const selectedRole = this.roleOptions.find((role: { name: any; }) => role.name === val);
            this.updusrForm.controls['roleFld'].setValue(selectedRole);

          }
          if(this.updusrForm.controls[control] != undefined)
            this.updusrForm.controls[control].setValue(val)
        })
        this.updMode = true
      }else{
        this.router.navigate(['/users'])
      }
  }
}

  intializeObjects() {

    this.roleOptions = [
      { name: this.translate.instant('tickets.usrCard.admin'), id: 1 },
      { name: this.translate.instant('tickets.usrCard.usr'), id: 2 }

    ]
    this.addusrForm = this.fb.group({
      id: ['', [Validators.required]],
      email: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      department: ['', [Validators.required]],
      role: [''],
      roleFld: ['', [Validators.required]],
      isActive: ['']
    })
    this.updusrForm = this.fb.group({
      id: ['', [Validators.required]],
      password: [''],
      branch: ['', [Validators.required]],
      department: ['', [Validators.required]],
      role: [''],
      roleFld: ['', [Validators.required]],
      isActive: ['']
    })
  }

  returnToUsers(){
    this.router.navigate(['/users']);
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
      this.addusrForm.value.isActive =  true
      this.rayahenService.addUser(this.addusrForm.value ).subscribe({
      next:(res)=>{
        console.log(res)
          this.toastMessage = "Done"
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
           setTimeout(() => {
            this.router.navigate(['/users']);
          },1000)
          
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

   updUser(){
    if(!this.updusrForm.invalid){
      this.updusrForm.value.role = this.updusrForm.value.roleFld.id
      this.updusrForm.value.isActive =  true
      this.rayahenService.updUser(this.updusrForm.value ).subscribe({
      next:(res)=>{
        console.log(res)
          this.toastMessage = "Done"
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 1000)
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
