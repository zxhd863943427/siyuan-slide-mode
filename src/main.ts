import { createApp } from 'vue'
import App from './App.vue'
import TopButton from './components/TopButton.vue'
import { getFileID } from "./utils/utils"

import { from } from "bespoke/lib/bespoke"
import * as keys from 'bespoke-keys';
import * as cube from "bespoke-theme-cube"
import * as scale from "bespoke-scale"
import * as voltaire from "bespoke-theme-voltaire"
import * as progress from "bespoke-backdrop"
import * as backdrop from "bespoke-progress"
import * as bullets from "bespoke-bullets"



import { Plugin, Menu, Dialog, clientApi, serverApi } from 'siyuan'


export default class CardPlugin extends Plugin {
    public el: HTMLElement
    public settingConfig
    constructor() {
        super()
        this.el = document.createElement('div')
        this.el.classList.add('toolbar__item', 'b3-tooltips', 'b3-tooltips__se')
        this.el.setAttribute('aria-label', '点击生成演示')
        this.settingConfig = {"ListBullet":"noThing"}
    }

    async onload() {
        //创建按钮
        const button = createApp(TopButton)
        button.mount(this.el)

        //添加右键打开菜单功能
        this.el.addEventListener('click', this.openSlide())
        clientApi.addToolbarLeft(this.el)
        //注册打开当前文档的演示模式
        this.registerCommand({
            command: "show slide mode",
            shortcut: "",
            description: "打开当前文档的演示模式",
            callback: this.openSlide()
        })
        this.registerCommand({
            command: "show slide mode",
            shortcut: "",
            description: "切换演示模式列表渐进模式动画",
            callback: ()=>{
                this.settingConfig["ListBullet"] = (this.settingConfig["ListBullet"] === "li") ? "noThing" : "li"
            }
        })

    }
    private openSlide(): (this: HTMLElement, ev: MouseEvent) => any {
        return async (event) => {
            // Dialog.destroy();
            let dialog = new Dialog({ content: '<div id="slide-dialog"></div>' });
            console.log(dialog)

            let fileId = getFileID()
            console.log(fileId)
            let markdownText = await serverApi.exportMdContent(fileId)
            console.log(markdownText)
            const app = createApp(App, { markdownText: markdownText.content })
            app.mount(dialog.element.querySelector("#slide-dialog")??document.createElement('div'))
            // new Menu('CardPlugin').addItem({ element: menu }).showAtMouseEvent(event)
            from({ parent: '#slide-dialog .marpit' }, [
                voltaire.default(),
                // bullets.default("li"),
                bullets.default(
                    this.settingConfig["ListBullet"]
                    ),
                keys.default(),
                scale.default("tranform"),
                progress.default(),
                backdrop.default(),
            ])
            if (event != null && event.stopPropagation != null){
                console.log("stop")
                event.stopPropagation()
            }
        }
    }
    async onunload() {
        this.el && this.el.remove();
    }

}