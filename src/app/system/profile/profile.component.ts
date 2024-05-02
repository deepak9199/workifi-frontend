import { Component } from '@angular/core';
import { award, education, profile, work_experience } from '../../model/profile';
import { CollectionService } from '../../shared/_service/collection.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/_service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  loading: boolean = false
  skills: string = ''
  work_experiance: work_experience = {
    company_name: '',
    project_name: '',
    description: '',
    from: null,
    to: null
  }
  education: education = {
    collage: '',
    certificate_name: '',
    description: '',
    from: null,
    to: null
  }
  awads: award = {
    company_name: '',
    project_name: '',
    description: '',
    from: null,
    to: null
  }
  formProfile: profile = {
    uid: '',
    created_date_time: '',
    image: '',
    username: '',
    email: '',
    phone: 0,
    tagline: '',
    hourly_rate: '',
    gender: '',
    specialization: '',
    type: '',
    country: '',
    city: '',
    language: '',
    language_level: '',
    introduce_yourself: '',
    skil: [],
    education: [],
    work_experience: [],
    award: [],
    points: 0,
    updated_date_time: '',
    proposals: []
  }
  fromchangepass = {
    old: '',
    new: '',
    confrom: ''
  }
  private profileid: string = ''
  skilList: string[] = []
  educationlist: education[] = []
  work_experience_list: work_experience[] = []
  awadsList: award[] = []
  uploadProgress: number = 0
  constructor(
    private collectionservice: CollectionService,
    private toster: ToastrService,
    private token: TokenStorageService,
    private route: Router,
    private auth: AuthService,

  ) { }

  ngOnInit() {
    if (this.ValidatorChecker(this.token.getUser())) {
      this.formProfile.email = this.token.getUser().userCredential.user.email
      this.getprofileapi()
    }
    else {
      this.route.navigate(['/'])
    }
  }
  private ValidatorChecker(data: any) {
    if (typeof data === "undefined" || data === null || data === '') {
      return false
    }
    else {
      return true
    }
  }
  saveUser() {
    this.save()
  }
  saveskill() {
    this.skilList.push(this.skills)
  }
  saveeducation() {
    this.educationlist.push(this.education)
    console.log(this.educationlist)
  }
  saveworkexp() {
    this.work_experience_list.push(this.work_experiance)
  }
  saveawds() {
    this.awadsList.push(this.awads)
  }
  changepassword() {
    this.changePasswordapi(this.fromchangepass.old, this.fromchangepass.new, this.fromchangepass.confrom)
  }
  save() {
    if (this.profileid === '') {
      this.savedata()
    }
    else {
      this.updatedata(this.profileid)
    }
  }
  savedata() {
    this.formProfile.uid = this.token.getUser().uid
    this.formProfile.points = 1500
    this.formProfile.created_date_time = (new Date()).toString()
    this.formProfile.updated_date_time = (new Date()).toString()
    this.formProfile.education = this.educationlist
    this.formProfile.skil = this.skilList
    this.formProfile.work_experience = this.work_experience_list
    this.formProfile.award = this.awadsList
    console.log('created')
    this.saveprofileapi(this.formProfile)
  }
  updatedata(id: string) {
    this.formProfile.updated_date_time = (new Date()).toString()
    this.formProfile.education = this.educationlist
    this.formProfile.skil = this.skilList
    this.formProfile.work_experience = this.work_experience_list
    this.formProfile.award = this.awadsList
    console.log('Updated')
    this.updateprofileapi(this.formProfile, id)
  }
  deletedata(type: string, index: number) {
    switch (type) {
      case 'edu':
        this.educationlist = this.educationlist.filter((item: education, item_index: number) => item_index != index)
        break;
      case 'skill':
        this.skilList = this.skilList.filter((item: string, item_index: number) => item_index != index)
        break;
      case 'awad':
        this.awadsList = this.awadsList.filter((item: award, item_index: number) => item_index != index)
        break
      case 'exp':
        this.work_experience_list = this.work_experience_list.filter((item: work_experience, item_index: number) => item_index != index)
        break;
      default:
        console.error('type selection error')
    }
  }
  private saveprofileapi(data: profile) {
    this.loading = true
    this.collectionservice.addDocumnet('profile', data).subscribe({
      next: (data: profile[]) => {
        this.toster.success('Profile Update Successfully')
        this.ngOnInit()
        this.loading = false
      },
      error: (error) => {
        console.error(error)
        this.loading = false
      }
    })
  }
  private updateprofileapi(data: profile, id: string) {
    this.loading = true
    this.collectionservice.updateDocument('profile', id, data).subscribe((data) => {
      this.toster.success('Profile Update Successfully')
      this.ngOnInit()
      this.loading = false
    },
      (err) => {
        console.error(err)
        this.loading = false
      })
  }
  private getprofileapi() {
    this.loading = true
    this.collectionservice.getData('profile').subscribe({
      next: (data) => {
        let obj = data.filter((obj: profile) => obj.uid === this.token.getUser().uid)
        if (obj.length != 0) {
          this.formProfile = obj[0]
          this.skilList = this.formProfile.skil
          this.work_experience_list = this.formProfile.work_experience
          this.educationlist = this.formProfile.education
          this.awadsList = this.formProfile.award
          this.profileid = obj[0].id

        }
        else {
          console.log('no profile found')
        }
        this.loading = false
      },
      error: (error) => {
        console.error(error)
        this.loading = false
      },

    })
  }
  changePasswordapi(oldPassword: string, newPassword: string, confirmPassword: string): void {
    if (oldPassword != "" && newPassword != "" && confirmPassword != "") {
      this.auth.changePasswordWithConfirmation(oldPassword, newPassword, confirmPassword)
        .subscribe(success => {
          if (success) {
            // Password changed successfully, do something
            this.toster.success('Password changed successfully');
          } else {
            // Failed to change password, handle error
            this.toster.error('Failed to change password');
          }
        });
    }
    else {
      this.toster.error("Empty Password Filed")
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.collectionservice.uploadFile(file, 'users/' + this.token.getUser().uid + '/profile').subscribe(
        (progress) => {
          // this.uploadProgress = progress;
          console.log('Upload progress:', progress);
        },
        (error) => {
          console.error('Upload error:', error);
        },
        () => {
          console.log('Upload complete');
          this.collectionservice.getDownloadUrl('users/' + this.token.getUser().uid + '/profile/' + file.name).subscribe(
            (url) => {
              this.formProfile.image = url;
              console.log('Download URL:', url);
              if (this.profileid != '') {
                this.updateprofileapi(this.formProfile, this.profileid)
              }
            },
            (error) => {
              console.error('Error getting download URL:', error);
            }
          );
        }
      );
    }
  }
  onDeleteFile(filePath: string) {
    this.collectionservice.deleteFile(filePath).subscribe(
      () => {
        console.log('File deleted successfully');
        this.formProfile.image = '';
        if (this.profileid != '') {
          this.updateprofileapi(this.formProfile, this.profileid)
        }
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }
}
