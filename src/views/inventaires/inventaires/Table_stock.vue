<template>
    <div id="cover" class="min-vh-100">
      <b-overlay :show="show" rounded="sm">
        <template #overlay>
          <div class="text-center">
            <i class="fas fa-2x fa-sync fa-spin"></i>
            <p id="cancel-label">Chargement...</p>
          </div>
        </template>
        <div>
            <b-row>
              <b-col><h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button><span class="ml-1 font-weight-bold">Table de Stock</span></h4>
                  
                </b-col>
              <b-col class="col-md-auto">
                <span>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn">Exporter</a>
                </span>
              </b-col>
            </b-row>
        </div>
        <div class="mt-2 pb-4">
            <div class="ml-1">
              <b-table  :busy="showOverlay" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #empty>
                    <h4 style="color: green" class="text-center">Aucun<span class="font-weight-bold"> inventaire</span> trouvé!!</h4>
                </template>
                <!-- A custom formatted header cell for field 'name' -->
                <template #head(nom)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_50)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_60)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_70)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_80)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_90)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_100)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_110)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_120)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_130)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_140)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_150)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_160)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_170)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_180)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
              </b-table>
              <div class="float-right">
                <b-button @click.prevent="exportdata" size="sm" class="mx-1" style="background:#82C138; border-color:#82C138"><b-img clas="ml-1" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Exporter</b-button>
                <b-button @click="$refs.html2Pdf.generatePdf()" size="sm"  class="mx-1" style="background:#82C138; border-color:#82C138"><b-img clas="ml-1" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>Imprimer</b-button>
              </div>
              
            </div>
        </div>
        <!--DEBUT GESTION IMPRESSION-->
        <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="false"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            filename="table_de_stock"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            pdf-orientation="landscape"
            pdf-content-width="100%"
            :htmlToPdfOptions="htmlToPdfOptions"
            @beforeDownload="beforeDownload($event)"
            ref="html2Pdf"
        >
            <section slot="pdf-content">
                <header class="d-flex border rounded px-3 py-1 align-items-center">
                    <!--<img :src="`${$router.options.base}img/sigif.png`" class="header-brand-img" alt="lavalite" style="height: 5em; width: 5em">-->
                    <img :src="`@/assets/img/sigif.png`" class="header-brand-img" alt="lavalite" style="height: 5em; width: 5em">
                    
                    <div style="flex: 1;" class="ml-1 text-center">
                        <h2 class="text-danger">SIGIF</h2>   
                        <p class="text-muted">Application de Gestion forrestière</p>
                    </div> 
                </header>
                <h5 class="mb-1">Etat du stock au :<b class="pl-2">{{ $dayjs(this.periodeCourante + 1).format('DD MMMM YYYY') }}</b></h5> 
                 <b-table  :busy="showOverlay" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="fisrtPage" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <!-- A custom formatted header cell for field 'name' -->
                <template #head(nom)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_50)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_60)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_70)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_80)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_90)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_100)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_110)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_120)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_130)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_140)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_150)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_160)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_170)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #head(diam_180)="data">
                  <span class="text-success">{{ data.label.toUpperCase() }}</span>
                </template>
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                
                 </b-table>
                <!--<b-table-simple class="m-0 p-0" hover small responsive style="border: 1px solid black!important">
                    <b-tbody>
                        <b-tr>
                            <b-th class="border m-0 p-0 text-center">N°</b-th>
                            <b-th class="border m-0 p-0 text-center" style="width: 9%">Essence</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_50</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_60</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_70</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_80</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_90</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_100</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_110</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_120</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_130</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_140</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_150</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_160</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_170</b-th>
                            <b-th class="border m-0 p-0 text-center">DIAM_180</b-th>
                            <b-th class="border m-0 p-0 text-center">Total</b-th>
                        </b-tr>
                        <b-tr v-for="(elt, i) in fisrtPage" :key="i">
                            <b-td class="border p-0">
                                <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ ++i }}</span>    
                            </b-td>
                            <b-td class="border p-0 px-2">
                                <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.nom }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_50 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_60 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_70 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_80 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_90 }}</span>
                            </b-td>
                            <b-td>
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_100 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_110 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_120 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_130 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_140 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_150 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_160 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_170 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.diam_180 }}</span>
                            </b-td>
                            <b-td class="border p-0 px-2">
                              <span class="d-inline-block w-100 font-weight-bold" style="text-align:center">{{ elt.total }}</span>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>-->
                
                <!--ETABLISSEMENT DU DEUXIEME BREAK-->
                <div class="html2pdf__page-break p-0 m-0"></div>
                <div v-for="(page, i) in pages" :key="i">
                    <!--DEBUT DEUXIEME PAGE-->
               
                    <b-table-simple class="m-0 p-0" hover small responsive style="border: 1px solid black!important">
                        <b-tbody>
                            <b-tr>
                              <b-th class="border m-0 p-0 text-center">N°</b-th>
                              <b-th class="border m-0 p-0 text-center" style="width: 9%">Essence</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_50</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_60</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_70</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_80</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_90</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_100</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_110</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_120</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_130</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_140</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_150</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_160</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_170</b-th>
                              <b-th class="border m-0 p-0 text-center">DIAM_180</b-th>
                              <b-th class="border m-0 p-0 text-center">Total</b-th>
                            </b-tr>
                            <b-tr v-for="(elt, j) in page" :key="j">
                                <b-td class="border py-0">
                                    <span class="d-inline-block w-100 font-weight-bold text-center">{{ limitFistPage + (++j) + ((i + 1) * printLimit - printLimit) }}</span>    
                                </b-td>
                                <b-td class="border py-0">
                                    <span class="d-inline-block w-100 font-weight-bold">{{ elt.nom }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_50 }}</span>
                               </b-td>
                                <b-td class="border py-0">
                                    <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_60 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_70 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_80 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_90 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_100 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_110 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_120 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_130 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_140 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_150 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_160 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_170 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.diam_180 }}</span>
                                </b-td>
                                <b-td class="border py-0">
                                  <span class="d-inline-block w-100 font-weight-bold">{{ elt.total }}</span>
                                </b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                    <!--ETABLISSEMENT DU DEUXIEME BREAK-->
                    <div class="html2pdf__page-break p-0 m-0" v-if="i != 0"></div>
                </div>
            </section>
        </vue-html2pdf>

        <!--FIN GESTION IMPRESSION-->
          
  
      </b-overlay>
    </div>

