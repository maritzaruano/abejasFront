import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IContactform } from '../../../core/interfaces/contactform';
import { EmailService } from '../../../services/service-email/email.service';
import { LoadingService } from '../../../services/shared/loading.service';
import { ToastService } from '../../../services/shared/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  isRobotChecked = false;
  contactForm: FormGroup;
  submittedData: any;
  isLoading: boolean = false;

  toggleRobotCheck() {
    const currentValue = this.contactForm.get('robotCheck')?.value;
    this.contactForm.get('robotCheck')?.setValue(!currentValue); 
  }
  contact : IContactform = {
    id: 0,
    name: '',
    telephone: '',
    email: '',
    address: '',
    situation: ''
  };

   contacts : IContactform[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private service: EmailService,
    private loadingService: LoadingService,
    private toastService: ToastService
  )
  
  {   
    this.contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    situation: ['', Validators.required],
    robotCheck: [false, Validators.requiredTrue] 
  });
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    // Marcar todos los controles del formulario como tocados
    this.contactForm.markAllAsTouched();

    if (this.contactForm.valid) {
      // Mostrar el indicador de carga
      this.isLoading = true;
      this.loadingService.show();

      // Obtener los valores del formulario y asignarlos a `this.contact`
      this.contact = this.contactForm.value;

      // Llamar al servicio para enviar el correo
      this.service.sendEmail(this.contact).subscribe({
        next: (response: any) => {

          this.loadingService.hide();
          this.toastService.show('Thank you! Your message has been received. We’ll get back to you shortly!')
          // Reiniciar el formulario después de enviar
          this.contactForm.reset();
          this.contactForm.get('robotCheck')?.setValue(false); // Restablecer el botón de "I’m not a robot"
          
          setTimeout(() => {
            this.contactForm.reset();
            this.contactForm.get('robotCheck')?.setValue(false); // Restablecer el botón de "I’m not a robot"
          }, 5000);

          // Ocultar el indicador de carga
          this.isLoading = false;
        },
        error: (error: any) => {
          setTimeout(() => {
            this.loadingService.hide();
            this.toastService.show('Oops! Your message couldn’t be sent. Please try again or contact us directly at 772-486-2688')
          } , 2000)


          
          // Ocultar el indicador de carga en caso de error
          this.isLoading = false;
        }
      });
    } else {
      console.error('Formulario inválido, verifica los campos.');
    }
  }
}
