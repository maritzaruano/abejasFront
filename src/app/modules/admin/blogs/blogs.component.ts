import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {

  isModalOpen = false;
  task = { title: '', description: '' };



  // Abre el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Cierra el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Maneja el envío del formulario
  onSubmit() {
    console.log('New Task:', this.task);
    // Aquí puedes agregar la lógica para guardar la nueva tarea en el backend o en un servicio
    this.closeModal(); // Cierra el modal después de enviar el formulario
  }


}
