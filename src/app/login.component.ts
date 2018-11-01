import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { User } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  hide = true;
  show_loader = false;

  constructor(private router: Router, private dataService: DataService, private fb: FormBuilder, private snackbarService: SnackbarService) { 
    if(localStorage.getItem('token')){
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

  login(){
    this.show_loader = true;
    this.dataService.login(this.loginForm.value)
      .subscribe((user: User) => {
        this.show_loader = false;
        localStorage.setItem('firstname', user.firstname);
        localStorage.setItem('token', user.token);
        this.router.navigate(['']);
      },
        err => {
          this.show_loader = false;
          console.log("Err>>", err);
          this.snackbarService.showSnackBar("Authentication Failed !");
        }
      );
  }

  

}
