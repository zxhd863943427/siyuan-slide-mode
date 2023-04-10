<script setup lang="ts">
import { ref } from 'vue'

import { Marp } from "@marp-team/marp-core"
import { Element } from '@marp-team/marpit'


const props = defineProps({
    markdownText: String
})

var marp = new Marp({

  slideContainer: new Element('section', { class: 'slide' })
})

 var { html, css } = marp.render(props.markdownText??"")

// console.log(html)


function fullScreen() {
  var htmlDom:HTMLDivElement = document.querySelector("#marp-slide")??document.createElement("div")
  htmlDom.requestFullscreen()
  htmlDom.style.cssText= "zoom:4"
}
</script>

<template>
  <div id="marp-slide">
    <div v-html="html"></div>
    <component is="style">
      {{ css.replace("div.marpit>section", "div.marpit section") }}
    </component>
  </div>
  <div class="bespoke-marp-osc" v-on:click="fullScreen()">full</div>
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

#marp-slide{
  height:300px;
  width:300px
}
</style>