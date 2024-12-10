namespace PersonValidation {
    export interface IStringValidator {
        isValid(str: string): boolean
    }
    export class Validator implements IStringValidator {
        isValid(str: string): boolean {
            return true
        }
    }
}

namespace AnimalValidation {
    export interface IStringValidator {
        isValid(str: string): boolean
    }
    export class Validator implements IStringValidator {
        isValid(str: string): boolean {
            return true
        }
    }
}

const person = new PersonValidation.Validator()
const animal = new AnimalValidation.Validator()
