type Suite = {
    id: number
    name: string
    suitevalues: string
    public: boolean
}

export default function getSuites(){
    return new Promise<Suite>((resolve)=>{
        fetch('http://127.0.0.1:8090/api/suite').then((response)=>{
            resolve(response.json().then((data)=>data))
        })
    })
}