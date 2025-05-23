import { Component, OnInit } from '@angular/core';
import { UserPost, Users } from '../../../core/interfaces/users.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent  implements OnInit {
  

  action = '';  
  isModalOpen = false;
  users: Users [] = [];

  formData: FormData = new FormData();

  userId: number = 0;

  userForm : FormGroup;


  constructor(private usersService : UsersService, private formBuilder: FormBuilder, private route: ActivatedRoute)
  {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.getUsers();
    
  }
  getUsers(){
    this.usersService.getUsers().subscribe((data: any) => {
     console.log(data);
      this.users = data;
    })
  }

  changeStatus(id: number){
    if(confirm("Esta seguro que desea eliminar este user")){
      this.usersService.changeStatusUsers(id).subscribe((data: any) => {
        console.log(data)
        this.getUsers();
      })
    }
  }

  add(){
    this.action = 'New';
    this.userForm.reset();
    
    this.userForm.controls["password"].setValidators([Validators.required]);
    this.userForm.controls["password"].updateValueAndValidity();
    
    this.openModal();
  }

  edit( item: Users){
    this.action = 'Edit';
    this.userId = item.id;  
    this.userForm.controls["name"].setValue(item.name);
    this.userForm.controls["lastname"].setValue(item.lastname);
    this.userForm.controls["email"].setValue(item.email);
    this.userForm.controls["password"].setValue(item.password);

    this.userForm.controls["password"].clearValidators();
    this.userForm.controls["password"].updateValueAndValidity();

    this.openModal();
  }


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
  onSubmit() {

    if (this.userForm.invalid) {
      return;
    }
    



    if(this.action == "Edit"){
      const formValues = this.userForm.value;
      let userP : UserPost = {
        name: formValues.name,
        email: formValues.email ,
        lastname: formValues.lastname
      }

      this.usersService.updateUser(this.userId, userP).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.getUsers();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }else{
      const formValues = this.userForm.value;
      this.formData.append('name', formValues.name);
      this.formData.append('lastname', formValues.lastname);
      this.formData.append('email', formValues.email);
      this.formData.append('password', formValues.password);
      //Aquí hacemos la solicitud HTTP para crear el post
      this.usersService.createUser(this.formData).subscribe(
        (response) => {
          console.log('User created successfully:', response);
          // Puedes hacer algo con la respuesta, como mostrar un mensaje de éxito
          this.getUsers();
        },
        (error) => {
          console.error('Error creating user:', error);
          // Puedes manejar errores, como mostrar un mensaje de error
        }
      );
    }

    this.closeModal(); // Cierra el modal después de enviar el formulario

  }

}
