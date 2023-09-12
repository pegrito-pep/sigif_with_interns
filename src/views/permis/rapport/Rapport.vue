<template>
    <div id="cover">
        <!-- PERMIS -->
       
        <b-row>
            <b-col cols="6" style="margin-top:-15px">
                    <b-button
                                :aria-expanded="visible5 ? 'true' : 'false'"
                                aria-controls="collapse5"
                            @click="visible5=!visible5" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                            <ul style="margin:0">
                                <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                    :class="{ 'collapse-open': visible5, 'collapse-close': !visible5 }">Permis
                                </li>
                            </ul>
                        </b-button>
                        <b-collapse id="collapse5" v-model="visible5" class="p-0 m-0">
                            <ul style="margin-left:1px;display: flex;">
                                <li class="mr-2">
                                    <b-link @click="showListingPermis" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des permis</b-link>
                                </li>
                            </ul>
                        </b-collapse>
            </b-col>
        </b-row>
        <PermisDialog ref="listingPermis"></PermisDialog>
        <!-- <div class="parent">
            parent
            <div class="child-one child">One</div>
            <div class="child-two child">Two</div>
            <div class="child-three child">Three</div>
        </div> -->
       <!-- <div class="element">

       </div> -->

       <!-- progres bar -->
       <!-- <div style="width:500px;height: 10px;background-color: cadetblue;">
            <div class="progress">

            </div>
       </div> -->

       <!-- Accordion -->
       <!-- <div class="accordion">
            <ul id="accordion">
                <li>
                    <label for="first">What is Accordion ? 
                        <span>&#x3e;</span>
                    </label>
                    <input type="radio" name="accordion" id="first"/>
                    <div class="content">
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus veniam, perspiciatis autem doloribus recusandae explicabo minus praesentium similique voluptates obcaecati voluptas. Minus quae eveniet iste doloribus aliquam! Non sit illo in. Beatae et numquam, fugiat modi sapiente animi ex quaerat provident? Unde assumenda odit dolore quia vel quas, vitae id.
                        </p>
                    </div>
                </li>
                <li>
                    <label for="second">How to Create an accordion? 
                        <span>&#x3e;</span>
                    </label>
                    <input type="radio" name="accordion" id="second"/>
                    <div class="content">
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus veniam, perspiciatis autem doloribus recusandae explicabo minus praesentium similique voluptates obcaecati voluptas. Minus quae eveniet iste doloribus aliquam! Non sit illo in. Beatae et numquam, fugiat modi sapiente animi ex quaerat provident? Unde assumenda odit dolore quia vel quas, vitae id.
                        </p>
                    </div>
                </li>
                <li>
                    <label for="third">Where to use an Accordion? 
                        <span>&#x3e;</span>
                    </label>
                    <input type="radio" name="accordion" id="third"/>
                    <div class="content">
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus veniam, perspiciatis autem doloribus recusandae explicabo minus praesentium similique voluptates obcaecati voluptas. Minus quae eveniet iste doloribus aliquam! Non sit illo in. Beatae et numquam, fugiat modi sapiente animi ex quaerat provident? Unde assumenda odit dolore quia vel quas, vitae id.
                        </p>
                    </div>
                </li>
            </ul>
       </div> -->

       <!-- <ul class="navlist">
            <li>
                <a href="">Scrimba</a>
                <div class="nav-item">
                    First content
                </div>
            </li>
            <li>
                <a href="">Learn Flexbox</a>
                <div class="nav-item">
                    Second content
                </div>
            </li>
            <li>
                <a href="">First Flexbox layout - Tutorial</a>
                <div class="nav-item">
                    Third content
                </div>
            </li>
       </ul> -->

       <!-- Neumorphism accordion -->
       <!-- <div class="accordion2">
            <ul  class="accordion">
                <li>
                    <input type="radio" name="accordion2" id="first"/>
                    <label for="first">Products</label>
                    <div class="content">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus cumque voluptate nisi praesentium reprehenderit nemo. Non nam mollitia, rem maxime esse, sit optio expedita voluptatum ipsam modi id accusamus eum voluptatibus. Perferendis suscipit atque, maxime cumque blanditiis nostrum necessitatibus aut doloremque facilis et! Sequi, expedita enim! Eos exercitationem dolore inventore?</p>
                    </div>
                </li>
            </ul>
       </div> -->
    </div>
