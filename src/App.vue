<script setup lang="ts">
import { ref } from 'vue'

import { Marp } from "@marp-team/marp-core"
import { Element } from '@marp-team/marpit'
import { mark } from "@mdit/plugin-mark"
import { sup } from "@mdit/plugin-sup"
import { sub } from "@mdit/plugin-sub"
import { tasklist } from "@mdit/plugin-tasklist"
import { align } from "@mdit/plugin-align"

var full = false;

const props = defineProps({
  markdownText: String
})

var marp = new Marp({

  slideContainer: new Element('section', { class: 'slide' }),
  html:true
})
.use(mark)
.use(sup)
.use(sub)
.use(tasklist)
.use(align)

var { html, css } = marp.render(props.markdownText ?? "")

// console.log(html)


function fullScreen() {
  var htmlDom: HTMLDivElement = document.querySelector("#marp-slide") ?? document.createElement("div")
  htmlDom.requestFullscreen()
  full = true;

  htmlDom.onfullscreenchange = (ev) => {
    if (full === true) {
      let bodyHeight = document.body.clientHeight
      let bodyWidth = document.body.clientWidth
      let zoomScale = Math.min(bodyWidth/740, bodyHeight/420)
      console.log(bodyHeight,bodyWidth,zoomScale)
      htmlDom.style.cssText = `zoom:${zoomScale}`
      full = false;
      return;
    }
    htmlDom.style.cssText = ""
  }
}
</script>

<template>
  <div id="marp-slide">
    <div v-html="html"></div>
    <component is="style">
      {{ css.replace("div.marpit>section", "div.marpit section") }}
    </component>
  </div>
  <div class="bespoke-marp-osc" v-on:click="fullScreen()">fullscreen</div>
</template>

<!-- <template>
<article id="presentation">
  <section>Slide 1</section>
  <section>Slide 2</section>
  <section>Slide 3</section>
</article>
  </template> -->

<style>
.marpit section {
  font-size: 50px;
  /* margin: 2em !important; */
}

.bespoke-marp-osc {
  background: rgba(0, 0, 0, .65);
  border-radius: 7px;
  bottom: 50px;
  color: #fff;
  contain: paint;
  display: block;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  left: 50%;
  line-height: 0;
  opacity: 1;
  padding: 12px;
  position: absolute;
  touch-action: manipulation;
  transform: translateX(-50%);
  transition: opacity 0.2s linear;
  user-select: none;
  white-space: nowrap;
  z-index: 1;

  /* Hack for Chrome to show OSC overlay onto video correctly */
  will-change: transform;

  /* View Transitions */
  view-transition-name: __bespoke_marp_transition_osc__;

}

#marp-slide {
  height: 420px;
  width: 740px;
}

#marp-slide .bespoke-slide{
  text-shadow: none !important;
}

div.marpit>section.slide>svg>foreignObject>section .task-list-item-checkbox {
    margin: 0 .2em .1em -.4em !important;
    zoom: 2;
}
</style>