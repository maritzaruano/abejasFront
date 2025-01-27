import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

   constructor(private titleService: Title, private metaService: Meta) { 
      // Establecemos el título de la página
      this.titleService.setTitle('About Abstract Beezzz | Professional Beekeeper & Bee Removal');
  
      // Establecemos la metadata de la página (descripción, palabras clave, etc.)
      this.metaService.updateTag({ name: 'description', content: 'Discover Abstract Beezzz, your local expert beekeeper dedicated to Live bee relocation. We are committed to safely saving and relocating bees to local apiaries.' });
      this.metaService.updateTag({ name: 'keywords', content:'cost for bee removal, bee removal price, bee removal service'})
      this.metaService.updateTag({ name: 'author', content: 'Abstract Beezzz'});
      this.metaService.updateTag({ name: 'publisher', content: 'Abstract Beezzz'})
      this.metaService.updateTag({ name: 'lang', content: 'en'}) 
      this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    
    }

}
