const a = () => {
    console.log('end')
}

const b = () => {
    a()
}

const c = () => {
    b()
}

const d = () => {
    c()
}

d()
