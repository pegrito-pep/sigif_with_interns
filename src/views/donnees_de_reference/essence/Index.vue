<template>
    <div class="global">
        <div class="first">
            <form action="">
              <h3> Rechercher</h3> <br>
                    <table border="0" class="part0" >
                        <tr>
                            <td> Nom commercial <input type="text" name="" id=""> </td>
                            <td>code sh <input type="text"></td>
                            <td>code CEMAC <input type="text"></td>
                            <td>code MINFOF <input type="text"></td>
                            <td>code douanier/tarifaire <input type="text"></td>

                        </tr>
                        <tr>
                            <td>code CEMAC grume <input type="text"></td>
                            <td>interdire à l'exploitation <input type="checkbox" name="" id=""></td>
                            <td> interdiction d'export pour grume <input type="checkbox" name="" id=""></td>
                            <td>actif <input type="checkbox" name="" id=""></td>
                        </tr>
                    </table> 
            </form>
        </div>
        <div class="second">
            <div class="underline"><h3 > Liste des Essences </h3><h6> consulter </h6></div>
            <table border="0" class="part1">
                <tr class="rowtype">
                    <td>Categorie essences</td>
                    <td>Nom commercial</td>
                    <td>Nom scientifique</td>
                    <td>Code SH</td>
                    <td>Code douanier</td>
                    <td>Code CEMAC grume</td>
                    <td>Code CEMAC débité</td>
                    <td>Code MINFOF</td>
                    <td>DME</td>
                    <td>interdiction d'export grume</td>
                    <td>Actif</td>
                    <td>Interdire à l'exploitation</td>
                </tr>
                <tr class="rowtype1">                   
                    <td>essence spéciale</td>
                    <td>ABALE</td>
                    <td>PETERSIANTHUS MA...</td>
                    <td>140123</td>
                    <td>1401</td>
                    <td>1401</td>
                    <td>1401</td>
                    <td>1401</td>
                    <td>50</td>
                    <td>interdiction d'export grume</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="rowtype2">                   
                    <td>essence spéciale</td>
                    <td>ABAM A POILS ROUGE</td>
                    <td>GAMBEYA BEGUEI</td>
                    <td>1402</td>
                    <td>1402</td>
                    <td>1402</td>
                    <td>1402</td>
                    <td>1402</td>
                    <td>50</td>
                    <td>interdiction d'export grume</td>
                    <td></td>
                    <td></td>
                </tr>

            </table>
        </div>
    </div>
    
</template>


<script>
export default {
    
}
</script>

<style scoped>
    .u{
        border: 2ch;
        color: rgb(79, 216, 79);
    }
    .second tr::selection{
        background-color: green;
        color: white;
    }
    .rowtype0{
        text-decoration-style: dashed;
    }
    .rowtype1{
        background-color: white;
        padding: 500ex;
    }
    .rowtype2{
        background-color: rgb(128, 238, 128);
        padding: 500ex;
    }
    table{
         /*align: justify;*/
         size: all;
    }
    .second tr:hover{ 
        color: white;
        background: rgb(5, 83, 5);
    }
    .part0{
        /*align: right;*/
    }
    .first{
        block-size: 100%;
    }
    .underline{
        border-bottom: 5px solid;
        border-bottom-color:rgb(128, 238, 128);
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 20px;

    }
    .global{
        /*align: center;*/
    }
    .first td {
        align-content: justify;
    }
    /*h6{
        text-align: right;
    }*/
    table{
        width: 100%;
    }
    .first td{
        text-align: right;
    }
    input[type=text]{
        border: 2px solid gray;
        border-radius: 5px;
        border-style: double;}
</style>