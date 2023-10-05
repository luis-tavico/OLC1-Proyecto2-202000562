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
  inputConsoleContent = '';
  linesInputConsole: string[] = [];
  //Consola Output
  outputConsoleContent = '';
  linesOutputConsole: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.tabs.push(new Tab("", "sin_titulo", ""));
    this.updateLinesInputConsole();
    this.updateLinesOutputConsole();
  }
  
  // Options
  run() {
    const code = this.inputConsole.nativeElement.value
    this.outputConsoleContent = code;
    //this.outputConsole.nativeElement.value = code;
    this.updateLinesOutputConsole();
  }

  // Tabs
  add_tab() {
    if (this.tabs.length < 4) {
      //[ruta, nombre, contenido]
      this.tabs.push(new Tab("", "sin_titulo", ""));
    } else {
      alert("Ha llegado al límite de pestañas.");
    }
  }
  
  delete_tab(i:number) {
    if (this.tabs.length > 1) {
      if (this.currentTab == i) {
        this.currentTab = i-1;
        this.tabs.splice(i, 1);
      } else {
        this.tabs.splice(i, 1);
      }
    } else if (this.tabs.length == 1) {
      const contenido = this.inputConsole.nativeElement.textContent;
    }
  }
  
  select_tab(i:number) {
    this.currentTab = i;
    //this.inputConsole.nativeElement.value = this.tabs[i].contenido;
    var content = this.inputConsole.nativeElement.value
    var lineArray: string[];
    lineArray = content.split('\n');
    //
  }

  // Consoles
  autoExpand(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  updateLinesInputConsole() {
    this.linesInputConsole = this.inputConsoleContent.split('\n');
  }

  updateLinesOutputConsole() {
    this.linesOutputConsole = this.outputConsoleContent.split('\n');
  }

}