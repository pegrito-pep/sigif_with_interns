<template>
    <div>
        <RejectionModal ref="rejectmodal">
            <template #content>
                <div style="height:15px;padding:.5rem">
                    <span>La page est arrivée à expiration.Cliquez sur OK pour continuer.</span>
                </div>
            </template>
            <template #footer-buttons>
                <div style="margin:.5rem;display:flex;justify-content: flex-end;">
                    <a href="#" style="color:green;" @click.prevent="handleLogout" class="link-import-file" >&nbsp;OK</a>
                </div>
            </template>
            <template #close>
                <span></span>
            </template>
        </RejectionModal>
        <PopupRejectModal ref="popupmodal" :largeur="Number('700')">
            <p class="p-1 text-center">Votre session est sur le point d'expirer.Faites bouger la souris ou pressez une touche pour annuler...</p>
        </PopupRejectModal>
    </div>
    
</template>
<script>
    import RejectionModal from '@/components/utils/RejectionModal.vue' 
    import PopupRejectModal from '@/components/utils/PopupRejectModal.vue' 
    export default{
        components:{RejectionModal,PopupRejectModal},
        props:{
            logout:{
                type:Function,
                required:false
            }
        },
        data(){
            return{
                events:['click','mousemove','scroll','keypress','resize'],
                warningTimer:null,
                logOutTimer:null,
                warningZone:false,
                isLogingOut:false
            }
        },
        mounted(){
            this.events.forEach(event=>{
                window.addEventListener(event,this.resetTimer)
            })
            this.setTimers()
            // this.setTimer2()
        },
        destroyed(){
            this.events.forEach(event=>{
                window.removeEventListener(event,this.resetTimer)
            })
            this.resetTimer()
        },
        methods:{
            resetTimer(){
                // this.setTimers()
                // console.log('entrée resettimer')
                clearTimeout(this.logOutTimer)
                clearTimeout(this.warningTimer)
                if(this.isLogingOut){
                    this.isLogingOut=true
                    // console.log(this.isLogingOut)
                }
                this.setTimers()
                // this.setTimer2()
            },
            setTimers(){
                this.warningTimer=setTimeout(this.warningMessage,3600000*10)
                this.logOutTimer=setTimeout(this.warningLogOut,3600000*10)
                if(this.$refs.popupmodal) this.$refs.popupmodal.close()
            },
            warningMessage(){
                if(!this.isLogingOut){
                    // console.log('logingout dans warningmessage',' ',this.isLogingOut)
                    if(this.$refs.popupmodal) this.$refs.popupmodal.open()
                }
                
                // this.logOutTimer=setTimeout(this.warningLogOut,10000)
                // alert("WARNING")
            },
             async warningLogOut(){
                // window.removeEventListener('mouseover',this.resetTimer)
                if(this.$refs.popupmodal) this.$refs.popupmodal.close()
                this.isLogingOut=true
                storage.clear()
                this.$store.dispatch('LogOut')
                if(this.$refs.rejectmodal){
                    const ok=await this.$refs.rejectmodal.show({
                    title: 'Page arrivée à expiration.'
                })
                }
                
                // clearTimeout(this.warningTimer)
                
                // clearTimeout(this.warningMessage)

                
                
                
            },
            handleLogout(){
                this.$router.push({
                name: 'login',
            })
            }
        }
    }
</script>
<style scoped>
    .link-import-file{
        font-family: 'Verdana';
        font-size: 13px;
        text-align: right;
        color: #333333;
        padding: 0px 6px 0px 0px;
        font-weight: normal;
    }
    .link-import-file:hover{
        color: #82c138;  
    }
</style>
