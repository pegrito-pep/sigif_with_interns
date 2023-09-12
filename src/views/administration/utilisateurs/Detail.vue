<template>
  <div id="cover" class="min-vh-100">
    <b-overlay :show="showOverlay" rounded="sm">
      <div>
        <b-row>
          <b-col
            ><h4 class="tab-header-left-text" style>
              <button id="toggleSideBar" @click="toggleSideBar">
                <span aria-hidden="true" style="font-size: 30px"
                  >&times;</span
                ></button
              ><span class="ml-1 font-weight-bold">Details utilisateur</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <a
                @click.prevent="fermer"
                size="sm"
                class="mx-1 simple-btn"
                style="cursor: pointer"
                ><b-img src="@/assets/images/picto_retour_vert.png"></b-img
                >Fermer</a
              >
            </span>
          </b-col>
        </b-row>
      </div>
    </b-overlay>

    <fieldset class="scheduler-border">
      
      <b-row class="d-flex justify-content-center">
        <b-col class="mt-4 mx-2" cols="4" >
          <span class="text-muted"><strong>Nom: </strong></span>
          <strong style="font-size: 20px">{{ userdetails.nom }} </strong><br />
          <br />
          <span class="text-muted"><strong>Prenom: </strong></span
          ><strong style="font-size: 20px">{{ userdetails.prenom }}</strong
          ><br />
          <br />

          

          <p class="mt-0">
            <span class="text-muted"><strong>Email: </strong></span
            ><strong style="font-size: 20px">{{ userdetails.email }}</strong>
          </p>

          <span class="text-muted"
            ><strong style="font-size: 20px">Actif: </strong></span
          ><strong style="font-size: 20px">
            <b-badge v-if="userdetails.active" variant="success">oui</b-badge>
            <b-badge v-else variant="danger">non</b-badge></strong
          ><br />
          <br />
        </b-col>
        <b-col class="mt-4" cols="4">
          <span class="text-muted"><strong> Compte: </strong></span
          ><strong style="font-size: 20px">{{ userdetails.login }}</strong
          ><br />
          <br />
         
          <p v-if="userdetails!=null&&userdetails.profil!=undefined">
            <span class="text-muted"><strong>Entité: </strong></span
            ><strong style="font-size: 20px" >{{
              userdetails.profil.organisation
            }}</strong>
          </p>

          <span class="text-muted"><strong>Langue: </strong></span
          ><strong style="font-size: 20px">{{ userdetails.langue }}</strong>
          <br />
          <br />

          <span class="text-muted"
            ><strong style="font-size: 20px">Agent Minfof: </strong></span
          ><strong style="font-size: 20px">
            <b-badge v-if="userdetails.agentMinfof" variant="success">oui</b-badge>
            <b-badge v-else variant="danger">non</b-badge></strong
          >
        </b-col>
        <b-col cols="3">
          <h4 v-if="userdetails!=null&&userdetails.profil!=undefined" class="mt-4">
            <span class="text-muted"><strong>Profil: </strong></span
            >
              <b-badge variant="secondary">{{userdetails.profil.intitule}}</b-badge>
            </h4>
        </b-col>
      </b-row>
    </fieldset>
      
 
    <b-row>
      <!--<b-col lg="4" md="5" sm="12">
        <div class="card overflow-hidden px-2 py-3">
          <div class="d-flex justify-content-between">
            <h4 class="m-1 font-weight-bold">liste des profils</h4>
          </div>
          <hr />
          <b-overlay :show="showOverlay" rounded="sm">
            <b-table
              sticky-header="90%"
              striped
              hover
              responsive
              :items="roles"
              :fields="[
                { key: 'index', label: 'N°', sortable: true },

                { key: 'libelle', label: 'Libellé' },
              ]"
              style="min-height: 10em"
              class="table table-bordered"
            >
              <template #cell(index)="data">{{ ++data.index }}</template>
              <template #cell(libelle)="data">{{
                data.item.institule
              }}</template>
              <template #cell(action)="row">
                <div style="display: flex">
                  <b-button
                    size="sm"
                    variant="light"
                    @click.prevent="deleteRoleUser(row.item)"
                    class="ml-2"
                    ><i style="width: 100%" class="ik ik-delete"></i
                  ></b-button>
                </div>
              </template>
            </b-table>
          </b-overlay>
        </div>
      </b-col>-->
      <b-col  lg="8" md="7" sm="12" class="pb-0 d-flex justify-content-center">
        <div class="card overflow-hidden px-2 py-3">
          <div class="d-flex justify-content-center">
            <h4 class="m-1 font-weight-bold">liste des droits</h4>
          </div>
          <hr />
          <b-overlay :show="showOverlay" rounded="sm">
            <b-table
              sticky-header="90%"
              striped
              hover
              responsive
              :items="items"
              :fields="[
                { key: 'index', label: 'N°', sortable: true },
                { key: 'codePrivilege', label: 'Code', sortable: true },
              ]"
              style="min-height: 10em"
              class="table table-bordered"
              show-empty
            >
            <template #empty>
              <h4 style="color:green" class="text-center">Aucun<span class="font-weight-bold">droit </span> trouvé!!</h4>
            </template>
              <template #cell(index)="data">{{ ++data.index }}</template>
              <template #cell(codePrivilege)="data"
                ><h5>
                  <b-badge>{{ data.item }}</b-badge>
                </h5></template
              >
              <template #cell(action)="row">
                <div style="display: flex">
                  <b-button
                    size="sm"
                    variant="light"
                    @click.prevent="deletePrivilegeUser(row.item)"
                    class="ml-2"
                    ><i style="width: 100%" class="ik ik-delete"></i
                  ></b-button>
                </div>
              </template>
            </b-table>

             <paginator hr="top" :offset="offset" :total="permissions.length" :limit="perPage" :page="currentPage" @pageChanged="(page)=> {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" v-show="items.length > 5"/>
          </b-overlay>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
