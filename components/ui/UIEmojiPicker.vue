<template>
  <div class="input-wrapper">
    <slot />
    <div class="smiley-picker" :style="'right: ' + (10 + rightOffset) + 'px'">

        <span
          @click="areSmileysShown = !areSmileysShown"
          class="click smiley-icon"
          ><i class="las la-grin"></i
        ></span>
              <div class="smiley-list"  v-if="areSmileysShown">
        <div
         
          class="smiley-list-content"
          v-click-outside="showSmileys"
        >
          <span
            v-for="(smiley, key) in smileys"
            :key="key"
            @click="chooseSmiley(smiley)"
            class="click"
            >{{ smiley }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rightOffset: {
      type: Number,
    },
  },
  data() {
    return {
      areSmileysShown: false,
      smileys: [
        "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙","😚","🙂","🤗","🤔","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","😴","😌","🤓","😛","😜","😝","🤤","😒","😓","😔","😕","🙃","🤑","😲","🙁","😖","😞","😟","😤","😢","😭","😦","😧","😨","😩","😬","😰","😱","😳","😵","😡","😠","😇","🤠","🤡","🤥","😷","🤒","🤕","🤢","🤧","😈","👹","👺","💀","☠","👻","👽","👾","🤖","💩","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🙈","🙉","🙊","👦","👦🏻","👦🏼","👦🏽","👦🏾","👦🏿","👧","👧🏻","👧🏼","👧🏽","👧🏾","👧🏿","👨","👨🏻","👨🏼","👨🏽","👨🏾","👨🏿","👩","👩🏻","👩🏼","👩🏽","👩🏾","👩🏿","👴","👴🏻","👴🏼","👴🏽","👴🏾","👴🏿","👵","👵🏻","👵🏼","👵🏽","👵🏾","👵🏿","👶","👶🏻","👶🏼","👶🏽","👶🏾","👶🏿","👼","👼🏻","👼🏼","👼🏽","👼🏾","👼🏿","👮","🕵","💂","👷","👳","👳🏻","👳🏼","👳🏽","👳🏾","👳🏿","👱","👱🏻","👱🏼","👱🏽","👱🏾","👱🏿","🎅","👸","👸🏻","👸🏼","👸🏽","👸🏾","👸🏿","🤴","🤴🏻","🤴🏼","🤴🏽","🤴🏾","🤴🏿","👰","🤵","🤵🏻","🤵🏼","🤵🏽","🤵🏾","🤵🏿","🤰","👲","🙍","🚶","🚶🏻","🏃🏽","🏃🏾","🏃🏿","💃","🕺","👯","🕴","🗣","👤","👥","🤺","🏇","⛷","🏂","🏌","🚣","⛹","🏋","🏋🏻","🚴","🚵","🏎","🏍","🤸","🤼","🤽","🤾","🤹","👫","👬","👭","💏","👪","👩‍👩‍👦","👩‍👩‍👧","💪","💪🏻","💪🏼","💪🏽","💪🏾","💪🏿","🤳","👈","👉","☝","👆","🖕","👇","✌","🤞","🖖","🤘","🤙","🖐","✋","👌","👍","👎","✊","👊","🤛","🤜","🤚","👋","👏","✍","🙌","🙏","🤝","💅","👂","👃","👣","👀","👁","👁‍🗨","👅","👄","💋","💘","❤","💓","💔","💕","💖","💗","💙","💚","💛","💜","🖤","💝","💞","💟","❣","💌","💤","💢","💣","💥","💦","💨","💫","💬","🗨","🗯","💭","🕳","👓","🕶","👔","👕","👖","👗","👘","👙","👚","👛","👜","👝","🛍","🎒","👞","👟","👠","👡","👢","👑","👒","🎩","🎓","⛑","📿","💄","💍","💎","🐵","🐒","🦍","🐶","🐕","🐩","🐺","🦊","🐱","🐈","🦁","🐯","🐅","🐆","🐴","🐎","🦌","🦄","🐮","🐂","🐃","🐄","🐷","🐖","🐗","🐽","🐏","🐑","🐐","🐪","🐫","🐘","🦏","🐭","🐁","🐀","🐹","🐰","🐇","🐿","🦇","🐻","🐨","🐼","🐾","🦃","🐔","🐓","🐣","🐤","🐥","🐦","🐧","🕊","🦅","🦆","🦉","🐸","🐊","🐢","🦎","🐍","🐲","🐉","🐳","🐋","🐬","🐟","🐠","🐡","🦈","🐙","🐚","🦀","🦐","🦑","🦋","🐌","🐛","🐜","🐝","🐞","🕷","🕸","🦂","💐","🌸","💮","🏵","🌹","🥀","🌺","🌻","🌼","🌷","🌱","🌲","🌳","🌴","🌵","🌾","🌿","☘","🍀","🍁","🍂","🍃","🍇","🍈","🍉","🍊","🍋","🍌","🍍","🍎","🍏","🍐","🍑","🍒","🍓","🥝","🍅","🥑","🍆","🥔","🥕","🌽","🌶","🥒","🍄","🥜","🌰","🍞","🥐","🥖","🥞","🧀","🍖","🍗","🥓","🍔","🍟","🍕","🌭","🌮","🌯","🥙","🥚","🍳","🥘","🍲","🥗","🍿","🍱","🍘","🍙","🍚","🍛","🍜","🍝","🍠","🍢","🍣","🍤","🍥","🍡","🍦","🍧","🍨","🍩","🍪","🎂","🍰","🍫","🍬","🍭","🍮","🍯","🍼","🥛","☕","🍵","🍶","🍾","🍷","🍸","🍹","🍺","🍻","🥂","🥃","🍽","🍴","🥄","🔪","🏺","🌍","🌎","🌏","🌐","🗺","🗾","🏔","⛰","🌋","🗻","🏕","🏖",
      ]
    };
  },
  methods: {
    chooseSmiley(smiley) {
      this.$emit("addSmiley", smiley);
    },
    showSmileys() {
      if (this.areSmileysShown) {
        this.areSmileysShown = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}
.smiley-picker {
  position: absolute;
  right: 10px;
  top: 5px;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */ 
}
.smiley-icon {
  font-size: 20px;
  opacity: 0.75;

  &:hover {
    opacity: 1;
  }
}
.smiley-list {
  min-width: 165px;
  position: absolute;
  font-size: 14px;
  top: 0;
  right: -14px;
  z-index: 4;
  transform: translateY(-100%);
  background: white;

  border-radius: 5px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);

  &::after {
    content: " ";
    position: absolute;
    top: 99%; /* At the bottom of the tooltip */
    right: 20px;
    margin-left: -7px;
    border-width: 6px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
}
.smiley-list-content {
  padding: 8px 14px;
  max-height: 150px;
  overflow-y: scroll;    
}
</style>