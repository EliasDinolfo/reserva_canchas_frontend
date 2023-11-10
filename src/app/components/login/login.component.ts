import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  logo = './assets/img/usuario.png';

  form: FormGroup;
  loading = false;
  
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.form);
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    
    //hardcodeado sin backend
    if(usuario == 'admin' && password == '1234'){
      //redireccionamos al dashboard
      this.fakeLoading();
    } else {
      //mostramos un mensaje de error
      this.error();
      this.form.reset();
    }

    //this.router.navigateByUrl('/dashboard');
  }

  error() {
    this._snackBar.open('Usuario o contraseña ingresados son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      //redireccionamos al dashboard
      this.router.navigate(['dashboard']);
    }, 1500);
  }

}
