import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  // Options
  run() {
    alert(this.tabs[this.currentTab].contenido_actual);
  }

  // Tabs
  select_tab(i:number) {
    this.currentTab = i;
    this.updateLinesInputConsole();
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
    this.updateLinesInputConsole();
  }

  // Consoles
  autoExpand(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  updateLinesInputConsole() {
    //this.linesInputConsole = this.inputConsoleContent.split('\n');
    this.linesInputConsole = this.tabs[this.currentTab].contenido_actual.split('\n');
  }

  updateLinesOutputConsole() {
    this.linesOutputConsole = this.outputConsoleContent.split('\n');
  }

}