<template>
  <div id="cover" class="min-vh-100">
    <div>
      <div class="d-flex">
        <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
      </div>
    </div>
    
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">

          <!-- Profile MINFOF -->
          <div v-if="isMinfof" class="card card-success card-outline">
            <div class="card-body box-profile">
              <div class="text-center">
                <img class="profile-user-img img-fluid img-circle" src="@/assets/images/user-admin-icon.png" alt="User profile picture">
              </div>

              <h3 class="profile-username text-center"><span class="text-uppercase" style="margin-right:10px!important">{{ user.nom }}</span><span v-if="user.prenom!=''" class="ml-1"> {{ user.prenom }}</span> </h3>

             

              <ul  class="list-group list-group-unbordered mb-3">
                <li class="list-group-item">
                  <b>Profils</b> <a class="float-right text-muted">{{ user.profil.intitule }}</a>
                </li>
                <li class="list-group-item">
                  <b>Types de profils</b> <a class="float-right text-muted">{{user.profil.libelleTypeProfil}}</a>
                </li>
                <li class="list-group-item">
                  <b>Nombres de privilèges</b> <a class="float-right text-muted">{{user.profil.privileges.Items.length}}</a>
                </li>
              </ul>
              <!-- <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a> -->
            </div>
          </div>
          <!--PROFIL OPERATEUR-->
          <div v-else class="card card-primary card-outline">
            <div class="card-body box-profile">
              <div class="text-center">
                <img class="profile-user-img img-fluid img-circle" src="@/assets/images/user-512.png" alt="User profile picture">
              </div>

              <h3 class="profile-username text-center"><span class="text-uppercase">{{ user.nom }}</span><span v-if="user.prenom!=''">{{ user.prenom }}</span> </h3>

              

              <ul  class="list-group list-group-unbordered mb-3">
                <li class="list-group-item">
                  <b>Profil</b> <a class="float-right text-muted">{{ user.profil.intitule }}</a>
                </li>
                <li class="list-group-item">
                  <b>Type de profil</b> <a class="float-right text-muted ">{{user.profil.libelleTypeProfil}}</a>
                </li>
                <li class="list-group-item">
                  <b>Nombre de privilèges</b> <a class="float-right text-muted">{{user.profil.privileges.Items.length}}</a>
                </li>
              </ul>
              <!-- <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a> -->
            </div>
          </div>

          <!-- /.card -->

          <!-- About Me Box -->
          <!-- <div class="card card-primary"> -->
            <!-- <div class="card-header">
              <h3 class="card-title">About Me</h3>
            </div> -->
            <!-- /.card-header -->
            <!-- <div class="card-body">
              <strong><i class="fas fa-book mr-1"></i> Education</strong>

              <p class="text-muted">
                B.S. in Computer Science from the University of Tennessee at Knoxville
              </p>

              <hr>

              <strong><i class="fas fa-map-marker-alt mr-1"></i> Location</strong>

              <p class="text-muted">Malibu, California</p>

              <hr>

              <strong><i class="fas fa-pencil-alt mr-1"></i> Skills</strong>

              <p class="text-muted">
                <span class="tag tag-danger">UI Design</span>
                <span class="tag tag-success">Coding</span>
                <span class="tag tag-info">Javascript</span>
                <span class="tag tag-warning">PHP</span>
                <span class="tag tag-primary">Node.js</span>
              </p>

              <hr>

              <strong><i class="far fa-file-alt mr-1"></i> Notes</strong>

              <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
            </div> -->
            <!-- /.card-body -->
          <!-- </div> -->
          <!-- /.card -->
        </div>
        <!-- /.col -->
        <div class="col-md-9">
          <div class="card">
            <div class="card-header p-2">
              <ul class="nav nav-pills">
                <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Activité</a></li>
                <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab">Historique</a></li>
                <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Paramètres</a></li>
              </ul>
            </div><!-- /.card-header -->
            <div class="card-body">
              <div class="tab-content">
                <div class="active tab-pane" id="activity">
                  <!-- Post -->
                  
                  <!-- /.post -->

                  <!-- Post -->
                  
                  <!-- /.post -->

                  <!-- Post -->
                  
                  <!-- /.post -->
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="timeline">
                  <!-- The timeline -->
                  <div class="timeline timeline-inverse">
                    <!-- timeline time label -->
                    <div class="time-label">
                      <span class="bg-danger">
                        10 Feb. 2014
                      </span>
                    </div>
                    <!-- /.timeline-label -->
                    <!-- timeline item -->
                    <div>
                      <i class="fas fa-envelope bg-primary"></i>

                      <div class="timeline-item">
                        <span class="time"><i class="far fa-clock"></i> 12:05</span>

                        <h3 class="timeline-header"><a href="#">Support Team</a> sent you an email</h3>

                        <div class="timeline-body">
                          Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                          weebly ning heekya handango imeem plugg dopplr jibjab, movity
                          jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                          quora plaxo ideeli hulu weebly balihoo...
                        </div>
                        <div class="timeline-footer">
                          <a href="#" class="btn btn-primary btn-sm">Read more</a>
                          <a href="#" class="btn btn-danger btn-sm">Delete</a>
                        </div>
                      </div>
                    </div>
                    <!-- END timeline item -->
                    <!-- timeline item -->
                    <div>
                      <i class="fas fa-user bg-info"></i>

                      <div class="timeline-item">
                        <span class="time"><i class="far fa-clock"></i> 5 mins ago</span>

                        <h3 class="timeline-header border-0"><a href="#">Sarah Young</a> accepted your friend request
                        </h3>
                      </div>
                    </div>
                    <!-- END timeline item -->
                    <!-- timeline item -->
                    <div>
                      <i class="fas fa-comments bg-warning"></i>

                      <div class="timeline-item">
                        <span class="time"><i class="far fa-clock"></i> 27 mins ago</span>

                        <h3 class="timeline-header"><a href="#">Jay White</a> commented on your post</h3>

                        <div class="timeline-body">
                          Take me to your leader!
                          Switzerland is small and neutral!
                          We are more like Germany, ambitious and misunderstood!
                        </div>
                        <div class="timeline-footer">
                          <a href="#" class="btn btn-warning btn-flat btn-sm">View comment</a>
                        </div>
                      </div>
                    </div>
                    <!-- END timeline item -->
                    <!-- timeline time label -->
                    <div class="time-label">
                      <span class="bg-success">
                        3 Jan. 2014
                      </span>
                    </div>
                    <!-- /.timeline-label -->
                    <!-- timeline item -->
                    <div>
                      <i class="fas fa-camera bg-purple"></i>

                      <div class="timeline-item">
                        <span class="time"><i class="far fa-clock"></i> 2 days ago</span>

                        <h3 class="timeline-header"><a href="#">Mina Lee</a> uploaded new photos</h3>

                        <div class="timeline-body">
                          <img src="https://placehold.it/150x100" alt="...">
                          <img src="https://placehold.it/150x100" alt="...">
                          <img src="https://placehold.it/150x100" alt="...">
                          <img src="https://placehold.it/150x100" alt="...">
                        </div>
                      </div>
                    </div>
                    <!-- END timeline item -->
                    <div>
                      <i class="far fa-clock bg-gray"></i>
                    </div>
                  </div>
                </div>
                <!-- /.tab-pane -->

                <div class="tab-pane" id="settings">
                  <form class="form-horizontal">
                    <div class="form-group row">
                      <label for="nom" class="col-sm-3 col-form-label">Nom</label>
                      <div class="col-sm-9">
                        <input v-model="form.nom" v-if="modifier" type="text" @input="setChange"  class="form-control" id="nom" placeholder="Nom">
                        <span v-else>{{ user.nom }}</span>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="prenom" class="col-sm-3 col-form-label">Prénom</label>
                      <div class="col-sm-9">
                        <input v-model="form.prenom" v-if="modifier" type="text" @input="setChange"  class="form-control" id="prenom" placeholder="Prénom">
                        <span v-else>{{ user.prenom }}</span>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="email" class="col-sm-3 col-form-label">Email</label>
                      <div class="col-sm-9">
                        <input v-model="form.email" v-if="modifier" @input="setChange" type="email" class="form-control" id="email" placeholder="Email">
                        <span v-else>{{ user.email }}</span>
                      </div>
                    </div>
                    <!-- <div class="form-group row">
                      <label for="login" class="col-sm-3 col-form-label">Login</label>
                      <div class="col-sm-9">
                        <input v-model="form.login" v-if="modifier" @change="setChange" type="text" class="form-control" id="login" placeholder="Login">
                        <span v-else>{{ user.login }}</span>
                      </div>
                    </div> -->
                    <div class="form-group row">
                      <label for="user" class="col-sm-3 col-form-label">Type d'utilisateur</label>
                      <div class="col-sm-9">
                        <select @change="setChange" v-model="form.user" id="user" v-if="modifier" class="form-control">
                          <option :selected="user.profil.libelleTypeProfil==='MINFOF'" value="1">MINFOF</option>
                          <option :selected="user.profil.libelleTypeProfil==='OPERATEUR'" value="2">OPERATEUR</option>
                          <option :selected="user.profil.libelleTypeProfil==='INVITE'" value="3">INVITE</option>
                          <option :selected="user.profil.libelleTypeProfil==='AUTRE'" value="4">AUTRE</option>
                          <option :selected="user.profil.libelleTypeProfil==='ADMINISTRATEUR'" value="5">ADMINISTRATEUR</option>
                          <option :selected="user.profil.libelleTypeProfil==='OPERATEUR CEMAC'" value="6">OPERATEUR CEMAC</option>
                        </select>
                        <span v-else>{{ user.profil.libelleTypeProfil}}</span>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="langue" class="col-sm-3 col-form-label">Langue</label>
                      <div class="col-sm-9">
                        <select @change="setChange" v-model="form.langue" id="langue" v-if="modifier" class="form-control">
                          <option value="fr">Français</option>
                          <option value="en">Anglais</option>
                        </select>
                        <span v-else>{{ user.langue==='fr' ? 'FRANÇAIS':'ANGLAIS'}}</span>
                      </div>
                    </div>
                    <!-- <div class="form-group row">
                      <div class="offset-sm-2 col-sm-10">
                        <div class="checkbox">
                          <label>
                            <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>
                          </label>
                        </div>
                      </div>
                    </div> -->
                    <div class="form-group row">
                      <div class="col-sm-10">
                        <button @click.prevent="validateModidier" :disabled="disabled" v-if="modifier" type="submit" class="btn btn-primary mr-5">
                          <b-spinner small v-if="wait" class="ml-1"  style="margin-right: 5px;"></b-spinner>
                          Modifier</button>
                        <button @click.prevent="annuler" v-if="modifier" class="btn btn-primary mr-5">Annuler</button>
                        <button @click.prevent="handleModifier" v-else type="submit" class="btn btn-primary mr-5">Modifier mes informations</button>
                        <button @click.prevent="modifiermdp"  class="btn btn-primary">Modifier mon mot de passe</button>
                      </div>
                    </div>
                  </form>
                </div>
                <!-- /.tab-pane -->
              </div>
              <!-- /.tab-content -->
            </div><!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div><!-- /.container-fluid -->
  <ResetPasswordBox ref="resetpassword"></ResetPasswordBox>
  <RejectionModal ref="rejectmodal">
            <template #content>
                <div style="height:15px;padding:.5rem">
                    <span>Les Mofifications ont été effectuées avec succès.</span>
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
        <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
  </div>
