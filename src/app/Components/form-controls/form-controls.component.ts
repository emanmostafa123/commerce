import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RayahenService } from '../../Services/rayahen.service';
import { ToastComponent } from '../toast/toast.component';
import { General } from '../../shared/general';
import { FloatLabel } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { UserData } from '../../shared/userData';
interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
  selector: 'app-form-controls',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    ToastComponent,
    Select,
    InputTextModule,
    FileUploadModule,
    TextareaModule,
    FloatLabel
  ],
  templateUrl: './form-controls.component.html',
  styleUrl: './form-controls.component.scss',
  providers: [MessageService]
})

export class FormControlsComponent implements OnInit {
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
  uploadedFiles: any[] = [];
  files: File[] | undefined;
  selectedFileName: any;

  constructor(
    private route: ActivatedRoute,
    public translate : TranslateService,
    public rayahenService : RayahenService,
    public general : General,
    public fb : FormBuilder,
    public messageService : MessageService,
    public usrData: UserData,
    public router: Router
  ){
    debugger
    this.ticketId = this.route.snapshot.paramMap.get('id');
    if(!this.ticketId){
      this.addMode = true
    }else{
      if(localStorage.getItem('ticketUpd') != null || localStorage.getItem('ticketUpd') != undefined){
        const ticket =  Object.entries(JSON.parse(localStorage.getItem('ticketUpd') || '{}'))
        ticket.forEach((element:any)=>{
          let control = element[0]
          let val = element[1]
          this.general.updTcktForm.controls[control].setValue(val)
        })
        this.updMode = true
      }else{
        this.router.navigate(['/tickets'])
      }
    }
    this.intializeObjects()
  }
  intializeObjects(){
    this.prtyOptions = [
        { name: this.translate.instant('tickets.tcktsCrd.high'), id:  1 },
        { name: this.translate.instant('tickets.tcktsCrd.medium'), id: 2 },
        { name: this.translate.instant('tickets.tcktsCrd.low'), id: 3 }
      ];
    this.addTcktForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: [''],
      PriorityFld: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
      createdByUser :['', [Validators.required]],
      TypeOfIssueFld:['', [Validators.required]],
      typeOfIssueId:[''],
      // TypeOfIssue:[''],
      // Image: [''],
      // CreatedOn:[''],
      readFlg : ['']

    })  
    console.log(this.general.updTcktForm)
  }

  ngOnInit(){
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.prtyOptions = [
        { name: this.translate.instant('tickets.tcktsCrd.high'), id: 1 },
        { name: this.translate.instant('tickets.tcktsCrd.medium'), id: 2 },
        { name: this.translate.instant('tickets.tcktsCrd.low'), id: 3 }
      ];
    });
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
    
  getDate(){
    const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, '0');

   this.addTcktForm.value.CreatedOn = `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;

  }
  addTckt(){
    this.addTcktForm.value.createdByUser = this.usrData.userData.UserId;
    this.addTcktForm.value.isActive = true;
    this.addTcktForm.value.readFlg = true;
    // this.getDate()
    debugger
    this.addTcktForm.value.typeOfIssueId = this.addTcktForm.value.TypeOfIssueFld.id
    // this.addTcktForm.value.TypeOfIssue = this.addTcktForm.value.TypeOfIssueFld.name
    this.addTcktForm.value.priority = this.addTcktForm.value.PriorityFld.id

    // if(!this.addTcktForm.invalid){
    // this.allIssues.forEach((issue:any)=>{
    //   if(this.addTcktForm.value.typeOfIssue == issue.name) this.addTcktForm.value.typeOfIssueId = issue.id
    // })
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
      this.rayahenService.addTickt(this.addTcktForm.value).subscribe((res)=>{
        if(res.status == 200 ){
          // this.uploadImage()
          this.toastMessage = res.body.message
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          // this.getAllTickets()
          setTimeout(() => {
            this.upload(res.body.id)
            this.router.navigate(['/tickets'])
          },1000)
        }
      })

  }

  upload(id: any){
    const formData = new FormData();
    formData.append('Id', id);
    formData.append('Image', this.selectedFile);
    if (this.selectedFile != null || this.selectedFile != undefined) {
      this.rayahenService.uploadImg(formData).subscribe({
        next: (res: any) => {

        },
        error: (err: any) => {
          console.log(err)
          this.toastMessage = err.message
          this.toastBgColor = 'bg-danger'
          this.toastComponent.show();
        }
      })
    }
  }
  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFileName = input.files[0].name;
    this.selectedFile = input.files[0];
    const file = input.files[0];
  }
}



  submitUpdTicket(){
    this.rayahenService.updTicket(this.general.updTcktForm.value,this.general.updTcktForm.value.id).subscribe({
      next:(res)=>{
        this.upload(this.general.updTcktForm.value.id)
        this.toastMessage = 'Done'
        this.toastBgColor = 'bg-success'
        this.toastComponent.show();
          setTimeout(() => {
            this.router.navigate(['/tickets'])
          },1000)
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
