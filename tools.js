// 格式化日期
export function formatDate(date){
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}


// 生成随机整数
export function getRandom(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}


// 检查设备上的触摸支持
const touchSupported = () => ('ontouchstart' in window || DocumentTouch && document instanceof DocumentTouch)

// 在网页上获取选定的文本
const getSelectedText = () => window.getSelection().toString()

// 复制到剪切板
function copyToClipboard(content){
    let textArea = document.createElement('textarea')
    document.body.appendChild(textArea)
    textArea.value = content
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
}

navigator.clipboard.readText().then(res => {
    console.log(res)
})

navigator.clipboard.writeText('navigator.clipboard.writeText').then(res => {
    console.log(res)
})

// 是否是移动端
console.log(navigator.userAgent.toLowerCase().match(/(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null)

// 全屏切换
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}