</template>

<script>
const php = require("phpjs");

import { mapGetters } from "vuex";
import ResetPasswordBox from '@/components/utils/ResetPasswordBox.vue';
import RejectionModal from '@/components/utils/RejectionModal.vue'
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue'; 
export default {
  name: "mon-profil",
  components: {
    ResetPasswordBox,
    RejectionModal,
    CodeBarreInfo
  },
  data: () => ({
    usertoUpdate:null, //utilisateur à modifier
    //données liées à l'entete de recherche
    showOverlayEntites:false,
    modifier:false,
    disabled:true,
    wait:false,
    form:{
      nom:'',prenom:'',email:'',user:'',langue:'fr'
    },
    entite:{
      id:1,
      libelle:''
    },
    
  }),
  computed: {
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
  },
  watch:{
 
  },
  methods: {
    showDetails(){ this.$router.push({name: 'details_utilisateurs', params: { id: this.selected[0].login }}); },
    handleModifier(){
      this.modifier=true
      this.disabled=true
      this.form.nom=this.user.nom
      this.form.prenom=this.user.prenom
      this.form.email=this.user.email
      this.form.user=this.user.profil.typeProfil
      this.form.langue=this.user.langue
    },
    async sendAlertMessage(error){
        const ok = await this.$refs.codebarreinfo.show({
          title: 'Information',
          message: error.message,
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.codebarreinfo._close();
            this.modifier=true
        } else {
          this.$refs.codebarreinfo._close();
          this.modifier=true
        }
    },
    async validateModidier(){
      try{
        this.wait=true
        const msg=await this.$administration.put('utilisateurs/modifier',{
          "compte": this.user.login,
          "nom": this.form.nom,
          "prenom": this.form.prenom,
          "email": this.form.email,
          "langue": this.form.langue,
          "typeProfil": Number(this.form.user),
          "profil": this.user.profil.idProfil
        })
          .then(resp=>{
            console.log(resp)
            if(resp.status==='201'){
              return resp.data.message
            }
          })
          this.wait=false
          await this.$refs.rejectmodal.show({
              title: 'Modifier un utilisateur.'
          })
      }catch(error){
        console.log(error)
        this.wait=false
        this.sendAlertMessage({message:error.response.data.message});
      }
    },
    modifiermdp(){
      this.$refs.resetpassword.show({
        title: 'Changement de mot de passe',           
        okButton: 'Enregistrer',
        cancelButton: "Non",
      })
    },
    setChange(e){
      // console.log(e.target.value)
      const i=e.target.id
      if(i==='user'){
        if(e.target.value!=this.user.profil.typeProfil){
          this.disabled=false
          console.log(i)
          console.log(e.target.value)
          console.log(this.user.profil.typeProfil)
          this.form[i]=e.target.value
        }else{
          this.disabled=true
          console.log('OP',this.user.profil.typeProfil)
        }
      }else{
        if(e.target.value!==this.user[i]){
          this.disabled=false
          console.log(i)
          this.form[i]=e.target.value
        }else{
          this.disabled=true
        }
      }
      
      // console.log(this.form[i])
      
    },
    annuler(){
      this.modifier=false
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
        actionButton.innerHTML = '<i class="fa fa-arrow-right fa-1x" style="font-size: 18px"></i>';

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
        
        actionButton.innerHTML = '<i class="fa fa-arrow-left" style="font-size: 18px"></i>';
      }
    },
 
 },

  mounted() {
    
  },
};
</script>
<style scoped>

