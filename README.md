# choose-images

simple choose image video audio file

## Install

`npm install --save choose-images`

## Usage

For vue-cli user:

```javascript
import choose from 'choose-images'
```

For standalone usage:

```html
<script src="../../src/index.js" type="module"></script>
```

## Sample

```html
<body>
    <div id="app">
        <button v-on:click="chooseImage">选择图片</button>
        <h1>获取到的图片信息:{{images}}</h1>
    </div>
</body>
<script type="text/javascript" src="https://unpkg.com/vue"></script>
<script type="module">
    import choose from '../../src/index.js'
    new Vue({
        el: "#app",
        data: {
            images: ''
        },
        methods: {
            chooseImage: async function () {
                const res = await choose({ type: 'video' })
                this.images = JSON.stringify(res)
            }
        }
    })
</script>
```

## Sample 2

```html
<body>
    <button id='btn'>选择图片</button>
</body>
<script src="../../src/index.js" type="module"></script>
<script type="module">
    document.getElementById('btn').onclick = function () {
        choose({
            type: 'image',
            count: 9
        })
            .then(res => {
                console.log(res)
                document.body.append(JSON.stringify(res))
            })
            .catch(err => {
                console.log(err)
            })
    }
</script>

```

## Remarks
html5 most Android multi file selections are not supported.

## more infomation
(MDN Web)[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input]
