// enum Gender {
//   MALE = "MALE",
//   FEMAL= "FEMALE"
// }

// class Person {
//   public name:string = ""
//   public age:number = 0
//   public gender:Gender
//   protected secret:string
//   constructor(name:string, age:number, gender:Gender, secret:string){
//     this.name = name
//     this.age = age
//     this.gender = gender
//     this.secret = secret
//   }
// }
// class Student extends Person{
//   course:string
//   constructor(name:string, age:number, gender:Gender, secret:string, course:string){
//     super(name, age, gender, secret)
//       this.course = course
//   }
//   logSecret(){
//     console.log(this.secret)
//   }

//   set  pass(secret :string){
//     this.secret = secret
//   }

//   get  pass(){
//     return this.secret
//   }

// }

// const person  = new Person("John", 33, Gender.MALE, "qwer12345");
// const student  = new Student("John", 33, Gender.MALE, "qwer12345","2");

// student.logSecret()
// console.log(student.pass);
// student.pass ="12"

// console.log(student.pass);

abstract class DB {
    db: string = ''
    name: string
    host: string
    port: string
    password: string
    user: string
    constructor(
        name: string,
        host: string,
        port: string,
        password: string,
        user: string,
    ) {
        this.name = name
        this.host = host
        this.password = password
        this.user = user
        this.port = port
    }
    connection() {
        this.db = 'CONNECTIOn'
    }

    create(data: any) {}
    update(id: string, data: any) {}
    findOne(id: string) {}
    find() {}
    delete(id: string) {}
}

class SQLDB extends DB {
    constructor(
        name: string,
        host: string,
        port: string,
        password: string,
        user: string,
    ) {
        super(name, host, port, password, user)
    }
}

class NOSQLDB extends DB {
    constructor(
        name: string,
        host: string,
        port: string,
        password: string,
        user: string,
    ) {
        super(name, host, port, password, user)
    }
}

const pg = new SQLDB('postgres', 'localhost', '5432', 'postgres', 'postgres')

// const db =  new DB()
