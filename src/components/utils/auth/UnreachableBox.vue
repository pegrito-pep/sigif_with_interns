<template>
    <data-modal ref="popup">
        <div class="header">
            <h2 class="mt-0 font-weight-bold" style="font-size: 16px">{{ title }}</h2>
            <button type="button"  @click="_close" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="jconfirm-title-c d-flex justify-content-center align-items-center"><span class="jconfirm-icon-c">
            <i class="fa fa-times format-icon"></i></span>
        </div>
        <div class="jconfirm-content-pane no-scroll" style="transition-duration: 0.4s; transition-timing-function: cubic-bezier(0.36, 0.55, 0.19, 1); max-height: 215.031px;">
            <div class="jconfirm-content format-message"><div>impossible de joindre le serveur</div></div>
        </div>
    </data-modal>
</template>

<script>
import DataModal from '@/components/utils/DataModal.vue';

export default {
    name: 'UnreachableApiBox',

    components: { DataModal },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
           
            // Once we set our config, we tell the popup modal to open
            this.$refs.popup.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },

         _close() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },
    },
}
</script>
<style scoped>

.format-message{
    text-align: center;
    font-size: 20px;
    color: #201e1e; 
}
.format-title{
    color: rgba(0, 0, 0, 0.87);
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px; 
}
.format-icon{
    font-size: 69px;
	color: #e74c3c !important;
	font-weight: 900;
	vertical-align: middle; 
}
.header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-image: url('~@/assets/images/image.png');
    height: 20px!important;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 2px 2px;
}

.close {
    margin-top: -2px;
    font-size: 22px;
}


.btns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
}
.ok-btn {
    border: none;
    height: 40px;
    text-align: center;
    background-color: rgb(0, 82, 44) !important;
    color: white;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.cancel-btn {
    border: none;
    width: 100px;
    height: 40px;
    text-align: center;
    background: rgba(167, 162, 162, 0.568);
    color: black;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.check { 
    background: #6c757d;
    height: 60px;
    width: 60px;
    border-radius:  50%;
    display: flex;
    align-items: center;
    justify-content: center;
}


</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
