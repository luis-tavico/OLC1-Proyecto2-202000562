import { Type } from "./Type";
import { Symbol } from "./Symbol";
import { Table } from "./Table";
import { Return } from "../Abstract/Return";
import { Relational } from "../Expression/Relational";
import { Assignment } from "../Instruction/Assignment";
import { Field } from "../Expression/Field";
import { Singleton } from "../Singleton/Singleton";

export class Environment {
    private variables = new Map<string, Symbol>();
    private tables = new Map<string, Table>();
    singleton = Singleton.getInstance()


    constructor(public prev: Environment | null) {
        this.variables = new Map<string, Symbol>();
        this.tables= new Map<string, Table>();
    }

    public saveVariable(name: string, type: Type, value: any): boolean {
        let env: Environment | null = this;
        if (!env.variables.has(name.toLowerCase())) {
            this.variables.set(name.toLocaleLowerCase(), new Symbol(name, type, value));
            return true
        }
        return false
    }

    public getVariable(name: string): Symbol | undefined | null {
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(name)) {
                return env.variables.get(name);
            }
            env = env.prev;
        }
        return null;
    }

    public updateVariable(name: string, new_value: any) {
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(name)) {
                for (let entry of Array.from(env.variables)) {
                    if (entry[0] === name) {
                        entry[1].value = new_value;
                    }
                }
            }
            env = env.prev;
        }
        return null;
    }

    public saveTable(name: string, table: Table) {
        let env: Environment | null = this;
        if (!env.tables.has(name.toLowerCase())) {
            env.tables.set(name.toLowerCase(), table);
            console.log("Tabla " + name + " creada exitosamente.");
        }else {
            console.log("Error, la tabla " + name + " ya existe.");
        }
    }

    public addColumn(name: string, columns: Field[]) {
        //let env: Environment | null = this;
        let env: Environment = this;
        const contextGlobal = this.getGlobal();
    
        if (contextGlobal.tables.has(name.toLowerCase())) {
            const table = contextGlobal.tables.get(name.toLowerCase())!;
            const cols = table.columns;
            const newTuple: { [key: string]: any } = {};
            columns.forEach((new_column) => {
                cols.push(new_column.execute(env));
                console.log("Columna " + new_column.execute(env).value + " agregada a tabla " + name + " exitosamente.");
            });
        } else {
            console.log("Error, la tabla " + name + " no existe.");
        }
    }

    public renameTable(name: string, new_name: any) {
        //let env: Environment | null = this;
        let env: Environment = this;
        const contextGlobal = this.getGlobal();
    
        if (contextGlobal.tables.has(name.toLowerCase())) {
            const table = contextGlobal.tables.get(name.toLowerCase())!;
            const cols = table.columns;
            const newTuple: { [key: string]: any } = {};
            let new_map = new Map<string, Table>();
            for (let [key, value] of this.tables.entries()) {
                if (key === name.toLocaleLowerCase()) {
                    value.name = new_name.value;
                    new_map.set(new_name.value.toLocaleLowerCase(), value);
                } else {
                    new_map.set(key, value);
                }
            }
            this.tables = new_map;
            console.log("Tabla " + name + " renombrada a " + new_name.value + " exitosamente.");
        } else {
            console.log("Error, la tabla " + name + " no existe.");
        }
    }

    public dropColumn(name_table: string, name_column: any) {
        //let env: Environment | null = this;
        let env: Environment = this;
        const contextGlobal = this.getGlobal();
    
        if (contextGlobal.tables.has(name_table.toLowerCase())) {
            const table = contextGlobal.tables.get(name_table.toLowerCase())!;
            const cols = table.columns;
            const newTuple: { [key: string]: any } = {};
            let new_cols = cols.filter(col => col.value !== name_column.value);
            table.columns = new_cols;
            console.log("Columna " + name_column.value + " eliminada de tabla " + name_table + " exitosamente.");
        } else {
            console.log("Error, la tabla " + name_table + " no existe.");
        }
    }

    public renameColumn(name_table: string, name_column: string, new_name_column: any) {
        //let env: Environment | null = this;
        let env: Environment = this;
        const contextGlobal = this.getGlobal();
    
        if (contextGlobal.tables.has(name_table.toLowerCase())) {
            const table = contextGlobal.tables.get(name_table.toLowerCase())!;
            const cols = table.columns;
            const newTuple: { [key: string]: any } = {};
            cols.forEach((item) => {
                if (item.value == name_column) {
                    item.value = new_name_column.value;
                }
            });
            console.log("Columna " + name_column + " de tabla " + name_table + " renombrada a " + new_name_column.value + " exitosamente.");
        } else {
            console.log("Error, la tabla " + name_table + " no existe.");
        }
    }

    public dropTable(name: string) {
        let env: Environment | null = this;
        if (env.tables.has(name.toLowerCase())) {
            env.tables.delete(name.toLocaleLowerCase());
            console.log("Tabla " + name + " eliminada exitosamente.");
        }else {
            console.log("Error, la tabla " + name + " no existe.");
        }
    }

    public insert(name: string, columns: [], values: Return[]) {
        const contextGlobal = this.getGlobal();
    
        if (contextGlobal.tables.has(name.toLowerCase())) {
          const table = contextGlobal.tables.get(name.toLowerCase())!;
          const cols = table.columns;
          const newTuple: { [key: string]: any } = {};
    
          cols.forEach((item) => {
            newTuple[item.value] = null;
          });
    
          columns.forEach((item, index) => {
            newTuple[item]= values[index];
          });
    
          table.data.push(newTuple);
          console.log("Registro agregado a la tabla " + name + " exitosamente.");
        } else {
            console.log("Error, la tabla " + name + " no existe.");
        }
    
    }
    
    public select(name: string, columns: [] | null, condition: Relational | null) {
        let env: Environment | null = this;
        const contextGlobal = this.getGlobal();
        if (contextGlobal.tables.has(name.toLowerCase())) {
            let info = "--Mostrando columnas seleccionadas de la tabla "+ name +"--\n";
            const table = contextGlobal.tables.get(name.toLowerCase())!;
            const cols = table.columns;
            if (condition == null) {
                if (columns != null) {
                    for (const [key, value] of contextGlobal. tables) {
                        if (key.toLowerCase() == name.toLowerCase()) {
                            value.data.forEach((item) => {
                            columns.forEach((name_column) => {
                            info += name_column + ": " +item[name_column].value + ", ";
                            });
                            info = info.slice(0, -2);
                            info += "\n";
                        });
                        }
                    }
                    this.singleton.addConsole(info.trim());
                } else {
                    for (const [key, value] of contextGlobal. tables) {
                        if (key.toLowerCase() == name.toLowerCase()) {
                            value.data.forEach((item) => {
                            cols.forEach((name_column) => {
                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                });
                            info = info.slice(0, -2);
                            info += "\n";
                            });
                        }
                    }
                    this.singleton.addConsole(info.trim());
                }
            } else {
                let type = condition.getType();
                if (condition.getLeftValue(env).type == null) {
                    let id = condition.getLeftValue(env).value;
                    let val = condition.getRightValue(env).value;
                    for (const [key, value] of contextGlobal. tables) {
                        if (key.toLowerCase() == name.toLowerCase()) {
                            value.data.forEach((item) => {
                                if (type == 0) {
                                    if (item[id].value == val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 1) {
                                    if (item[id].value != val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 2) {
                                    if (item[id].value < val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 3) {
                                    if (item[id].value <= val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 4) {
                                    if (item[id].value > val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 5) {
                                    if (item[id].value >= val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                }
                            });
                        }
                    }
                } else if (condition.getRightValue(env).type == null) {
                    let val = condition.getLeftValue(env).value;
                    let id = condition.getRightValue(env).value;
                    for (const [key, value] of contextGlobal. tables) {
                        if (key.toLowerCase() == name.toLowerCase()) {
                            value.data.forEach((item) => {
                                if (type == 0) {
                                    if (item[id].value == val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 1) {
                                    if (item[id].value != val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 2) {
                                    if (item[id].value < val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 3) {
                                    if (item[id].value <= val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 4) {
                                    if (item[id].value > val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                } else if (type == 5) {
                                    if (item[id].value >= val) {
                                        if (columns != null) {
                                            columns.forEach((name_column) => {
                                                info += name_column + ": " + item[name_column].value + ", ";
                                                });
                                                info = info.slice(0, -2);
                                                info += "\n";
                                        } else {
                                            cols.forEach((name_column) => {
                                                info += name_column.value + ": " + item[name_column.value].value + ", ";
                                                });
                                            info = info.slice(0, -2);
                                            info += "\n";
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
                this.singleton.addConsole(info.trim());
            }
        } else {
            console.log("Error, la tabla " + name + " no existe.");
        }
    }

    public update(name: string, columns: Assignment[], condition: Relational) {
        let env: Environment = this;
        const contextGlobal = this.getGlobal();
        if (contextGlobal.tables.has(name.toLowerCase())) {
            const table = contextGlobal.tables.get(name.toLowerCase())!;
            const cols = table.columns;
            let type = condition.getType();
            if (condition.getLeftValue(env).type == null) {
                let id = condition.getLeftValue(env).value;
                let val = condition.getRightValue(env).value;
                for (const [key, value] of contextGlobal. tables) {
                    if (key.toLowerCase() == name.toLowerCase()) {
                        value.data.forEach((item) => {
                            if (type == 0) {
                                if (item[id].value == val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 1) {
                                if (item[id].value != val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 2) {
                                if (item[id].value < val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 3) {
                                if (item[id].value <= val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 4) {
                                if (item[id].value > val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 5) {
                                if (item[id].value >= val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            }
                        });
                    }
                }
            } else if (condition.getRightValue(env).type == null) {
                let val = condition.getLeftValue(env).value;
                let id = condition.getRightValue(env).value;
                for (const [key, value] of contextGlobal. tables) {
                    if (key.toLowerCase() == name.toLowerCase()) {
                        value.data.forEach((item) => {
                            if (type == 0) {
                                if (item[id].value == val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 1) {
                                if (item[id].value != val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 2) {
                                if (item[id].value < val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 3) {
                                if (item[id].value <= val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 4) {
                                if (item[id].value > val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            } else if (type == 5) {
                                if (item[id].value >= val) {
                                    table.data.forEach((item) => {
                                        columns.forEach((col) => {
                                            item[col.getId()].value = col.getValue(env).value;
                                        });
                                    });
                                }
                            }
                        });
                    }
                }
            }
            console.log("Columnas de tabla " + name + " actualizadas exitosamente.");
        } else {
            console.log("Error, la tabla " + name + " no existe.");
        }
    }

    public truncate(name: string) {
        const contextGlobal = this.getGlobal();
        if (contextGlobal.tables.has(name.toLowerCase())) {
            const table = contextGlobal.tables.get(name.toLowerCase())!;
            table.data = [];
            console.log("Tabla " + name + " truncada exitosamente.");
        } else {
            console.log("Error, la tabla " + name + " no existe.");
        }
    } 

    public delete(name: string, condition: Relational) {
        let columns_to_delete: number[] = [];
        let env: Environment | null = this;
        const contextGlobal = this.getGlobal();
        if (contextGlobal.tables.has(name.toLowerCase())) {
            const table = contextGlobal.tables.get(name.toLowerCase())!;
            const cols = table.columns;
            let type = condition.getType();
            if (condition.getLeftValue(env).type == null) {
                let id = condition.getLeftValue(env).value;
                let val = condition.getRightValue(env).value;
                for (const [key, value] of contextGlobal. tables) {
                    if (key.toLowerCase() == name.toLowerCase()) {
                        value.data.forEach((item, index) => {
                            if (type == 0) {
                                if (item[id].value == val) {
                                    columns_to_delete.push(index);

                                }
                            } else if (type == 1) {
                                if (item[id].value != val) {
                                    columns_to_delete.push(index);
                                }
                            } else if (type == 2) {
                                if (item[id].value < val) {
                                    columns_to_delete.push(index);
                                }
                            } else if (type == 3) {
                                if (item[id].value <= val) {
                                    columns_to_delete.push(index);
                                }
                            } else if (type == 4) {
                                if (item[id].value > val) {
                                    columns_to_delete.push(index);
                                }
                            } else if (type == 5) {
                                if (item[id].value >= val) {
                                    columns_to_delete.push(index);
                                }
                            }
                        });
                    }
                }
            } else if (condition.getRightValue(env).type == null) {
                let val = condition.getLeftValue(env).value;
                let id = condition.getRightValue(env).value;
                for (const [key, value] of contextGlobal. tables) {
                    if (key.toLowerCase() == name.toLowerCase()) {
                        value.data.forEach((item, index) => {
                            if (type == 0) {
                                if (item[id].value == val) {
                                    columns_to_delete.push(index);
                                }
                            } else if (type == 1) {
                                if (item[id].value != val) {
                                    columns_to_delete.push(index);
                                }
                            } else if (type == 2) {
                                if (item[id].value < val) {
                                    columns_to_delete.push(index);
                                }
                            } else if (type == 3) {
                                if (item[id].value <= val) {
                                    columns_to_delete.push(index);
                                }
                            } else if (type == 4) {
                                if (item[id].value > val) {
                                    columns_to_delete.push(index);
                                }
                            } else if (type == 5) {
                                if (item[id].value >= val) {
                                    columns_to_delete.push(index);
                                }
                            }
                        });
                    }
                }
            }
            columns_to_delete.sort((a, b) => b - a);
            for (let i = 0; i < columns_to_delete.length; i++) {
                let index = columns_to_delete[i];
                table.data.splice(index, 1);
            }
            console.log("Registro(s) eliminado(s) de la tabla " + name + " exitosamente.");
        } else {
            console.log("Error, la tabla " + name + " no existe.");
        }
    }

    public getGlobal(): Environment {
        let env: Environment | null = this;
        while (env.prev != null) {
            env = env.prev;
        }
        return env;
    }
    
    public getTables() {
        const contextGlobal = this.getGlobal();
        console.log("Nombre de todas las tablas: ");
        for (const [key, value] of contextGlobal.tables) {
          console.log(key);
          console.log("Nombre de todas las columnas: ");
          value.columns.forEach((col) => {
            console.log(col);
          });
          console.log("Nombre de todos los campos: ");
          value.data.forEach((value) => {
            console.log(value);
          });
        }
    }

}