</template>

<script>

//const {periodeCourante:_periodeCourante} = require('../../helpers/date')
const {periodeCourante:_periodeCourante} = require('../../../helpers/date')
  const php  = require ( 'phpjs' ) ;
  import exportFromJSON from "export-from-json";
export default {
  name: "table_stock",

  data: () => ({
    showOverlay:false,
    fields: [{ key: 'index', label: '', thStyle: { width: "2%" }  },
    { key: 'nom', label: 'ESSENCES' },
    { key: 'diam_50', label: 'DIAM_50' },
    { key: 'diam_60', label: 'DIAM_60' },
    { key: 'diam_70', label: 'DIAM_70' }, 
    { key: 'diam_80', label: 'DIAM_80' },
    { key: 'diam_90', label: 'DIAM_90' },
    { key: 'diam_100', label: 'DIAM_100' }, 
    { key: 'diam_110', label: 'DIAM_110' },
    { key: 'diam_120', label: 'DIAM_120' }, 
    { key: 'diam_130', label: 'DIAM_130' },
    { key: 'diam_140', label: 'DIAM_140' },
    { key: 'diam_150', label: 'DIAM_150' },
    { key: 'diam_160', label: 'DIAM_160' },
    { key: 'diam_170', label: 'DIAM_170' },
    { key: 'diam_180', label: 'DIAM_180' },
    { key: 'total', label: 'TOTAL' },
		],
    htmlToPdfOptions: {
      margin: [7,5,7,5],
      filename: `table_de_stock.pdf`,       
      image: {
          type: 'jpeg', 
          quality: 2
      },        
      enableLinks: false,
      html2canvas: {
          scale: 4, 
          logging: true,
          useCORS: false
      },
      jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'landscape',
      }
    },
    periode: {annee: null, mois: null},
    elements: [],
    selected:{},
    isRowselected:false,
    show:false,


    pages: [],
    fisrtPage: [],
    printLimit: 35,
    limitFistPage: 27,
  }),
  computed:{
    periodeCourante() {
        return _periodeCourante(this.periode)
    },
    items() { 
      return this.elements.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
  },
 
 methods: {
     fermer(){ this.$router.back()},
     async getData() {
            this.showOverlay = true
            this.elements = await this.$inventaire.get('tracking/table-stock').then(response => response.data.result)

              this.elements=this.elements.map(elt =>{
                
                elt.diam_50 = elt.diametres[0].diam_50.toFixed(2)
                elt.diam_60 = elt.diametres[1].diam_60.toFixed(2)
                elt.diam_70 = elt.diametres[2].diam_70.toFixed(2)
                elt.diam_80 = elt.diametres[3].diam_80.toFixed(2)
                elt.diam_90 = elt.diametres[4].diam_90.toFixed(2)
                elt.diam_100 = elt.diametres[5].diam_100.toFixed(2)
                elt.diam_110 = elt.diametres[6].diam_110.toFixed(2)
                elt.diam_120 = elt.diametres[7].diam_120.toFixed(2)
                elt.diam_130 = elt.diametres[8].diam_130.toFixed(2)
                elt.diam_140 = elt.diametres[9].diam_140.toFixed(2)
                elt.diam_150 = elt.diametres[10].diam_150.toFixed(2)
                elt.diam_160 = elt.diametres[11].diam_160.toFixed(2)
                elt.diam_170 = elt.diametres[12].diam_170.toFixed(2)
                elt.diam_180 = elt.diametres[13].diam_180.toFixed(2)
                elt.total = elt.total.toFixed(2)

                return elt
              })
             

              this.pages.push(php.array_slice(this.elements, 0, this.limitFistPage))
                const nbrPage = Math.ceil(this.elements.length - this.limitFistPage / this.printLimit)

                for (let i = 1; i <= nbrPage; i++) {
                    this.pages.push(
                        php.array_slice(
                          this.elements, 
                            ((i * this.printLimit) - this.printLimit) + this.limitFistPage, this.printLimit
                        )
                    )
                }
                this.pages = this.pages.filter(elt => elt.length > 0)
                this.fisrtPage = this.pages.shift()
                console.log('this.pages ',this.pages)
            this.showOverlay = false
    },
    rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
    },
    onRowSelected(items) {
      items.isSelected =true;
      this.isRowselected=true
      this.selected = items
    },
    exportdata(){
        this.show=true
        const data=this.elements
        const fileName = "table_stock_data";
        const exportType = exportFromJSON.types.csv;
        if (data) exportFromJSON({data, fileName, exportType });
        setTimeout(() => {this.show=false;}, 3000);
    },
    printdata(){

    },
    async beforeDownload ({ html2pdf, options, pdfContent }) {
            await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages()
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i)
                    pdf.setFontSize(12)
                    pdf.setTextColor(150)
                    pdf.text('Copyright © '+this.$dayjs().format('YYYY')+' By Flysoft engineering | All Rights Reserved.', 10, (pdf.internal.pageSize.getHeight() - 2.9))
                    pdf.text('Page ' + i + ' sur ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 2.9))
                } 
            }).save()
        },

    toggleSideBar(){
    var sidebar = document.querySelector('#sidebar');
    var administration = document.querySelector('#administration');
    var administrationItem = document.querySelectorAll('.administrationItem');
    var actionButton = document.querySelector("#toggleSideBar");

    if (sidebar.style.width !== '0px'){
      sidebar.style.width = '0px';
      sidebar.style.transition = 'all 0.5s ease';
      administration.style.backgroundColor = 'white';
      administration.style.transition = 'background-color 0.2s ease';
      for (let index = 0; index < administrationItem.length; index++) {
        const element = administrationItem[index];
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.2s ease';
      }
      actionButton.innerHTML = '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';

    }
    else {
      sidebar.style.width = '250px';
      sidebar.style.transition = 'all 0.3s ease';
      administration.style.backgroundColor = '#82C138';
      administration.style.transition = 'background-color 0.8s ease';

      for (let index = 0; index < administrationItem.length; index++) {
        const element = administrationItem[index];
        element.style.opacity = '100%';
        element.style.transition = 'opacity 1s ease';
      }
      
      actionButton.innerHTML = '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
    }
    
  },
 },
  mounted() {
        this.getData()
  },
  }

