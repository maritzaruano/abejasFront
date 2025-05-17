import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IContactform } from '../../../core/interfaces/contactform';
import { EmailService } from '../../../services/service-email/email.service';
import { LoadingService } from '../../../services/shared/loading.service';
import { ToastService } from '../../../services/shared/toast.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  
  isRobotChecked = false;
  contactForm: FormGroup;
  submittedData: any;
  isLoading: boolean = false;
  imageUrls: string[] = [];  // Aquí guardaremos las URL de las imágenes seleccionadas
  selectedFiles: File[] = []; // Aquí almacenamos los archivos seleccionados

  // Este método alterna el valor del checkbox "I'm not a robot"
  toggleRobotCheck(): void {
    const currentValue = this.contactForm.get('robotCheck')?.value;
    this.contactForm.get('robotCheck')?.setValue(!currentValue);
  }

  contact: IContactform = {
    id: 0,
    name: '',
    telephone: '',
    email: '',
    address: '',
    situation: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: EmailService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      situation: ['', Validators.required],
      robotCheck: [false, Validators.requiredTrue]
    });

    this.titleService.setTitle('Contact Abstract Beezzz | Bee Removal in Treasure Coast');
    this.metaService.updateTag({ name: 'description', content: 'Contact Abstract Beezzz for bee hive removal and relocation. Serving Martin, Port St. Lucie, and Palm Beach Counties. Have bees? Let us relocate them safely.'});
    this.metaService.updateTag({ name: 'keywords', content:'bee removal Florida, bee removal Port St Lucie, bee removal Stuart'})
    this.metaService.updateTag({ name: 'author', content: 'Abstract Beezzz'});
    this.metaService.updateTag({ name: 'publisher', content: 'Abstract Beezzz'})
    this.metaService.updateTag({ name: 'lang', content: 'en'}) 
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.loadingService.hide();
  }

  // Método para manejar la selección de imágenes
  onImageSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          this.selectedFiles.push(file);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageUrls.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  // Método para eliminar una imagen seleccionada
  removeImage(index: number): void {
    this.imageUrls.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    // Marcar todos los controles del formulario como tocados
    this.contactForm.markAllAsTouched();
  
    if (this.contactForm.valid) {
      // Mostrar el indicador de carga
      this.isLoading = true;
      this.loadingService.show();
  
      // Obtener los valores del formulario y asignarlos a `this.contact`
      this.contact = this.contactForm.value;
  
      // Crear un FormData para enviar datos binarios
      const formData = new FormData();
  
      // Agregar los datos del formulario al FormData
      formData.append('name', this.contact.name);
      formData.append('telephone', this.contact.telephone);
      formData.append('email', this.contact.email);
      formData.append('address', this.contact.address);
      formData.append('situation', this.contact.situation);
  
      // Agregar las imágenes seleccionadas al FormData
      this.selectedFiles.forEach(file => {
        formData.append('images[]', file, file.name); // Usar images[] para indicar múltiples imágenes
      });
  
      // Enviar el formulario con las imágenes
      this.service.sendEmail(formData).subscribe({
        next: (response: any) => {
          this.loadingService.hide();
          this.toastService.show('Thank you! Your message has been received. We’ll get back to you shortly!');
          // Reiniciar el formulario después de enviar
          this.contactForm.reset();
          this.contactForm.get('robotCheck')?.setValue(false); // Restablecer el botón de "I’m not a robot"
          this.imageUrls = []; // Limpiar las imágenes seleccionadas
          this.selectedFiles = []; // Limpiar los archivos seleccionados
  
          setTimeout(() => {
            this.contactForm.reset();
            this.contactForm.get('robotCheck')?.setValue(false);
          }, 5000);
  
          this.isLoading = false;
        },
        error: (error: any) => {
          this.loadingService.hide();
          this.toastService.show('Oops! Your message couldn’t be sent. Please try again or contact us directly at 772-486-2688');
          this.isLoading = false;
        }
      });
    } else {
      console.error('Formulario inválido, verifica los campos.');
    }
  }
  
}
