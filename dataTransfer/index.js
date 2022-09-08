// arraybuffer转json
fetch('http://localhost:3000/banner?type=2', {
            
}).then(res => {
    console.log(res);
    return res.arrayBuffer()
}).then(res => {
    console.log(res);
    /* let enc = new TextDecoder('utf-8')
    let data = JSON.parse(enc.decode(new Uint8Array(res)))
    console.log(data); */

    /* let blob = new Blob([res])
    let fr = new FileReader()
    fr.onload = function(){
        console.log(JSON.parse(this.result));
    }
    fr.readAsText(blob) */
})