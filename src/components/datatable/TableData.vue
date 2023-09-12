<template>
    <div id="cover" class="min-vh-100">
        <b-overlay :show="show" rounded="sm">
            <template #overlay>
              <div class="text-center">
                <i class="fas fa-2x fa-sync fa-spin"></i>
                <p id="cancel-label">Chargement...</p>
              </div>
            </template>
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
                        <h4 style="color: green" class="text-center">Aucune<span class="font-weight-bold"> donnée</span> trouvé!!</h4>
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
            </div>
            <hr>
            <b-button @click.prevent="exportdata" size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Exporter</b-button>
            <b-button @click.prevent="printdata" size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>Imprimer</b-button>
          </div>

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
                    <img :src="`${$router.options.base}img/logo-m0.png`" class="header-brand-img" alt="lavalite" style="height: 5em; width: 5em">
                    <div style="flex: 1;" class="ml-1 text-center">
                        <h2 class="text-danger">Maisonier</h2>   
                        <p class="text-muted">{{$t('data.printer_definition_maisonier')}}</p>
                    </div> 
                </header>
                <h5 class="mb-1">{{$t('data.charge_label_loyer_du_mois_de')}} :<b class="pl-2">{{ $dayjs(this.periodeCourante + 1).format('MMMM YYYY') }}</b></h5> 

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
                        <h4 style="color: green" class="text-center">Aucune<span class="font-weight-bold"> donnée</span> trouvé!!</h4>
                    </template>
                    <!-- A custom formatted header cell for field 'name' -->
                    <template #head(essences)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_54)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_68)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_82)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_96)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_110)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_124)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_138)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_152)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_166)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                    <template #head(diam_180)="data">
                    <span class="text-success">{{ data.label.toUpperCase() }}</span>
                    </template>
                </b-table>      
            </section>
        </vue-html2pdf>
        </b-overlay>
    </div>

</template>

<script>


  const php  = require ( 'phpjs' ) ;

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
    { key: 'total', label: 'TOTAL' },],
    elements: [],
    selected:{},
    isRowselected:false,
    htmlToPdfOptions: {
            margin: [7,5,7,5],
            filename: `fiche_recettes.pdf`,       
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
  }),
  computed:{
    items() { 
      return this.elements.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
  },
 
 methods: {
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
     async getData() {
            this.showOverlay = true
            this.elements = await this.$inventaire.get('tracking/table-stock').then(response => response.data.result)

              this.elements=this.elements.map(elt =>{
                
                elt.diam_50 = elt.diametres[0].diam_50
                elt.diam_60 = elt.diametres[1].diam_60
                elt.diam_70 = elt.diametres[2].diam_70
                elt.diam_80 = elt.diametres[3].diam_80
                elt.diam_90 = elt.diametres[4].diam_90
                elt.diam_100 = elt.diametres[5].diam_110
                elt.diam_110 = elt.diametres[6].diam_110
                elt.diam_120 = elt.diametres[7].diam_120
                elt.diam_130 = elt.diametres[8].diam_130
                elt.diam_140 = elt.diametres[9].diam_140
                elt.diam_150 = elt.diametres[9].diam_150
                elt.diam_160 = elt.diametres[9].diam_160
                elt.diam_170 = elt.diametres[9].diam_170
                elt.diam_180 = elt.diametres[9].diam_180

                return elt
              })
              console.log('this.dataTableStock ',this.dataTableStock)
     
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



/*edti style par defaut btn-bootstrap au disable*/


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

</style>