<template>
    <transition name="fade">
        <div class="popup-modal" v-if="isVisible" @keydown.esc="isVisible=false">
            <div class="window" id="cover" :style="{'width': largeur + 'px !important'}">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'PopupModal',

    data: () => ({
        isVisible: false,
    }),
    props: {    
        largeur: {type:Number, default: 450 },
    },
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
/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 12vw 20vh;
    background-position: left;
    background-repeat: no-repeat;
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
