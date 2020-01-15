import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  constructor(private router: Router, private authService: UserService) { }
  pageTitle = 'Login';
  employee: any = { user_name: '', password: '' };

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.employee.user_name = userName;
      this.employee.password = password;
      this.authService.login(this.employee).subscribe((data: any) => {
        console.log(data);
        if (data.employeeData[0] !== undefined && data.employeeData.length > 0) {
          this.router.navigate(['/user/profile']);
        } else {
          this.errorMessage = 'Please enter valid username and password';
          console.log(this.errorMessage);
        }
      });
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }


}