</template>
<script>
    import PermisDialog from '@/components/utils/rapport/permis/MultiUsageDialog.vue'
    export default{
        data(){
            return{
                // visible:false,
                // visible1:false,
                // visible2:false,
                // visible3:false,
            //     visible4:false,
                visible5:false,
                // visible6:false,
            //     visible7:false,
            //     visible8:false,
            //     visible9:false,
            //     visible10:false,
            //     visible11:false,
            //     visible12:false,
            //     visible13:false,
            //     visible14:false,
            //     visible15:false,
            commande:'',
            pdf:{
                datedebut:'',
                datefin:'',
                typeTitre:'',
                nroTitre:'',
                nroPermis:'',
                acceptPosition:false,
            },
            json_create_concessionCD:{
                typedetitre:'',
                numerotitre:'' /* obligatoire*/,
                entiteforestiere:'' /* obligatoire*/,
                superficie:12,
                nroconventionCD:11,
                dateconvention:'01/01/2021',
                dureeconvention:'',
                attestationconformite:'url du fichier',
                nrocautionnement:'',
                datecautionnement:'01/01/2021',
                datefincautionnement:'01/01/2021',
                caution:'url du fichier',
                nronotificationapprobation:'',
                planamenagement:'url du fichier',
                montantoffre:12,
                cahierdeschargesCD:'url du fichier',
                montanttotalRFA:15,
                arreteapprobation:'url du fichier',

                // rapport des études socioéconomiques
                nro:11,
                date:'01/01/2021',
                document:'url du fichier',

                // procès verbal
                nro:22,
                date:'01/01/2021',
                document:'url du fichier',

                // carte d'affectation des terres
                nro:22,
                date:'01/01/2021',
                document:'url du fichier',

                // plan d'approvisionnement alimentaire
                nro:22,
                date:'01/01/2021',
                document:'url du fichier',

                // note de service interdiction braconnage
                nro:22,
                date:'01/01/2021',
                document:'url du fichier',

                // note de service sanctions
                nro:22,
                date:'01/01/2021',
                document:'url du fichier',

                // localistion
                arrondissement:'',

                // détails des essences interdites (nom commercial)
                essencesinterdites:['essence1','essence2'],

                // détails des essences sous aménagement
                essencesamenagement:['essence1','essence2'],

                // contrat de partenariat industriel
                contrats:[{
                    raisonsociale:'',
                    sigle:'',
                    numrocontrat:'',
                    datecontrat:'01/01/2021',
                    numeroacte:'',
                    dateacte:'01/01/221'
                }]
            },
            json_create_concessionCP:{
                typedetitre:'',
                numerotitre:'' /* obligatoire*/,
                entiteforestiere:'' /* obligatoire*/,
                superficietotale:12, /* en hectares */
                numeroarreteattribution:11,
                dateattribution:'01/01/2021',
                dureeconvention:'',
                fichierconvention:'url du fichier',
                nrocautionnement:'',
                datecautionnement:'01/01/2021',
                datefincautionnement:'01/01/2021',
                fichiercaution:'url du fichier',
                planamenagement:'url du fichier',
                montantoffre:12,
                cahierdeschargesCD:'url du fichier',
                montanttotalRFA:15,

                // avis d'appel d'offres
                nro:11,
                date:'01/01/2021',
                document:'url du fichier',

                // récépissé du dépôt de dossiers
                nro:22,
                date:'01/01/2021',
                document:'url du fichier',

                // plan d'approvisionnement alimentaire
                nro:22,
                date:'01/01/2021',
                document:'url du fichier',

                // note de service interdiction braconnage
                nro:22,
                date:'01/01/2021',
                document:'url du fichier',

                // note de service sanctions
                nro:22,
                date:'01/01/2021',
                document:'url du fichier',

                // localistion
                arrondissement:'',

                // détails des essences interdites (nom commercial)
                essencesinterdites:['essence1','essence2'],

                // contrat de patenariat industriel (répartition des superficies par arrondissment)
                essencesamenagement:[
                    {
                        raisonsociale:'',
                        sigle:'',
                        numrocontrat:'',
                        datecontrat:'',
                        numeroacteapprobation:12,
                        dateacteapprobation:'01/01/2021'
                    }
                ],

                // contrat de partenariat industriel
                contrats:[{
                    raisonsociale:'',
                    sigle:'',
                    numrocontrat:'',
                    datecontrat:'01/01/2021',
                    numeroacte:'',
                    dateacte:'01/01/221'
                }]
            },
            }
        },
        components:{PermisDialog},
        methods:{
            showListingPermis(){
                this.$refs.listingPermis.show({
                    title:'Listing des permis'
                })
            },
            // showDebut(d){
            //     this.pdf.datedebut=this.$dayjs(new Date(d)).format('DD/MM/YYYY')
            //     // console.log(this.pdf.debut)
            // },
            // showFin(d){
            //     this.pdf.datefin=this.$dayjs(new Date(d)).format('DD/MM/YYYY')
            //     // console.log(this.pdf.fin)
            // },
           showTypeTitre(e){
                this.pdf.typeTitre=e
           },
           showNroTitre(e){
                this.pdf.nroTitre=e
           },
           showNroPermis(e){
                this.pdf.nroPermis=e
           },
           showAcceptPosition(e){
                this.pdf.acceptPosition=e
           },
           
            loadPdf(){
                console.log({"pdf":this.pdf})
            }
        }
    }
