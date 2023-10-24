import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Singleton } from "../Singleton/Singleton";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";

export class Upper extends Instruction {

    constructor(line: number, column: number, private value: Expression) {
        super(line, column);
    }

    public execute(environment: Environment) {

        const value = this.value.execute(environment);
        const singleton = Singleton.getInstance()

        if (value.value !== null) {
            singleton.addConsole(value.value.toUpperCase());
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