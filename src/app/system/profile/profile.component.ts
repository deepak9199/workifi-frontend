import { Component } from '@angular/core';
import { award, education, profile, work_experience } from '../../model/profile';
import { CollectionService } from '../../shared/_service/collection.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../shared/_service/token-storage.service';
import { Router } from '@angular/router';

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
    date_time: '',
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
    points: 0
  }
  fromchangepass = {
    old: '',
    new: '',
    confrom: ''
  }
  skilList: string[] = []
  educationlist: education[] = []
  work_experience_list: work_experience[] = []
  awadsList: award[] = []
  constructor(
    private collectionservice: CollectionService,
    private toster: ToastrService,
    private token: TokenStorageService,
    private route: Router
  ) { }

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

  }
  save() {
    this.formProfile.education = this.educationlist
    this.formProfile.skil = this.skilList
    this.formProfile.work_experience = this.work_experience_list
    this.formProfile.award = this.awadsList
    console.log(this.formProfile)
  }
}
