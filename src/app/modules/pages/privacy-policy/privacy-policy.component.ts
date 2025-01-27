import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

  constructor(private titleService: Title, private metaService: Meta) { 
      // Establecemos el título de la página
      this.titleService.setTitle('Privacy Policy | Abstract Beezzz');
  
      // Establecemos la metadata de la página (descripción, palabras clave, etc.)
      this.metaService.updateTag({ name: 'description', content: 'Read the privacy policy of Abstract Beezzz, outlining how we collect, use, and protect your personal information when using our live honey bee removal services.' });
      this.metaService.updateTag({ name: 'keywords', content:'bee removalist, bee hive removal, honey bee removal, bee nest removal,bee removal cost'})
      this.metaService.updateTag({ name: 'author', content: 'Abstract Beezzz'});
      this.metaService.updateTag({ name: 'publisher', content: 'Abstract Beezzz'})
      this.metaService.updateTag({ name: 'lang', content: 'en'}) 
      this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
      
    
    }

}