</script>
<style scoped>

/*css positioning */
/* 
    static is the default position that follow the elements flow in the page
    relative is the same as static but you could add top, right, etc relatively as it was in the static position
    absolute moves the element out of the flow and above the others as it didn't exist and relatively to the first parent element having position absolute or relative
    fixed is the same as absolute but the element remains fixed while scrolling the page
 */

 .progress{
    background-color: red;
    width:20%;
    height: 10px;
    transition:width 10s 2s linear;
 }

 .progress{
    width:50%;
 }

    #cover{
        background-image: url('@/assets/images/logo_sigif_trame.png');
        background-size: 40vw 80vh;
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh;
    }
    ul,li{
        list-style-type: none;
    }

    /* css animations and transitions */

    .collapse-open{
        list-style-type: disclosure-open;
    }
    .collapse-close{
        list-style-type: disclosure-closed;
    }
    
    .default-old-system-select-properties{
        border-style: solid;
        /* border-width: 1px; */
        font-weight: normal;
        color: #333333;
        border-radius: 3px;
        background-color: White;
        border: 1px solid #637A95;
        margin: 1px;
        font-family: 'verdana';
        font-size: 13px;
        border-color: #637A95;
    }
    .custom-select-type_titre{
        --vs-dropdown-option--active-bg: #82C138;
        --vs-dropdown-option--active-color: #fff;
            --vs-selected-color: #1f1c1c;
                /* Font */
            --vs-font-size: 0.65rem;
            --vs-line-height: 1.2;
    }

    .parent{
        background-color:cyan;
        padding: 10px;
        margin: 10px;
        height: 200vh;
    }
    .child{
        padding: 10px;
    }
    .child-one{
        background-color: limegreen;
        /* position:sticky;
        top:10px; */
        position:fixed;
        top:0;
    }
    .child-two{
        background-color: peru;
    }
    .child-three{
        background-color: rosybrown;
        position: sticky;
        top:25px;
        width:500px;
    }
    .element{
        width: 100px;
        height: 100px;
        background-color: #82C138;
        animation:rotate 2s linear infinite;
        transition:background-color 0.5s ease-in-out;
    }

    .element:hover{
        background-color: #ff0000;
    }
    @keyframes rotate{
        0%{
            transform:rotate(0deg)
        }
        100%{
            transform:rotate(360deg)
        }
    }

    /* accordion */
    .accordion{
        /* background-color: #07141d; */
    }
    #accordion{
        margin:50px auto;
        width:800px;
    }

    #accordion li{
        list-style: none;
        width:100%;
        margin-bottom: 10px;
        background: #fff;
        padding: 10px;
        border-radius: 4px;
    }
    #accordion li label{
        padding:10px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-weight: 900;
        cursor:pointer;
        color:#c20000;
    }
    #accordion li label span{
        transform:rotate(90deg);
        font-size: 22px;
        color:#333;
    }
    #accordion label + input[type="radio"]{
        display: none;
    }
    #accordion .content{
        padding:0 10px;
        line-height: 26px;
        max-height: 0;
        overflow: hidden;
        transition:max-height 0.5s ease-in-out;
    }

    #accordion label + input[type="radio"]:checked + .content{
        max-height: 400px;
    }





    /* neo accordions */
    .accordion2{
        background-color: #e3edf7;
    }

    .accordion{
        margin:60px auto;
        width:800px;
    }
    .accordion li{
        list-style: none;
        width:100%;
        margin:20px;
        padding: 10px;
        background: #e3edf7;
        border-radius: 8px;
        box-shadow: 6px 6px 10px -1px  rgba(0,0,0,0.15),
                    -6px -6px 10px -1px  rgba(255,255,255,0.7);

    }

    .navlist{
        padding:10px;
        background: #4a5667;
        font-size:14px;
    }
</style>