const php = require("phpjs");

export default {
  name: "detail_utilisateur",

  data: () => ({
    showOverlay: false,
    user: {},
    isBusy: false,
    //données du tableaux

    roles: [],
    permissions: [],
    selected: {},

    userdetails: {},
    //elements pagination
    perPage: 10,
    currentPage: 1,
    total: 0,
  }),
  fields: [
    { key: "index", label: "" },
    { key: "code_privilege", label: "Libellé_privilège" },
    { key: "supprimer", label: "" },
    { key: "n", label: "Nom" },
  ],
  computed: {
    items() {
      return php.array_slice(this.permissions, this.offset, this.perPage);
    },
    offset() {
      return this.currentPage * this.perPage - this.perPage;
    },
  },

  methods: {
    fermer() {
      this.$router.back();
    },
    rowClass(item, type) {
      if (item != "" && item != null) {
        return "custo-bg_detail_-table_element";
      } else {
        return;
      }
    },

    async getDetailUser() {
      this.showOverlay = true;
      this.userdetails = await this.$administration
        .get("utilisateurs/" + this.$route.params.id)
        .then((response) => response.data.result);
      this.roles.push(this.userdetails.profil);
      this.permissions = this.userdetails.profil.privileges.Items;
      this.showOverlay = false;
    },

    toggleSideBar() {
      var sidebar = document.querySelector("#sidebar");
      var administration = document.querySelector("#administration");
      var administrationItem = document.querySelectorAll(".administrationItem");
      var actionButton = document.querySelector("#toggleSideBar");

      if (sidebar.style.width !== "0px") {
        sidebar.style.width = "0px";
        sidebar.style.transition = "all 0.5s ease";
        administration.style.backgroundColor = "white";
        administration.style.transition = "background-color 0.2s ease";
        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = "0";
          element.style.transition = "opacity 0.2s ease";
        }
        actionButton.innerHTML =
          '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';
      } else {
        sidebar.style.width = "250px";
        sidebar.style.transition = "all 0.3s ease";
        administration.style.backgroundColor = "#82C138";
        administration.style.transition = "background-color 0.8s ease";

        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = "100%";
          element.style.transition = "opacity 1s ease";
        }

        actionButton.innerHTML =
          '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
      }
    },
  },

  beforeMount() {
    this.getDetailUser();
  },
};
</script>
<style scoped>
fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow:  0px 0px 0px 0px #000;
          box-shadow:  0px 0px 0px 0px #000;
}
legend.scheduler-border {
      font-size: 1.2em !important;
      font-weight: bold !important;
      text-align: left !important;
      width:auto;
      padding:0 10px;
      border-bottom:none;
  }
#cover {
  background-image: url("~@/assets/images/logo_sigif_trame.png");
  background-size: 40vw 80vh;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}
.simple-btn {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
.custom {
  color: #82c138;
}
</style>
<style>
.custo-bg_detail_-table_element {
  background-color: #82c138;
}
#toggleSideBar {
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
</style>