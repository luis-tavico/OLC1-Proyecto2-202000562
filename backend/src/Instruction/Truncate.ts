import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Singleton } from "../Singleton/Singleton";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";

export class Truncate extends Instruction {

    constructor(line: number, column: number, private value: Expression, private figure: Expression) {
        super(line, column);
    }

    public execute(environment: Environment) {

        const value = this.value.execute(environment);
        const figure = this.figure.execute(environment);
        const singleton = Singleton.getInstance()

        if (value.value !== null) {
            let parts = value.value.toString().split('.');
            let integer = parts[0];
            let tenths = parts[1].substring(0, figure.value)
            singleton.addConsole(integer+"."+tenths);
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