type ObjectDescriptor<D, M> = {
    data?: D
    methods?: M & ThisType<D & M> // `ThisType` yordamida kontekstni aniqlaymiz
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {}
    let methods: object = desc.methods || {}
    return { ...data, ...methods } as D & M
}

let obj = makeObject({
    data: { x: 10, y: 20 },
    methods: {
        moveBy(dx: number, dy: number) {
            this.x += dx // `this` `data` va `methods` aralashmasi sifatida aniqlanadi
            this.y += dy
        },
    },
})

obj.moveBy(5, 5)
console.log(obj) // { x: 15, y: 25, moveBy: [Function: moveBy] }
