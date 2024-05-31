import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import apiUrls from 'src/app/shared/apiUrls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPass: boolean = false
  currentPage: any = ''
  formData: any = {}

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    localStorage.clear()
    this.currentPage = ''
    window.addEventListener('resize', (val) => {
      console.log(window.innerWidth > 512);
    })
  }

  toggleInputClass(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      inputElement.classList.add('not-empty');
    } else {
      inputElement.classList.remove('not-empty');
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched()
    }
    if (form.valid) {
      console.log(form.value);
      this.http.post(apiUrls.apiUrls.login, form.value).subscribe((res: any) => {
        if (!res?.success) {
          throw this.toastr.error(res.message)
        }
        this.toastr.success(res.message)
        localStorage.setItem('token', res?.token)
      })
    }
  }
  forgotPassword(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched()
    }
    if (form.valid) {
      console.log(form.value);
      this.http.post(apiUrls.apiUrls.send_password, form.value).subscribe((res: any) => {
        if (!res?.success) {
          throw this.toastr.error(res.message)
        }
        this.toastr.success(res.message)
        setTimeout(() => { window.location.reload() }, 1500)
      })
    }
  }
}
