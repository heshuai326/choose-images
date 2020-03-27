
/**
 * 从本地相册选择图片、视频或使用相机拍照。
 * @param {Object} object 参数
 * @param {Object} [object.type] image video audio 
 * @param {string[]} [object.sourceType=['album', 'camera']] 选择图片的来源
 * @param {number} [object.count=9] 最多可以选择的图片张数
 * @param {string} [object.inputId] 用来上传的input元素
 */
const choose = function (options) {
    return new Promise((resolve, reject) => {
        if (Object.prototype.toString.call(options) !== '[object Object]') {
            const err = { msg: `choose:error options is not a object` }
            console.error(err)
            return reject(err)
        }

        const {
            type = 'image',
            sourceType = ['album', 'camera'],
            count = 1,
            inputId = 'inputId'
        } = options

        let numberCount = Number(count)
        if (isNaN(numberCount)) {
            numberCount
        }

        const res = {
            msg: 'choose:ok',
            temps: [],
            files: []
        }

        const obj = document.createElement('input')
        const acceptableSourceType = ['user', 'environment', 'camera']
        obj.setAttribute('type', 'file')
        obj.setAttribute('id', inputId)
        if (count > 1) {
            obj.setAttribute('multiple', 'multiple')
        }
        if (acceptableSourceType.includes(sourceTypeString)) {
            obj.setAttribute('capture', sourceTypeString)
        }
        obj.setAttribute('accept', `${type}/*`)
        obj.setAttribute('style', 'position: fixed;  top: -1000px;  z-index: -300')
        document.body.appendChild(obj)

        const input = document.getElementById(inputId)
        const inptEvent = document.createEvent('MouseEvents')
        inptEvent.initEvent('click', true, true)
        input.dispatchEvent(inptEvent)
        input.onchange = (e) => {
            const files = [...e.target.files]
            files && files.map(file => {
                const blob = new Blob([file], { type: file.type })
                const url = URL.createObjectURL(blob)
                res.files.push(url)
                res.temps.push({
                    path: url,
                    size: file.size,
                    type: file.type,
                    originFile: file
                })
                return resolve(res)
            })
        }
    })
}

window.choose = choose
export default choose
