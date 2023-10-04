export class Tab {
    ruta: string;
    nombre: string;
    contenido: string;
    hidden: boolean;

    constructor(ruta: string, nombre: string, contenido: string, hidden: boolean) {
        this.ruta = ruta;
        this.nombre = nombre;
        this.contenido = contenido;
        this.hidden = hidden;
    }
}
