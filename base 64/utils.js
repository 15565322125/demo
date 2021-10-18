/*
    Data URL 转 Blob 对象
*/
function dataUrlToBlob(dataurl, mimeType) {
    let bytes = window.atob(dataurl.split(",")[1]);
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
}

// 使用示例
let blob = dataUrlToBlob('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt');
console.log(blob);


/*
    Data URL 转 File 对象
*/
function dataUrlToFile(dataurl, filename) {
    let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

// 使用示例
let file = dataUrlToFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt');
console.log(file);


/*
    URL 转 File 对象
*/
function urlToFile(url, filename, mimeType) {
    return fetch(url).then((res) => {
        return res.arrayBuffer();
    }).then((buffer) => {
        return new File([buffer], filename, { type: mimeType });
    });
}

// 使用示例
urlToFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt', 'text/plain')
    .then(function (file) { console.log(file); });