import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../system/home/home.component';
import { LoginComponent } from '../system/auth/login/login.component';
import { RegisterComponent } from '../system/auth/register/register.component';
import { RoleComponent } from '../system/auth/role/role.component';
import { ManageProjectComponent } from '../system/client/manage-project/manage-project.component';
import { CreateProjectComponent } from '../system/client/create-project/create-project.component';
import { ProfileComponent } from '../system/profile/profile.component';
import { ProposalsComponent } from '../system/client/proposals/proposals.component';
import { LogoutComponent } from '../system/auth/logout/logout.component';
import { FreelancerProjectListComponent } from '../system/freelancer/freelancer-project-list/freelancer-project-list.component';
import { FreelancerSubmitProposalComponent } from '../system/freelancer/freelancer-submit-proposal/freelancer-submit-proposal.component';
import { AuthGuard } from '../shared/_guards/guard';
import { ProposalToFreelancerComponent } from '../system/client/proposal-to-freelancer/proposal-to-freelancer.component';
import { FreelancerListComponent } from '../system/client/freelancer-list/freelancer-list.component';
import { ClientHomeComponent } from '../system/client/client-home/client-home.component';
import { FreelancerProposalsComponent } from '../system/freelancer/freelancer-proposals/freelancer-proposals.component';
import { MessagesComponent } from '../system/messages/messages.component';
import { NoPageFoundComponent } from '../system/no-page-found/no-page-found.component';
import { TransactionComponent } from '../system/transaction/transaction.component';
import { FreelancerManageJobsComponent } from '../system/freelancer/freelancer-manage-jobs/freelancer-manage-jobs.component';
import { PricingComponent } from '../system/pricing/pricing.component';
import { PrivacyPolicyComponent } from '../system/privacy-policy/privacy-policy.component';
import { RefundPoliciesComponent } from '../system/refund-policies/refund-policies.component';
import { TermsAndConditionsComponent } from '../system/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from '../system/contact-us/contact-us.component';
import { GuidanceComponent } from '../system/guidance/guidance.component';
import { Guidance2Component } from '../system/guidance2/guidance2.component';
import { FaqComponent } from '../system/faq/faq.component';
import { CompanyOverVireComponent } from '../system/company-over-vire/company-over-vire.component';
import { KycPolicyComponent } from '../system/kyc-policy/kyc-policy.component';
import { ForgetPasswordComponent } from '../system/auth/forget-password/forget-password.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgetpass', component: ForgetPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'role', component: RoleComponent },
  { path: 'message', component: MessagesComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'pricing', component: PricingComponent },
  {
    path: 'client/manageproject', component: ManageProjectComponent, canActivate: [AuthGuard], data:
    {
      role: 'client'
    }
  },
  {
    path: 'client/createproject', component: CreateProjectComponent, canActivate: [AuthGuard], data:
    {
      role: 'client'
    }
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'client/proposals', component: ProposalsComponent, canActivate: [AuthGuard], data:
    {
      role: 'client'
    }
  },
  {
    path: 'client/freelancerlist', component: FreelancerListComponent, canActivate: [AuthGuard], data:
    {
      role: 'client'
    }
  },
  {
    path: 'client/proposalstofreelancer', component: ProposalToFreelancerComponent, canActivate: [AuthGuard], data:
    {
      role: 'client'
    }
  },
  {
    path: 'client/home', component: ClientHomeComponent, canActivate: [AuthGuard], data:
    {
      role: 'client'
    }
  },
  {
    path: 'freelancer/projectlist', component: FreelancerProjectListComponent, canActivate: [AuthGuard], data:
    {
      role: 'freelancer'
    }
  },
  {
    path: 'freelancer/proposals', component: FreelancerSubmitProposalComponent, canActivate: [AuthGuard], data:
    {
      role: 'freelancer'
    }
  },
  {
    path: 'freelancer/managejobs', component: FreelancerManageJobsComponent, canActivate: [AuthGuard], data:
    {
      role: 'freelancer'
    }
  },
  {
    path: 'freelancer/proposalslist', component: FreelancerProposalsComponent, canActivate: [AuthGuard], data:
    {
      role: 'freelancer'
    }
  },
  {
    path: 'guidance', component: GuidanceComponent
  },
  {
    path: 'faq', component: FaqComponent
  },
  {
    path: 'companyoverview', component: CompanyOverVireComponent
  },
  {
    path: 'guidance2', component: Guidance2Component
  },
  {
    path: 'privacypolicy', component: PrivacyPolicyComponent
  },
  {
    path: 'contactus', component: ContactUsComponent
  },
  {
    path: 'refundpolicy', component: RefundPoliciesComponent
  },
  {
    path: 'termsandcondition', component: TermsAndConditionsComponent
  },
  {
    path: 'kycpolicy', component: KycPolicyComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**', component: NoPageFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
