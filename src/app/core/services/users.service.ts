import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, UserPost } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get("https://www.abstractbeezzz.com/back/users.php")
  }

  changeStatusUsers(id: number) {
    const body = { id };
    const options = {
      body: body
    };
    return this.http.delete("https://www.abstractbeezzz.com/back/users.php", options);
  }

  createUser(formData: FormData) : Observable <any> {    
   return this.http.post('https://www.abstractbeezzz.com/back/users.php', formData)

  }

  updateUser(userId: number, formData: UserPost): Observable<any> {
    return this.http.put(
      `https://www.abstractbeezzz.com/back/users.php?id=${userId}`, 
      formData
    );
  }

  login(formData: Login){
    return this.http.post('https://www.abstractbeezzz.com/back/login.php', formData)
  }
  
}
