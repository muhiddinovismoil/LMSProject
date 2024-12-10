// function LogClass(target: any) {
//     console.log(`Class created: ${target.name}`)
// }

// @LogClass
// class ToDo {
//     // Properties and methods of the ToDo class
// }

// class A {}

// const todo = new ToDo()

// function LogProperty(target: any, propertyKey: string) {
//     console.log({
//         target,
//         propertyKey,
//     })

//     console.log(`Property created: ${propertyKey}`)
// }

// class ToDo {
//     @LogProperty
//     title: string
//     age: number = 1

//     constructor(title: string) {
//         this.title = title
//     }
// }

// const todo = new ToDo('Learnig ts')

// function LogMethod(
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor,
// ) {
//     const originalMethod = descriptor.value

//     descriptor.value = function (...args: any[]) {
//         console.log(
//             `Method called: ${propertyKey} with arguments: ${JSON.stringify(args)}`,
//         )
//         return originalMethod.apply(this, args)
//     }

//     return descriptor
// }

// class ToDo {
//     title: string

//     constructor(title: string) {
//         this.title = title
//     }

//     @LogMethod
//     markAsCompleted() {
//         console.log(`ToDo completed: ${this.title}`)
//     }
// }

// const todo = new ToDo('learnign ts')

// todo.markAsCompleted()

function LogParameter() {
    return function (target: any, propertyKey: string, parameterIndex: number) {
        console.log({
            target,
            propertyKey,
            parameterIndex,
        })

        console.log(
            `Parameter called: ${propertyKey}, index: ${parameterIndex}`,
        )
    }
}

class ToDo {
    title: string

    constructor(title: string) {
        this.title = title
    }

    markAsCompleted(
        @LogParameter() isCompleted: boolean,
        @LogParameter() num: number,
    ) {
        console.log(`ToDo status: ${this.title}, completed: ${isCompleted}`)
    }
}

const todo = new ToDo('TS')

todo.markAsCompleted(false, 1)
