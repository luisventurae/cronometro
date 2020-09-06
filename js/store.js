const load = () => {
    verifyStores()
}

const verifyStores = () => {
    let lastTime = localStorage.getItem('lst_time') // Ultima vez accedido
    let currentTime = localStorage.getItem('crt_time') // Fecha actual de acceso

    const now = new Date()
    if(!lastTime) {
        localStorage.setItem('lst_time', now)
        localStorage.setItem('crt_time', now)
    }else{
        localStorage.setItem('lst_time', currentTime)
        localStorage.setItem('crt_time', now)
    }
}

// Run Functions
load()