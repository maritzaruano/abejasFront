import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  
  constructor(private titleService: Title, private metaService: Meta) { 
    this.titleService.setTitle('Bee relocation Services in Martin, St. Lucie & Palm Beach');
    this.metaService.updateTag({ name: 'description', content: 'Abstract Beezzz provides safe, expert, and humane live honey bee removal and relocation, ensuring the safety of bees and your property. We are the best option.'});
    this.metaService.updateTag({ name: 'keywords', content:'bee removing, bee removal company, bee relocation'})
    this.metaService.updateTag({ name: 'author', content: 'Abstract Beezzz'});
    this.metaService.updateTag({ name: 'publisher', content: 'Abstract Beezzz'})
    this.metaService.updateTag({ name: 'lang', content: 'en'}) 
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  }   
}
