import { Component, OnInit, ElementRef, ViewChild, HostListener  } from '@angular/core';
import { Tab } from 'src/app/models/Tab';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  @ViewChild('containerTabs') containerTabs!: ElementRef;
  @ViewChild('inputConsole') inputConsole!: ElementRef;
  @ViewChild('outputConsole') outputConsole!: ElementRef;

  //Pestañas
  tabs: Tab[] = [];
  currentTab: number = 0;
  //Consola Input
  //inputConsoleContent = '';
  linesInputConsole: string[] = [];
  //Consola Output
  outputConsoleContent = '';
  linesOutputConsole: string[] = [];
  //[ruta, nombre, contenido_anterior, contenido_actual]
  
  constructor() { }

  ngOnInit(): void {
    this.tabs.push(new Tab("", "sin_titulo", "", ""));
    this.updateLinesInputConsole();
    this.updateLinesOutputConsole();
  }

  onKeyPress(event: KeyboardEvent) {
    const teclaPresionada = event.key;
    if (teclaPresionada === 'Tab') {
      event.preventDefault();
      //this.inputConsole.nativeElement.setSelectionRange(start+1, start+1);
      const i = this.inputConsole.nativeElement.selectionStart;
      const principio = this.tabs[this.currentTab].contenido_actual.slice(0, i);
      const final = this.tabs[this.currentTab].contenido_actual.slice(i);
      this.tabs[this.currentTab].contenido_actual = principio+"\t"+final;
    }
  }

  // Options File
  handleFileChange(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Archivo seleccionado:', selectedFile);
    }
  }

  openFileExplorer(inputFile: HTMLInputElement) {
    inputFile.click();
  }

  openFile(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const filePath = event.target.value;
      const fileName = filePath.split('\\').pop() || filePath.split('/').pop();
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const fileContent = e.target.result;
        this.tabs[this.currentTab].ruta = filePath;
        this.tabs[this.currentTab].nombre = fileName;
        this.tabs[this.currentTab].contenido_anterior = fileContent;
        this.tabs[this.currentTab].contenido_actual = fileContent;
        this.updatesLines_updateCosole();
      };
      fileReader.readAsText(selectedFile);
    }
  }

  // Option Run
  run() {
    alert(this.tabs[this.currentTab].contenido_actual);
  }

  // Tabs
  select_tab(i:number) {
    this.currentTab = i;
    this.updatesLines_updateCosole();
  }

  add_tab() {
    if (this.tabs.length < 4) {
      this.tabs.push(new Tab("", "sin_titulo", "", ""));
      this.currentTab = this.tabs.length - 1;
      this.updateLinesInputConsole();
    } else {
      alert("Ha llegado al límite de pestañas.");
    }
  }
  
  delete_tab(i:number) {
    if (this.tabs[i].contenido_anterior != this.tabs[i].contenido_actual) {
      if (this.tabs[i].nombre == "sin_titulo") {
        alert("¿Desea guardar el archivo?");
      } else {
        alert("¿Desea guardar los cambio en el archivo " + this.tabs[i].nombre + "?");
      }
    }
    if (this.tabs.length > 1) {
      if (this.currentTab == i) {
        if (i != 0) {
          this.currentTab = i-1;
        }
        this.tabs.splice(i, 1);
      } else {
        if (this.currentTab > i) {
          this.currentTab = this.currentTab-1;
        }
        this.tabs.splice(i, 1);
      }
    } else {
      this.tabs[i] = new Tab("", "sin_titulo", "", "");
    }
    this.updatesLines_updateCosole();
  }

  // Consoles
  autoExpand(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  updateLinesInputConsole() {
    this.linesInputConsole = this.tabs[this.currentTab].contenido_actual.split('\n');
  }

  updateLinesOutputConsole() {
    this.linesOutputConsole = this.outputConsoleContent.split('\n');
  }

  updatesLines_updateCosole() {
    this.updateLinesInputConsole();
    this.inputConsole.nativeElement.value = this.tabs[this.currentTab].contenido_actual;
    this.inputConsole.nativeElement.style.height = 'auto';
    this.inputConsole.nativeElement.style.height = this.inputConsole.nativeElement.scrollHeight + 'px';
  }

}