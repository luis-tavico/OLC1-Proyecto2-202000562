import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Tab } from 'src/app/models/Tab';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  @ViewChild('containerTabs') containerTabs!: ElementRef;
  @ViewChild('containerNumberLines') containerNumberLines!: ElementRef;
  @ViewChild('inputConsole') inputConsole!: ElementRef;
  //Pestañas
  tabs: Tab[] = [];
  currentTab: number = 0;
  //Consola Input
  inputConsoleContent = '';
  lines: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.tabs.push(new Tab("", "archivo_sin_titulo", "Contenido del archivo.", true));
    this.updateLines();
  }

  seleccionarOpcion(opcion: string) {
    // Puedes realizar acciones según la opción seleccionada
    console.log('Opción seleccionada:', opcion);
  }
  
  //
  add_tab() {
    if (this.tabs.length < 4) {
      //[ruta, nombre, contenido, oculto]
      const n = this.tabs.length + 1;
      const titulo = "Pestaña" + n;
      const contenido = "Contenido del archivo" + n;
      this.tabs.push(new Tab("", titulo, contenido, true));
      //this.inputConsole.nativeElement.value = this.tabs[n-1].contenido;
    } else {
      alert("No se pueden agregar más pestañas");
    }
  }
  
  delete_tab(i:number) {
    if (this.currentTab == i) {
      if (this.tabs.length > 1) {
        //this.inputConsole.nativeElement.value = this.tabs[i-1].contenido;
        const contenido = this.inputConsole.nativeElement.textContent;
        this.currentTab = i-1;
        this.tabs.splice(i, 1);
      } else {
        //this.inputConsole.nativeElement.value = "";
        const contenido = this.inputConsole.nativeElement.textContent;
      }
    } else {
      this.tabs.splice(i, 1);
    }
  }
  
  select_tab(i:number) {
    this.currentTab = i;
    //this.inputConsole.nativeElement.value = this.tabs[i].contenido;
    var content = this.inputConsole.nativeElement.value
    var lineArray: string[];
    lineArray = content.split('\n');
    console.log(lineArray);
  }

  //
  autoExpand(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  updateLines() {
    this.lines = this.inputConsoleContent.split('\n');
  }

}
