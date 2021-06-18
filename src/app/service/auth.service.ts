import { UserModel } from './../model/User.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url='https://identitytoolkit.googleapis.com/v1/accounts:'
  private apiKey='AIzaSyDxt9Juen-d02GQG_dspB_7kZVb__J-gVY'
    userToken: string ='';
    constructor(private http : HttpClient,private router:Router) {
      this.leerToken();
    }

    logOut(){
  localStorage.removeItem('token')
    }

    logIn(usuario:UserModel){
      const authData={
        ...usuario,
        returnSecureToke:true
      }
      return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`,authData).pipe(map(resp=>{
       // this.guardarToken(resp["idToken"]);
       this.guardarToken(resp.toString());
       return resp;
      }));
    }
    nuevoUsuario(usuario:UserModel){
      const authData={
        email:usuario.email,
        password:usuario.password,
        returnSegureToken:true
      };
      return this.http.post(
        `${this.url}signUp?key=${this.apiKey}`,
        authData
      ).pipe(map(resp=>{
      //  this.guardarToken(resp["idToken"]);
        this.guardarToken(resp.toString());

        return resp;
      }));
    }

    usuarioAnonimo(usuario:UserModel){
      const authData={
        email:usuario.email,
        password:usuario.password,
        returnSegureToken:true
      };
      return this.http.post(
        `${this.url}signUp?key=${this.apiKey}`,
        authData
      ).pipe(map(resp=>{
        //this.guardarToken(resp["idToken"]);
        this.guardarToken(resp.toString());
        return resp;
      }));

    }
    private guardarToken(idtoken:string){
      this.userToken=idtoken;
      localStorage.setItem('token',idtoken);
      let hoy=new Date();
      hoy.setSeconds(3600);
      localStorage.setItem('expira',hoy.getTime().toString())

    }

    leerToken(){
      if(localStorage.getItem('token')){
  this.userToken==(localStorage.getItem('token'));
      }else{
        this.userToken=''
      }
      return this.userToken;
    }
    estaAutenticado():boolean{
  if(this.userToken.length<2){
    return false;
  }
  const expira= Number(localStorage.getItem('expira'));
  const expiraDate=new Date();
  expiraDate.setTime(expira);

  if(expiraDate>new Date){
    this.router.navigateByUrl('/login');

    return   true;}
    else{
      return false;
    }

  }
      // return this.userToken.length>2;
    }
