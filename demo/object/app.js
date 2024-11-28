import { obj } from './index.js'

obj.name = 'vali'

function fn(prop) {
    prop.age = 77
}

fn(obj)
console.log(obj)