.pagination {
  display: flex;
  margin: 0.25rem 0.25rem 0;
}
.pagination button {
  flex-grow: 1;
}
.pagination button:hover {
  cursor: pointer;
}

.position_absolute {
  position: absolute;
  bottom: 20px;
  right: 35px;
}
.b-card {
  background-color: transparent !important;
}
.b-col {
  margin-right: 16px;
}
.b-col .content {
  display: flex;
  flex-direction: column;
}

#cover {
  background-image: url("~@/assets/images/logo_sigif_trame.png");
  background-size: 40vw 80vh;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

.collapse-close {
  list-style-type: disclosure-closed;
}
.collapse-open {
  list-style-type: disclosure-open;
}

/*style barre de recherche */
.search-bar-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar-btn {
  border: none;
  border-radius: 6px;
  padding: 6px 20px;
  background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover {
  background-color: rgba(0, 82, 44, 0.89);
  border: none;
}
.search-bar-btn a {
  color: white;
}
.search-bar-btn a:hover {
  font-weight: 600;
  font-style: italic;
}

.search-bar-custum-input {
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.simple-btn {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  cursor:pointer
}

.simple-btn:hover {
  background: none;
  border: none;
}
/*edti style par defaut btn-bootstrap au disable*/
.change-image-opacity:disabled {
  color: #6c757d;
  background-color: white !important;
  border-color: white !important;
}
.change-image-opacity:hover {
  color: #6c757d;
  background-color: rgb(0, 82, 44) !important;
  border-color: white !important;
  cursor: not-allowed;
}
.not-change-image-opacity:hover {
  cursor: pointer;
  color: #82c138;
}
.change-image-opacity {
  opacity: 0.15;
}
.not-change-image-opacity {
  opacity: 1;
}

.label-size{
  padding-top: calc(.25rem + 1px);
  padding-bottom: calc(.25rem + 1px);
  font-size: .875rem;
  line-height: 1.5;
}

.nav-link.active{
  background: rgb(0, 82, 44) !important;
}

.btn.btn-primary,.btn.btn-danger{
  background: rgb(0, 82, 44) !important;
  border-color: rgb(0, 82, 44) !important;
}
.nav-link:hover{
  color:black!important;
  font-weight:bold!important;
   /*color:rgb(0, 82, 44) !important; */
}
.nav-link.active:hover{
  color:white;
}
</style>

<style>
.custom-bg {
  background: rgb(0, 82, 44) !important;
}

</style>
