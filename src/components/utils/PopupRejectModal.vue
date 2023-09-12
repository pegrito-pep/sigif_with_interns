<template>
    <!--<transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="window" :style="{'width': largeur + 'px !important'}" id="cover">
                <slot></slot>
            </div>
        </div>
    </transition>-->
    <transition name="fade">
        <div class="popup-modal" @keydown.esc="isVisible = false" v-if="isVisible">
            <div class="window" :style="{'width': largeur + 'px !important'}"  id="cover">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'PopupModal',
    props: {
        largeur: {type:Number},
    },
    data: () => ({
        isVisible: false,
    }),

    methods: {
        open() {
            this.isVisible = true
        },

        close() {
            this.isVisible = false
        },
    },
}
</script>

<style scoped>

#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 12vw 20vh;
    background-position: center;
    background-repeat: no-repeat;
}

/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }

.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 1000;
}

.window {
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}
</style>