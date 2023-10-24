import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { Singleton } from "../Singleton/Singleton";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Symbol/Type";

export class Round extends Instruction {

    constructor(line: number, column: number, private value: Expression, private figure: Expression) {
        super(line, column);
    }

    public execute(environment: Environment) {

        const value = this.value.execute(environment);
        const figure = this.figure.execute(environment);
        const singleton = Singleton.getInstance()

        if (value.value !== null) {
            singleton.addConsole(value.value.toFixed(figure.value));
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