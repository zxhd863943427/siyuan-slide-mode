import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

import {Marp} from "@marp-team/marp-core"

var marp = new Marp()
const {html, css} = marp.render('# 制卡故障\n\n开头部分\n\n---\n\n## 第一页\n\n一些测试文本\n\n---\n\n## 第二页\n\n$$\n\\sum_2^12x_2^2+2x^2\n$$\n\n‍\n')
console.log(html,css)
