<template>
    <popup-modal-csv ref="popup">
        <div class="setBg">
            <span class="h6 font-weight-bold">Mettre à jour le fichier</span>
        </div>
        <p class="mt-2">
            <span>Fichier csv</span>
            <input type="file">
        </p>
        <div class="btns">
            <button class="mx-2" @click="_confirm">{{ okButton }}</button>
            <button class="cancel-btn" @click="_cancel">{{ cancelButton }}</button>
        </div>
    </popup-modal-csv>
</template>

<script>
import PopupModalCsv from './PopupModalCsv.vue'

export default {
    name: 'ResetCsvBox',

    components: { PopupModalCsv },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Non', // text for cancel button
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
            this.okButton = opts.okButton
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
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
            // Or you can throw an error
            // this.rejectPromise(new Error('User cancelled the dialogue'))
        },
    },
}
</script>

<style scoped>
.btns {
    float:right;
}

.btns button { 
    font-family: 'Verdana';
    font-weight: normal;
    font-size: 13px;
    color: #333333;
    border-top: 1px solid #95B6D4;
    border-right: 1px solid #95B6D4;
    border-bottom: 1px solid #92B3D1;
    border-left: 1px solid #95B6D4;
    border-radius: 3px;
    background-image: -webkit-linear-gradient(top, #CCE2F6 0%, #B1D2F2 100%);
    text-decoration: none;
    white-space: nowrap;
    margin: 0px;
    padding-top: 1px;
    padding-bottom: 3px;
    padding: 1px 1px 0px 2px;
    padding-left: 9px;
    padding-right: 9px;
}

.ok-btn {

}

.cancel-btn {

}
.setBg{
    white-space: nowrap;
    height: 30px;
    background-image: url('~@/assets/img/1.jpg');
    background-repeat: repeat-x;
}
</style>