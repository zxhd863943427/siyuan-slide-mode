import { createApp } from 'vue'
import App from './App.vue'
import TopButton from './components/TopButton.vue'
import {以id获取文档块markdown as getMarkdown} from "./utils/getMd"
import {getFileID} from "./utils/utils"

import { from } from "bespoke/lib/bespoke"
import * as keys from 'bespoke-keys';
import * as cube from "bespoke-theme-cube"
import * as scale from "bespoke-scale"
import * as voltaire from "bespoke-theme-voltaire"
import * as progress from "bespoke-backdrop"
import * as backdrop from "bespoke-progress"



import { Plugin, Menu, clientApi } from 'siyuan'

export default class CardPlugin extends Plugin{
    public el: HTMLElement
    constructor() {
        super()
        this.el = document.createElement('div')
        this.el.classList.add('toolbar__item', 'b3-tooltips', 'b3-tooltips__se')
        this.el.setAttribute('aria-label', '点击生成演示')
    }

    async onload() {
        //加载本地配置
        const button = createApp(TopButton)
        button.mount(this.el)

        //添加右键打开菜单功能
        this.el.addEventListener('click', async (event) => {
            const menu = document.createElement('div')
            menu.id = "slide"
            let fileId = getFileID()
            console.log(fileId)
            let markdownText = await getMarkdown(fileId)
            console.log(markdownText)
            const app = createApp(App,{markdownText:markdownText.content})
            app.mount(menu)
            new Menu('CardPlugin').addItem({ element: menu }).showAtMouseEvent(event)
            from({ parent: '#slide .marpit' }, [
                voltaire.default(),
                keys.default(),
                scale.default("tranform"),
                progress.default(),
                backdrop.default(),
                scale.default()]);
            event.stopPropagation()
        })
        clientApi.addToolbarLeft(this.el)

    }
    async onunload() {
        this.el && this.el.remove();
    }

}