import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RayahenService } from '../../Services/rayahen.service';
import { ToastComponent } from '../toast/toast.component';
import { General } from '../../shared/general';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-form-controls',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    ToastComponent,
    DropdownModule
  ],
  templateUrl: './form-controls.component.html',
  styleUrl: './form-controls.component.scss'
})
export class FormControlsComponent {
  ticketId: any;
  addMode: boolean = false;
  updMode: boolean = false;
  addTcktForm : any;
  allIssues: any;
  toastMessage: any;
  toastBgColor: any;
  @ViewChild('toastRef') toastComponent!: ToastComponent;
  selectedFile: any;
  prtyOptions:any
  
  constructor(
    private route: ActivatedRoute,
    public translate : TranslateService,
    public rayahenService : RayahenService,
    public general : General,
    public fb : FormBuilder
  ){
    debugger
    this.ticketId = this.route.snapshot.paramMap.get('id');
    if(!this.ticketId){
      this.addMode = true
    }else{
      this.updMode = true
    }
  }

  ngOnInit(){
    this.prtyOptions = [
      { name: this.translate.instant('tickets.tcktsCrd.high'), code: '1' },
      { name: this.translate.instant('tickets.tcktsCrd.medium'), code: '2' },
      { name: this.translate.instant('tickets.tcktsCrd.low'), code: '3' }
    ];
    this.addTcktForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
      createdByUser :['', [Validators.required]],
      typeOfIssue:['', [Validators.required]],
      typeOfIssueId:['', [Validators.required]],
      image: [''],
    })  
    this.general.updTcktForm = this.fb.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
      createdByUser :['', [Validators.required]],
      typeOfIssue:['', [Validators.required]],
      typeOfIssueId:['', [Validators.required]],
      imageUrl:[''],
      userNameCreated:[''],
      createdOn:[''],
      readFlg:['']
    })
    this.getAllIssues()
  }

   getAllIssues(){
    this.rayahenService.getallIssues().subscribe({
      next:(res: any)=>{
      this.allIssues = res.body
    },
    error:(err)=>{

    }
    })
  }
    
  addTckt(){
    this.addTcktForm.value.createdByUser = this.general.userData.UserId;
    this.addTcktForm.value.isActive = true;
    debugger
    // if(!this.addTcktForm.invalid){
    this.allIssues.forEach((issue:any)=>{
      if(this.addTcktForm.value.typeOfIssue == issue.name) this.addTcktForm.value.typeOfIssueId = issue.id
    })
    debugger
    const formData = new FormData();
    Object.entries(this.addTcktForm.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString()); 
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    } else {
      console.warn('No file selected'); 
    }

    // this.addTcktForm.value.image =  formData
      this.rayahenService.addTickt(formData).subscribe((res)=>{
        if(res.status == 200 ){
          // this.uploadImage()
          this.toastMessage = res.body.message
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          // this.getAllTickets()
          // this.general.closeModal('addTcktModal')
        }
      })

  }
   onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  
  

  submitUpdTicket(){
    this.rayahenService.updTicket(this.general.updTcktForm.value,this.general.updTcktForm.value.id).subscribe({
      next:(res)=>{
        console.log(res)
        // this.getAllTickets()
        this.toastMessage = 'Done'
        this.toastBgColor = 'bg-success'
        this.toastComponent.show();
        // this.general.closeModal('updTcktModal')
      },
      error:(err)=>{
        console.log(err)
        this.toastMessage = err.message
        this.toastBgColor = 'bg-danger'
        this.toastComponent.show();
      }
    })

  }
  
}
