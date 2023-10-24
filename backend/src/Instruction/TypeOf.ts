import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Singleton } from "../Singleton/Singleton";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";

export class TypeOf extends Instruction {

    constructor(line: number, column: number, private value: Expression) {
        super(line, column);
    }

    public execute(environment: Environment) {

        const value = this.value.execute(environment);
        const singleton = Singleton.getInstance()

        if (value.value !== null) {
            if (value.type == 0) { singleton.addConsole('INT'); 
            } else if (value.type == 1) { singleton.addConsole('DOUBLE');
            } else if (value.type == 2) { singleton.addConsole('DATE');
            } else if (value.type == 3) { singleton.addConsole('VARCHAR');
            } else if (value.type == 4) { singleton.addConsole('BOOLEAN');
            } else { singleton.addConsole('UNDEFINED');}
        }

    }

    getCharacterArray(type: number): string {
        let value: any;
        if (type == Type.VARCHAR)
            value = '"'
        else
            value = ''

        return value
    }
}