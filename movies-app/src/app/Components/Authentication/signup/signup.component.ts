import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import apiUrls from 'src/app/shared/apiUrls';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showPass: boolean = false
  formData: any = {}
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    window.addEventListener('resize', () => {
      // this.windowWidth = window.innerWidth <= 1024;
    });
  }
  toggleInputClass(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      inputElement.classList.add('not-empty');
    } else {
      inputElement.classList.remove('not-empty');
    }
  }


  signUp(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched()
    }
    if (form.valid) {
      form.value.phoneNumber = form.value.phoneNumber.toString()
      this.http.post(apiUrls.apiUrls.signup, form.value).subscribe((res: any) => {
        if (!res?.success) {
          throw this.toastr.error(res.message)
        }
        this.toastr.success(res.message)
        setTimeout(() => { this.router.navigate(['/Login']) }, 1500)
      })
    }
  }
}
