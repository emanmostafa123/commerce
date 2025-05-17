import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { General } from '../../shared/general';
import { RayahenService } from '../../Services/rayahen.service';
import Swal from 'sweetalert2';
import { TranslateService , TranslateModule} from '@ngx-translate/core';
import { ToastComponent } from '../toast/toast.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-issues',
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent
  ],
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.scss'
})
export class IssuesComponent {
  allIssues:any
  toastMessage: any;
  toastBgColor: any;
    @ViewChild('toastRef') toastComponent!: ToastComponent;
  addIssueForm:any;
  updIssueForm:any;
  issueID:any;
  issueNm:any
  constructor(
    public general: General,
    public rayahenService : RayahenService,
    public translate : TranslateService,
    public fb : FormBuilder,
    private title : Title
  ){
    this.title.setTitle('Rayahen | Issues');
    this.general.openNavElmnt('issues')
    this.getAllIssues()
  }
    ngOnInit(){
       this.addIssueForm = this.fb.group({
      name : ['']
    })
    this.updIssueForm = this.fb.group({
      name : [''],
      id : ['']
    })
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
   openIssue(issueId : any, issueNm:any){
    this.issueID = issueId
    this.issueNm = issueNm
    this.general.openModal('updIssueModal')
  }
  updateIssue( ){
    this.updIssueForm.value.id = this.issueID
    this.rayahenService.updIssue(this.updIssueForm.value).subscribe((res)=>{
      this.toastMessage = res.body.message
      this.toastBgColor = 'bg-success'
      this.toastComponent.show();
      this. getAllIssues()
      this.general.closeModal('updIssueModal')
    })
  }
  deleteIssue(issueId : any, issueNm:any){
    Swal.fire({
      title: this.translate.instant('fire.issue.title'),
      text: this.translate.instant('fire.issue.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('fire.issue.confirmButtonText'),
      cancelButtonText: this.translate.instant('fire.issue.cancelButtonText'),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rayahenService.deleteIssue(issueId).subscribe({
          next: (res) => {
            this.toastMessage = res.body.message;
            this.toastBgColor = 'bg-success';
            this.toastComponent.show();
            this.getAllIssues();
          },
          error: (err) => {
            if (err.status === 400) {
              this.toastMessage = err.error.message
            } else if (err.status === 500) {
              this.toastMessage = 'Server Error: Please try again later.';
            } else {
              this.toastMessage = 'An unexpected error occurred.';
            }
            this.toastBgColor = 'bg-warning';
            this.toastComponent.show();
          }
        });
        
      }
    });

  }
    addNewIssue(){
      this.rayahenService.addIssue(this.addIssueForm.value).subscribe((res)=>{
        if(res.status == 201 ){
          this.toastMessage = res.body.message
          this.toastBgColor = 'bg-success'
          this.toastComponent.show();
          this. getAllIssues()
          this.general.closeModal('addIssueModal')
        }
      })
    // }
  }
}