</script>
<style scoped>
.form-control{
  height: 30px !important;
}
#toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}


.position_absolute{
  position: absolute;
  bottom: 30px;
  right: 35px;
}
.b-card{
  background-color: transparent !important;
}
.b-col{
  margin-right: 16px;
}
.b-col .content{
  display: flex;
  flex-direction: column;
}


#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}

.collapse-close{
  list-style-type: disclosure-closed;
}
.collapse-open{
  list-style-type: disclosure-open;
}


/*style barre de recherche */
.search-bar-btn-group{
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar-btn{
  border:none;
  border-radius:  6px;
  margin-top: 10px;
  padding: 6px 20px;
  background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover{
  background-color: rgba(0, 82, 44, 0.89);
  border:none;
}
.search-bar-btn a{
  color:white
}
.search-bar-btn a:hover{
  font-weight: 600;
  font-style: italic;
  
}

.search-bar-custum-input{
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
}

.simple-btn{
  background:none;
  border:none;
  color:black;
  font-weight: bold;
  cursor:pointer;
}

.simple-btn:hover{
  background:none;
  border:none;
}
/*edti style par defaut btn-bootstrap au disable*/
.change-image-opacity:disabled {
  color: #6c757d;
  background-color: white!important;
  border-color: white!important;
}
.change-image-opacity:hover {
  color: #6c757d;
  background-color: rgb(0, 82, 44)!important;
  border-color: white!important;
  cursor: not-allowed;
}
.not-change-image-opacity:hover{
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

.table-header-border{
  border-top: 2px solid rgb(0, 82, 44) !important;
  border-bottom: 2px solid rgb(0, 82, 44) !important;
}
.tab-header-left-text{
  display: inline;
  white-space: nowrap;
  font-family: 'Verdana';
  font-size: 22px;
  font-weight: 600;
  color: #333333;
}
.table-first-row{
  background-color: #81c138a8;
  color: White;
}
.table td, .table th {
  padding: 5px 0;
}

.table-row-other{
  background-color: #caf09e;
}    
/*style de la pagination*/
.page-item.active .page-link {  
    background-color: rgb(0, 82, 44)!important;  
    border-color: rgb(0, 82, 44)!important; 
    color: white !important;;
}
.page-link{
  color:rgb(0, 82, 44)!important;  
}

#wrap:after {
    content:"";
    position:relative;
    margin-left:-20px;
    pointer-events:none;
    top: 15px;
    right:5px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-color: #8E97AF transparent transparent transparent;
}
</style>