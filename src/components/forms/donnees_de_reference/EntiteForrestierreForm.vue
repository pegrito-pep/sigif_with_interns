<template>
    <div>
        <b-overlay :show="showOverlay" rounded="sm">
            <form-wizard ref="habitantForm" title='' subtitle='' nextButtonText='suivant' backButtonText='précédent' finishButtonText='Valider' aria-labelledby="demoModalLabel"  @on-complete="onComplete"
                @on-loading="setLoading"
                shape="circle"
                color="#82C138">
                <tab-content title="Informations spécifiques" icon="fa fa-user" :before-change="validateAsync">
                    <b-row>
                        <b-col>
                           <label class="font-weight-normal"><span style="color: red">*</span> Type d'entité forestière </label>
                           <v-select label="libelle" :options="typesEntite" v-model="entiteforrestiere.typeentite" :reduce="entite => entite.value"  class="font-weight-bold  custom-select-type_titre"></v-select>
                        </b-col>
                       </b-row>
                        <!--DEBUT ELEMENTS COMMUNAUTE-->
                            <b-card class="m-2" v-if="entiteforrestiere.typeentite=='FC'">
                                <b-row class="d-flex justify-content-between">
                                    <b-col cols="5">
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="type d'entité juridique" label-for="input-sm">
                                            <v-select label="libelle" :options="typesEntitesJuridique" v-model="entiteforrestiere.typeentitejuridique" :reduce="typeentite => typeentite.libelle" class="font-weight-bold  custom-select-type_titre"></v-select>
                                        </b-form-group>
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Code d'enregistrement" label-for="input-sm">
                                            <b-form-input v-model="entiteforrestiere.codeenregistrement" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: 1254855"  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                            <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                        </b-form-group>
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Nom de l'entité" label-for="input-sm">
                                            <b-form-input v-model="entiteforrestiere.intitule" name="namementite" size="sm" class="p-0 m-0 form-control-xs" placeholder=""  v-validate="{ required: true, }" :state="validateState('namementite')"/>
                                            <b-form-invalid-feedback id="code">{{ veeErrors.first('namementite') }}</b-form-invalid-feedback>
                                        </b-form-group>
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° certificat" label-for="input-sm">
                                            <b-form-input v-model="entiteforrestiere.numcertificat" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: 1254855"  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                            <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="5">
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Marteau/sigle" label-for="input-sm">
                                            <b-form-input v-model="entiteforrestiere.sigle" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: "  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                            <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                        </b-form-group>
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° du document" label-for="input-sm">
                                            <b-form-input name="numerodoc" size="sm" class="p-0 m-0 form-control-xs" placeholder="" v-model="entiteforrestiere.numdocument"/>
                                                <b-form-invalid-feedback id="numerodoc">{{ veeErrors.first('numerodoc') }}</b-form-invalid-feedback>
                                        </b-form-group>
                                        <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date du document" label-for="input-sm">
                                            <date-picker  v-model="entiteforrestiere.datedonument"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                        </b-form-group>
                                        <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date certificat" label-for="input-sm">
                                            <date-picker  v-model="entiteforrestiere.datecertificat"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
       
                            </b-card>
                        <!--FIN DEBUT ELEMENTS COMMUNAUTE-->
                        <!--DEBUT ELEMENTS COMMUNE-->
                        <b-card class="m-2" v-if="entiteforrestiere.typeentite=='CC'">
                            <b-row class="d-flex justify-content-between">
                                <b-col cols="5">
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Code d'enregistrement" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.codeenregistrement" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: 1254855"  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Nom de la commune" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.intitule" name="namementite" size="sm" class="p-0 m-0 form-control-xs" placeholder=""  v-validate="{ required: true, }" :state="validateState('namementite')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('namementite') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° décret de classement" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.numdecretclassement" name="namementite" size="sm" class="p-0 m-0 form-control-xs" placeholder=""  v-validate="{ required: true, }" :state="validateState('namementite')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('namementite') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="5">
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Marteau/sigle" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.sigle" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: "  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° du document" label-for="input-sm">
                                        <b-form-input name="numerodoc" size="sm" class="p-0 m-0 form-control-xs" placeholder="" v-model="entiteforrestiere.numdocument"/>
                                            <b-form-invalid-feedback id="numerodoc">{{ veeErrors.first('numerodoc') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date du document" label-for="input-sm">
                                        <date-picker  v-model="entiteforrestiere.datedonument"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                    </b-form-group>
                                    <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date decret classement" label-for="input-sm">
                                        <date-picker  v-model="entiteforrestiere.datedecretclassement"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
   
                        </b-card>
                        <!--FIN DEBUT ELEMENTS COMMUNE-->
                        <!--DEBUT ELEMENTS OPERATEUR FOOESTIER-->
                        <b-card class="m-2" v-if="entiteforrestiere.typeentite=='ON'||entiteforrestiere.typeentite=='IN'">
                            <b-row class="d-flex justify-content-between">
                                <b-col cols="5">
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Code d'enregistrement" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.codeenregistrement" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: 1254855"  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Nom de l'entité" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.intitule" name="namementite" size="sm" class="p-0 m-0 form-control-xs" placeholder=""  v-validate="{ required: true, }" :state="validateState('namementite')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('namementite') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° Regitre de commerce" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.numregcommerce" name="namementite" size="sm" class="p-0 m-0 form-control-xs" placeholder=""  v-validate="{ required: true, }" :state="validateState('namementite')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('namementite') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date du registre de commerce" label-for="input-sm">
                                        <date-picker  v-model="entiteforrestiere.dateregcommerce"  format="DD-MM-YYYY" placeholder=""  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="5">
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Marteau/sigle" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.sigle" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: "  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° du document" label-for="input-sm">
                                        <b-form-input name="numerodoc" size="sm" class="p-0 m-0 form-control-xs" placeholder="" v-model="entiteforrestiere.numdocument"/>
                                            <b-form-invalid-feedback id="numerodoc">{{ veeErrors.first('numerodoc') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date du document" label-for="input-sm">
                                        <date-picker  v-model="entiteforrestiere.datedonument"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                    </b-form-group>
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° de contribuable" label-for="input-sm">
                                        <b-form-input name="numerodoc" size="sm" class="p-0 m-0 form-control-xs" placeholder="" v-model="entiteforrestiere.numcontribuable"/>
                                            <b-form-invalid-feedback id="numerodoc">{{ veeErrors.first('numerodoc') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date de contribuable" label-for="input-sm">
                                        <date-picker  v-model="entiteforrestiere.datecontribuable"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
   
                        </b-card>
                        <!--FIN DEBUT ELEMENTS OPERATEUR FORRESTIER-->
                        <!--DEBUT ELEMENTS MINFOF-->
                            <b-card class="m-2" v-if="entiteforrestiere.typeentite=='MF'">
                                <div>
                                    <b-row>
                                        <b-col>
                                            <b-form-group v-if="entiteforrestiere.typeentite=='MF'">
                                                <label class="p-0 m-0 font-weight-50 font-weight-normal"><span style="color: red">*</span>Type d'entité MINFOF</label>
                                                <v-select label="libelle" :options="typesEntitesMinfof" v-model="entiteforrestiere.typeentiteminfof" :reduce="typeentiteforrestiere => typeentiteforrestiere.value" class="font-weight-bold  custom-select-type_titre"></v-select>
                                            </b-form-group>
                                        </b-col>
                                        <b-col>
                                            <b-form-group>
                                                <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Code d'enregistrement</label>
                                                <b-form-input v-model="entiteforrestiere.codeenregistrement" name="code" size="sm" class="w-75 p-0 m-0 font-weight-300" placeholder="code d'enregistrement"  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                                <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                            </b-form-group>
                                        </b-col>
                                        <b-col>
                                            <b-form-group v-if="entiteforrestiere.typeentite=='MF'">
                                                <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Nom de l'entité</label>
                                                <b-form-input v-model="entiteforrestiere.intitule" name="namementite" size="sm" class="w-75 p-0 m-0" placeholder=""  v-validate="{ required: true, }" :state="validateState('namementite')"/>
                                                <b-form-invalid-feedback id="code">{{ veeErrors.first('namementite') }}</b-form-invalid-feedback>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </div>
                            </b-card>
                        <!--FIN DEBUT ELEMENTS MINFOF-->

                        <!--DEBUT ELEMENTS PARTICULIER-->
                            <b-card class="m-2" v-if="entiteforrestiere.typeentite=='PA'">
                                <b-row class="d-flex justify-content-between">
                                    <b-col cols="5">
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Code d'enregistrement" label-for="input-sm">
                                            <b-form-input v-model="entiteforrestiere.codeenregistrement" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: 1254855"  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                            <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                        </b-form-group>
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Nom" label-for="input-sm">
                                            <b-form-input v-model="nom" name="nom" size="sm" class="p-0 m-0 form-control-xs" placeholder=""  v-validate="{ required: true, }" :state="validateState('nom')"/>
                                            <b-form-invalid-feedback id="nom">{{ veeErrors.first('nom') }}</b-form-invalid-feedback>
                                        </b-form-group>
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Prénom" label-for="input-sm">
                                            <b-form-input v-model="prenom" name="prenom" size="sm" class="p-0 m-0 form-control-xs" placeholder=""  v-validate="{ required: true, }" :state="validateState('prenom')"/>
                                            <b-form-invalid-feedback id="prenom">{{ veeErrors.first('prenom') }}</b-form-invalid-feedback>
                                        </b-form-group>
                                     
                                    </b-col>
                                    <b-col cols="5">
                                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° carte d'identité" label-for="input-sm">
                                            <b-form-input v-model="entiteforrestiere.numcni" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: "  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                            <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                        </b-form-group>
                            
                                        <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date de délivrance" label-for="input-sm">
                                            <date-picker  v-model="entiteforrestiere.datecni"  format="DD-MM-YYYY" placeholder="date de délivrance cni"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                        </b-form-group>
                                        <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="Attacher copie CNI" label-class="font-weight-normal" label-for="input-sm">
                                            <input type="file" ref="attecopiecni" @change="selectattachecopiecniFile" id="attecopiecni"/>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-card>
                        <!--FIN ELEMENTS PARTICULIER-->
                        <!--DEBUT ELEMENTS CERTIFICAT PRIVE-->
                        <b-card class="m-2" v-if="entiteforrestiere.typeentite=='PS'">
                            <b-row class="d-flex justify-content-between">
                                <b-col cols="5">
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Code d'enregistrement" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.codeenregistrement" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: 1254855"  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Nom de l'organisme" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.intitule" name="nom" size="sm" class="p-0 m-0 form-control-xs" placeholder=""  v-validate="{ required: true, }" :state="validateState('nom')"/>
                                        <b-form-invalid-feedback id="nom">{{ veeErrors.first('nom') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Marteau/sigle" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.sigle" name="code" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="ex: "  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                        <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                                    </b-form-group>
                                 
                                </b-col>
                                <b-col cols="5">
                                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° Acte MINFOF" label-for="input-sm">
                                        <b-form-input v-model="entiteforrestiere.numacteminfof" name="numacteminfof" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                        <b-form-invalid-feedback id="numacteminfof">{{ veeErrors.first('numacteminfof') }}</b-form-invalid-feedback>
                                    </b-form-group>
                        
                                    <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date acte MINFOF" label-for="input-sm">
                                        <date-picker  v-model="entiteforrestiere.dateacteminfof"  format="DD-MM-YYYY" placeholder="date de signature acte MINFOF"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                    </b-form-group>
                                    <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="Attacher copie CNI" label-class="font-weight-normal" label-for="input-sm">
                                        <input type="file" ref="attacheacteminfof" @change="selectattacheacteminfofFile" id="attacheacteminfof"/>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-card>
                    <!--FIN ELEMENTS CERTIFICAT PRIVE-->
                </tab-content>
                <tab-content title="Informations de base" icon="fas fa-image" :before-change="validateSecond">
                    <b-card v-if="entiteforrestiere.typeentite!='PA'"  header-tag="header" footer-tag="footer">
                    
                        <b-row class="d-flex justify-content-between">
                            <b-col cols="5">
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="E-mail" label-for="input-sm">
                                    <b-form-input class="p-0 m-0 form-control-xs"  size="sm" v-model="entiteforrestiere.email" placeholder="ex: devpro.12@gmail.com" type="email" v-validate="'required|email'" :state="validateState('email')" aria-describedby="email" data-vv-as="email"></b-form-input>
                                    <b-form-invalid-feedback id="prenom">{{ veeErrors.first('email') }}</b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="Nom Responsable" label-for="input-sm">
                                    <b-form-input name="telephone" size="sm" class="p-0 m-0 form-control-xs" type="tel" placeholder="telephone" v-model="entiteforrestiere.responsable" v-validate="{ required: true, min: 9 }" :state="validateState('telephone')"/>
                                    <b-form-invalid-feedback id="telephone">{{ veeErrors.first('telephone') }}</b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="Adresse" label-for="input-sm">
                                    <b-form-input name="adresse" size="sm" class="m-0 form-control-xs" placeholder="adresse" v-model="entiteforrestiere.adresse"  v-validate="{ required: true, min: 3 }" :state="validateState('adresse')"/>
                                    <b-form-invalid-feedback id="adresse">{{ veeErrors.first('adresse') }}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col cols="5">
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="N° de Téléphone" label-for="input-sm">
                                    <b-form-input size="sm" class="m-0" type="tel" placeholder="ex: 693120201" v-model="entiteforrestiere.telephone"  v-validate="{ required: true, min: 9 }" :state="validateState('telephone')"/>
                                    <b-form-invalid-feedback id="telephone">{{ veeErrors.first('telephone') }}</b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="N° Responsable" label-for="input-sm">
                                    <b-form-input name="telephone" size="sm" class="p-0 m-0 form-control-xs" type="tel" placeholder="telephone" v-model="entiteforrestiere.telresponsable" v-validate="{ required: true, min: 9 }" :state="validateState('telephone')"/>
                                    <b-form-invalid-feedback id="telephone">{{ veeErrors.first('telephone') }}</b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="E-mail Responsable" label-for="input-sm">
                                    <b-form-input class="p-0 m-0 form-control-xs"  size="sm" v-model="entiteforrestiere.emailresponsable" placeholder="ex: devpro.12@gmail.com" type="email" v-validate="'required|email'" :state="validateState('email')" aria-describedby="email" data-vv-as="email"></b-form-input>
                                    <b-form-invalid-feedback id="prenom">{{ veeErrors.first('email') }}</b-form-invalid-feedback>
                                </b-form-group>
                                
                            </b-col>
                        </b-row>
                    </b-card>
                    <b-card v-if="entiteforrestiere.typeentite=='PA'"  header-tag="header" footer-tag="footer">
                    
                        <b-row class="d-flex justify-content-between">
                            <b-col cols="5">
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="E-mail" label-for="input-sm">
                                    <b-form-input class="p-0 m-0 form-control-xs"  size="sm" v-model="entiteforrestiere.email" placeholder="ex: devpro.12@gmail.com" type="email" v-validate="'required|email'" :state="validateState('email')" aria-describedby="email" data-vv-as="email"></b-form-input>
                                    <b-form-invalid-feedback id="prenom">{{ veeErrors.first('email') }}</b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="Adresse" label-for="input-sm">
                                    <b-form-input name="adresse" size="sm" class="m-0 form-control-xs" placeholder="adresse" v-model="entiteforrestiere.adresse"  v-validate="{ required: true, min: 3 }" :state="validateState('adresse')"/>
                                    <b-form-invalid-feedback id="adresse">{{ veeErrors.first('adresse') }}</b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="N° de Téléphone" label-for="input-sm">
                                    <b-form-input size="sm" class="m-0" type="tel" placeholder="ex: 693120201" v-model="entiteforrestiere.telephone"  v-validate="{ required: true, min: 9 }" :state="validateState('telephone')"/>
                                    <b-form-invalid-feedback id="telephone">{{ veeErrors.first('telephone') }}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col cols="5">
                                <b-form-group label-cols="6" label-cols-lg="6" label-class="font-weight-normal" label-size="sm" label="N° certificat de domicile" label-for="input-sm">
                                    <b-form-input name="numcertificat" size="sm" class="p-0 m-0 form-control-xs" type="tel" placeholder="telephone" v-model="entiteforrestiere.numcertificat" v-validate="{ required: true, min: 9 }" :state="validateState('telephone')"/>
                                    <b-form-invalid-feedback id="telephone">{{ veeErrors.first('telephone') }}</b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group label-cols="6"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date certificat" label-for="input-sm">
                                    <date-picker  v-model="entiteforrestiere.datecertificat"  format="DD-MM-YYYY" placeholder="date d'emission certificat de domicile"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                </b-form-group>
                                <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="Attacher certificat de domicile" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="attachecertificat" @change="selectattachecertificatFile" id="attachecertificat"/>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-card>
                </tab-content>
                <tab-content title="Autres informations" icon="fas fa-info-circle">
                    <b-card  header-tag="header" footer-tag="footer">
                        <b-row class="d-flex justify-content-between">
                            <b-col cols="5">
                                <b-form-group>
                                    <div>
                                        <label for="" class="m-0 p-0 font-weight-normal" style="font-weight-bold"><span style="color: red">*</span>Région</label><br>
                                        <select v-model="form.idregion" class="m-0 p-0"  style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                            <option v-for="region in regions" :key="region.idregion" :value="region.idregion"> {{ region.intitule }}</option>
                                        </select>
                                    </div>
                                    <b-form-invalid-feedback id="region">{{ veeErrors.first('region') }}</b-form-invalid-feedback>
                                </b-form-group> 
                                <b-form-group>
                                    <div>
                                      <label for="" class="m-0 p-0 font-weight-normal" style="font-weight-bold"><span style="color: red">*</span>Département</label><br>
                                      <select :disabled="disableDep" v-model="form.iddepartement" class="m-0 p-0"  style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                          <option v-for="departement in _departements" :key="departement.iddepartement" :value="departement.iddepartement"> {{ departement.intitule }}</option>
                                      </select>
                                      </div>
                                      <b-form-invalid-feedback id="departement">{{ veeErrors.first('departement') }}</b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group>
                                    <div>
                                      <label for="" class="m-0 p-0 font-weight-normal" style="font-weight-bold"><span style="color: red">*</span>Arrondissement</label><br>
                                      <select :disabled="disableArrond" v-model="entiteforrestiere.idarrondissement" class="m-0 p-0"  style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                        <option v-for="arrondissement in _arrondissements" :key="arrondissement.idarrondissement" :value="arrondissement.idarrondissement"> {{ arrondissement.intitule }}</option>
                                      </select>
                                    </div>
                                      <b-form-invalid-feedback id="arrondissement">{{ veeErrors.first('arrondissement') }}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <!--AUTRES ELEMENTS COMMUNAUTE-->
                            <b-col cols="5" v-if="entiteforrestiere.typeentite=='FC'">
                                <b-form-group label-cols="9" label-cols-lg="9" label-size="sm" label="Attaché document" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="atacherdocument" @change="selectAtacherdocumentFile" id="atacherdocument"/>
                                </b-form-group>
                                <b-form-group label-cols="9" label-cols-lg="" label-size="sm" label="Certificat d'enregistrement" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="certificatenregistrement" @change="selectCertificatEnregistrementFile" id="certificatenregistrement"/>
                                </b-form-group>
                                <b-form-group label-cols="9" label-cols-lg="9" label-size="sm" label="Attache portant creation de l'entité" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="documententite" @change="selectDocumentEntiteFile" id="documententite"/>
                                </b-form-group>
                            </b-col>
                            <!--AUTRES ELEMENTS COMMUNE-->
                            <b-col cols="5" v-if="entiteforrestiere.typeentite=='CC'">
                                <b-form-group label-cols="9" label-cols-lg="9" label-size="sm" label="Attaché document" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="atacherdocument" @change="selectAtacherdocumentFile" id="atacherdocument"/>
                                </b-form-group>
                                <b-form-group label-cols="9" label-cols-lg="" label-size="sm" label="Attache decret de clasement" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="decretclassement" @change="selectDecretclassementFile" id="decretclassement"/>
                                </b-form-group>
                            </b-col>
                            <!--AUTRES ELEMENTS COMMUNE-->
                            <b-col cols="5" v-if="entiteforrestiere.typeentite=='ON'||entiteforrestiere.typeentite=='IN'">
                                <b-form-group label-cols="9" label-cols-lg="9" label-size="sm" label="Attaché document" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="atacherdocument" @change="selectAtacherdocumentFile" id="atacherdocument"/>
                                </b-form-group>
                                <b-form-group label-cols="9" label-cols-lg="" label-size="sm" label="Attache registre de commerce" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="registrecommerce" @change="selectegistrecommerceFile" id="decretclassement"/>
                                </b-form-group>
                                <b-form-group label-cols="9" label-cols-lg="" label-size="sm" label="Attache contribuable" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="decretclassement" @change="selectattachecontribuableFile" id="decretclassement"/>
                                </b-form-group>
                                <b-form-group v-if="entiteforrestiere.typeentite=='ON'" label-cols="9" label-cols-lg="9" label-size="sm" label="Attache Marteau forrestier" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="marteauforrestier" @change="selectattachemarteauFile" id="decretclassement"/>
                                </b-form-group>
                                <b-form-group v-if="entiteforrestiere.typeentite=='IN'" label-cols="9" label-cols-lg="9" label-size="sm" label="Attache Extrait" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="attacheextrait" @change="selectattacheextraitFile" id="attacheextrait"/>
                                </b-form-group>
                            </b-col>
                            <!--AUTRES ELEMENTS PARTICULIER-->
                            <b-col v-if="entiteforrestiere.typeentite=='PA'">
                                <b-form-group>
                                    <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>commentaire </label>
                                    <b-form-textarea id="textarea" v-model="entiteforrestiere.commentaire" placeholder="Enter something..." rows="1" max-rows="3"></b-form-textarea>
                                </b-form-group>
                            </b-col>
                            <!-- AUTRES INFORMATIONS CERTIFICAT PRIVEE-->
                            <b-col v-if="entiteforrestiere.typeentite=='PS'">
                                <b-form-group>
                                    <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Description </label>
                                    <b-form-textarea id="textarea" v-model="entiteforrestiere.description" placeholder="Enter something..." rows="1" max-rows="3"></b-form-textarea>
                                </b-form-group>
                            </b-col>
                        </b-row> 
                    </b-card>
                </tab-content>
                <tab-content v-if="entiteforrestiere.typeentite=='ON'||entiteforrestiere.typeentite=='IN'" title="Précisions aditionnelles" icon="fas fa-image" :before-change="validateSecond">
                    <b-card  header-tag="header" footer-tag="footer">
                        <b-row class="d-flex justify-content-between">
                            <b-col cols="5">
                                <b-form-group class="pl-1 mt-1"><b-form-checkbox  v-model="entiteforrestiere.personnephysique">{{ entiteforrestiere.personnephysique ?  'n\'est pas une personne physique'  : 'est une personne physique'}}</b-form-checkbox></b-form-group>   
                                <b-form-group class="pl-1 mt-1"><b-form-checkbox   v-model="entiteforrestiere.societeexploitation">{{ entiteforrestiere.societeexploitation ?  'n\'est pas une société à d\'exploitation forrestière'  : 'est une société à d\'exploitation forrestière'}}</b-form-checkbox></b-form-group>   
                            </b-col>
                            <b-col cols="5">
                                <b-form-group class="pl-1 mt-1"><b-form-checkbox   v-model="entiteforrestiere.societeinventaire">{{ entiteforrestiere.societeinventaire ?  'n\'est pas une société agrée à l\'inventaire'  : 'est une société agrée à l\'inventaire'}}</b-form-checkbox></b-form-group>   
                                <b-form-group class="pl-1 mt-1"><b-form-checkbox   v-model="entiteforrestiere.societesylviculture">{{ entiteforrestiere.societesylviculture ?  'n\'est pas une société de sylviculture'  : 'est une société de sylviculture'}}</b-form-checkbox></b-form-group>   
                                <b-form-group class="pl-1 mt-1"><b-form-checkbox  v-model="entiteforrestiere.societetransformation">{{ entiteforrestiere.societetransformation ?  'n\'est pas une société de transformation'  : 'est une société de transformation'}}</b-form-checkbox></b-form-group>      
                            </b-col>
                        </b-row>
                        <b-row v-if="form.personnephysique==true">
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> N* du certificat</label>
                                    <b-form-input v-model="entiteforrestiere.codeenregistrement" name="numcertificat" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="" :state="validateState('numcertificat')"/>
                                    <b-form-invalid-feedback id="numcertificat">{{ veeErrors.first('numcertificat') }}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> Date du certificat</label>
                                    <date-picker  v-model="entiteforrestiere.datecertificat"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols="9" label-cols-lg="" label-size="sm" label="Attache certificat" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="decretclassement" @change="selecteCertificatFile" id="decretclassement"/>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row v-if="form.societeexploitation==true">
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> N* agrée à l'exploitation</label>
                                    <b-form-input v-model="entiteforrestiere.numagrexploit" name="numcertificat" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="" :state="validateState('numcertificat')"/>
                                    <b-form-invalid-feedback id="numcertificat">{{ veeErrors.first('numcertificat') }}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> Date d'exploitation</label>
                                    <date-picker  v-model="entiteforrestiere.dateagrexploit"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols="9" label-cols-lg="" label-size="sm" label="Attache Certificat d'exploitation" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="decretclassement" @change="selecteExploitationFile" id="decretclassement"/>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row v-if="form.societeinventaire==true">
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> N* agrée à l'invertaire</label>
                                    <b-form-input v-model="entiteforrestiere.numagrinvent" name="numcertificat" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="" :state="validateState('numcertificat')"/>
                                    <b-form-invalid-feedback id="numcertificat">{{ veeErrors.first('numcertificat') }}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> Date d'inventaire</label>
                                    <date-picker  v-model="entiteforrestiere.dateagrinvent"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols="9" label-cols-lg="" label-size="sm" label="Attache d'inventaire" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="decretclassement" @change="selecteExploitationFile" id="decretclassement"/>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row v-if="form.societesylviculture==true">
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> N* Société sylvicole</label>
                                    <b-form-input v-model="entiteforrestiere.numagrsylvic" name="numcertificat" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="" :state="validateState('numcertificat')"/>
                                    <b-form-invalid-feedback id="numcertificat">{{ veeErrors.first('numcertificat') }}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> Date creation société sylvicole</label>
                                    <date-picker  v-model="entiteforrestiere.dateagrinvent"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols="9" label-cols-lg="" label-size="sm" label="Attache document creation société sylvicole" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="decretclassement" @change="selecteExploitationFile" id="decretclassement"/>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row v-if="form.societetransformation==true">
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> N* certificat de transformation</label>
                                    <b-form-input v-model="entiteforrestiere.numcertiftransf" name="numcertificat" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="" :state="validateState('numcertificat')"/>
                                    <b-form-invalid-feedback id="numcertificat">{{ veeErrors.first('numcertificat') }}</b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> Date certificat de transformation</label>
                                    <date-picker  v-model="entiteforrestiere.datecertiftransf"  format="DD-MM-YYYY" placeholder="date d'émission du document"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label-cols="9" label-cols-lg="" label-size="sm" label="Attache certificat de transformation" label-class="font-weight-normal" label-for="input-sm">
                                    <input type="file" ref="decretclassement" @change="selecteExploitationFile" id="decretclassement"/>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-card>
                </tab-content>
                <div class="leloader" v-if="loadingWizard"></div>
            </form-wizard> 
            <error-dialogue ref="errorDialogue"></error-dialogue>                
        </b-overlay>
    </div>
</template>
<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import ErrorDialogue from '@/components/utils/AlertBox.vue';
const php = require('phpjs');
import { mapGetters } from 'vuex'

export default {
    name:'entite-form',
    data:()=>({
        typesEntite:[
          {libelle: "communauté",value:"FC"},{libelle: "commune",value:"CC"},
          {libelle: "Opérateur forestier",value:"ON"},{libelle: "MINFOF","value":"MF"},
          {libelle: "Autres ","value":"IN"},{libelle: "certification privée",value:"PS"},{libelle: "Particulier",value:"PA"}],
      typesEntitesJuridique:[{libelle: "GIE"},{libelle: "Association"},{libelle: "GIC"},{libelle: "Coopérative"},{libelle: "Autres"}],
      typesEntitesMinfof:[
        {libelle: "Délégation Régionale",value: "DREG"},
        {libelle: "Délégation départementale",value: "DDEP"},
        {libelle: "Poste Forrestier",value: "PFOR"},
        {libelle: "Poste Frontière",value: "PFRO"},
        {libelle: "Checkpoint"},{value: "CPT"},
        {libelle: "Port"},{value: "PORT"}
      ],
      arrondissements: [],
      departements: [], 
      regions: [],
      isActive:false,
      showOverlay:false,
      submitted:false,
      submittedcontinue:false,
        form: {
          typeentite: null,
          idregion: null,
          iddepartement: null, 
        },
        disableDep:true,
        disableArrond:true,

        format:"yyyy-MM-dd",
        clear:true,
        placeholderdatedocument:"date du document",
        placeholderdatecertificat:"date du certificat",
        entiteforrestiere: {
            adresse: "",
            atacherdocument: "", //piece jointe
            certificatenregistrement:"",//pièce jointe
            documententite:"",//pièce jointe

            attachermarteau:"", //pice jointe unique Operateur Forrestier

            codeenregistrement: "",
            datecertificat: "",
            datedonument: "",
            documentcreation: "",
            email: "",
            emailresponsable: "",
            idarrondissement:"",
            intitule: "",
            numcertificat: "",
            numdocument: "",
            responsable: "",
            sigle: "",
            statut: false,
            telephone: "",
            telresponsable: "",
            typeentite: "",
            typeentitejuridique: "",
            
            numdecretclassement:"",
            datedecretclassement:"",
            atacherdecretclassement:"",
            numregcommerce:"",
            dateregcommerce:"",
            attacherregcommerce:"",
            numcontribuable:"",
            datecontribuable:"",
            attachercontribuable:"",
            personnephysique:false,
            societeexploitation: false, // boolean, non obligatoire
            societeinventaire: false, // boolean, non obligatoire
            societesylviculture: false, // boolean, non obligatoire
            societetransformation: false,

            typeentiteminfof:"",

            attachercni:""
        },
        nom:"",
        prenom:"",
        typesTitreSelected:false,
        CodeEnregistrement:{},
        grumeSelected:false,
        colisSelected:false,
        grumesAbbattageSelected:false,
        
        typesTitre:[ {"libelle" :"concession forrestière en convention provisoire","value":11},
                     {"libelle" :"concession forrestière en convention définitive","value":12},
                     {"libelle" :"foret communale","value":13},{"libelle" :"foret communautaire en convention provisoire","value":14},
                     {"libelle" :"foret communautaire en convention définitive","value":15},{"libelle" :"vente de coupe","value":16}],
      
       
        requiredTypeTitre:true,
        requiredCodeEnregistrement:true,
        requiredSite:true,
        requiredPermis:true,
        setTitre:false,
         titres:[
           {"libelle" :"2012","value":"2012"},{"libelle" :"41254","value":"41254"},{"libelle" :"012454","value":"012454"},
           {"libelle" :"1014254","value":"1014254"},{"libelle" :"1014255","value":"1014255"},{"libelle" :"01254","value":"01254"}
        ],

        loadingWizard: false,
    }),
    components: {
        FormWizard,
        TabContent,
        ErrorDialogue
    },
    props: {
        action: {type: String},
        locataire: {type: Object, default: null}
    },
    computed: { 
      ...mapGetters(['user']),

        _departements() {
            return this.departements.filter(elt => elt.region.idregion == this.form.idregion)
        },
        _arrondissements() {
            return this.arrondissements.filter(elt => elt.departement.iddepartement == this.form.iddepartement)
        },
    },
    watch: {
      "form.idregion"(value) {
        if(value!==null&&value.length!==''){
            this.disableDep= false
        }
        else{
            this.disableDep= true
        }
     },
     "form.iddepartement"(value) {
        if(value!==null&&value.length!==''){
            this.disableArrond= false
        }
        else{
            this.disableArrond= true
        }
     },
   
    },

    mounted() {
         this.getLocalites()
    },
    methods: {
        async selectattacheacteminfofFile(e){
            const attacheacteminfof =e.target.files[0];
            this.entiteforrestiere.attachercacteminfof=await this.getBase64(attacheacteminfof)
        },
        async selectattachecertificatFile(e){
            const attachecertificat =e.target.files[0];
            this.entiteforrestiere.attachercertificat=await this.getBase64(attachecertificat)
        },
        async selectattachecopiecniFile(e){
            const attachecopicni =e.target.files[0];
            this.entiteforrestiere.attachercni=await this.getBase64(attachecopicni)
        },
        async selectAtacherdocumentFile(e){
            const attachedocument =e.target.files[0];
            this.entiteforrestiere.atacherdocument=await this.getBase64(attachedocument)
        },
        async selectattacheextraitFile(e){
            const attacheextrait =e.target.files[0];
            this.entiteforrestiere.atacherdocument=await this.getBase64(attacheextrait)
        },
        async selectCertificatEnregistrementFile(e){
            const certificatenregistrement =e.target.files[0];
            this.entiteforrestiere.certificatenregistrement=await this.getBase64(certificatenregistrement)
        },
        async selectDocumentEntiteFile(e){
            const documententite =e.target.files[0];
            this.entiteforrestiere.documententite=await this.getBase64(documententite)
        },
        async selectDecretclassementFile(e){
            const decretclassement =e.target.files[0];
            this.entiteforrestiere.atacherdecretclassement=await this.getBase64(decretclassement)
        },
        async selectegistrecommerceFile(e){
            const registrecommerce =e.target.files[0];
            this.entiteforrestiere.attacherregcommerce=await this.getBase64(registrecommerce)
        },
        async selectattachecontribuableFile(e){
            const attachecontribuable =e.target.files[0];
            this.entiteforrestiere.attachercontribuable=await this.getBase64(attachecontribuable)
        },
        async selectattachemarteauFile(e){
            const attachemarteau =e.target.files[0];
            this.entiteforrestiere.attachermarteau=await this.getBase64(attachemarteau)
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        async errorHappened(data) {
        const ok = await this.$refs.errorDialogue.show({
               title: "Erreur",
               message: data.status == '400' ?'données incompètes' : 'Erreur interne du serveur' ,
               okButton: 'Quitter',
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.errorDialogue._close();
                this.$emit('closeForm')
            } else {
               this.$refs.errorDialogue._close();
               this.resetForm()
            }
        },
        setUserStatut(statut){
            if(statut){
                this.newuser.statut=1
            }else{this.newuser.statut=0}
        },
        validateState(ref) {
          if (
              this.veeFields[ref] &&
              (this.veeFields[ref].dirty || this.veeFields[ref].validated)
          ) 
          { return !this.veeErrors.has(ref);}
              return null;
        },
        


        triggerSetTitre(){this.setTitre=true},
        validateState(ref) {
        if (
            this.veeFields[ref] &&
            (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) 
        { return !this.veeErrors.has(ref);}
            return null;
        },
        resetForm() {
            this.entiteforrestiere = {
                adresse: "",
            atacherdocument: "", //piece jointe
            certificatenregistrement:"",//pièce jointe
            documententite:"",//pièce jointe

            codeenregistrement: "",
            datecertificat: "",
            datedonument: "",
            documentcreation: "",
            email: "",
            emailresponsable: "",
            idarrondissement:"",
            intitule: "",
            numcertificat: "",
            numdocument: "",
            responsable: "",
            sigle: "",
            statut: false,
            telephone: "",
            telresponsable: "",
            typeentite: "",
            typeentitejuridique: "",
            
            numdecretclassement:"",
            datedecretclassement:"",
            atacherdecretclassement:"",
            numregcommerce:"",
            dateregcommerce:"",
            attacherregcommerce:"",
            numcontribuable:"",
            datecontribuable:"",
            attachercontribuable:"",
            personnephysique:false,
            societeexploitation: false, // boolean, non obligatoire
            societeinventaire: false, // boolean, non obligatoire
            societesylviculture: false, // boolean, non obligatoire
            societetransformation: false,

            typeentiteminfof:""
            };

            this.$nextTick(() => {
                this.$validator.reset();
            });
        },
    
        //méthodes liées au form-wizard
        setLoading: function(value) {
                this.loadingWizard = value
        },
            
        validateAsync:function() {
            return true;
            return new Promise((resolve, reject) => {
                
                if(!this.habitant.nom || !this.habitant.tel){
                    if(!this.habitant.nom){this.requiredNom=false;}
                    else {this.requiredNom=true;}
                    if(!this.habitant.tel){this.requiredTel=false;}
                    else{this.requiredTel=true;}
                    this.check=false
                }else{
                    this.check=true
                    this.alreadyset=true;
                }
            setTimeout(() => {
                resolve(this.check)
            }, 1000)
            })
        },
        validateSecond:function() {
            return true;
                return new Promise((resolve, reject) => {
                    
                   if(!this.habitant.tel){
                        this.check2=false
                    }else{
                        this.check2=true
                    }
                setTimeout(() => {
                    resolve(this.check2)
                }, 1000)
                })
        },
        changeForm(){
            console.log("entrée ici")
            let commande=this.selected
            console.log("valeur sélectionnée",commande)
            if(commande==='1'){
                this.isCodeUtilisateur=true;
                this.step=0;
            }
            if(commande==='2'){
                this.step=1;
                this.isCodeUtilisateur=false
            }

        },
        resetModal() {
            this.entiteforrestiere = {
                adresse: "",
            atacherdocument: "", //piece jointe
            certificatenregistrement:"",//pièce jointe
            documententite:"",//pièce jointe

            codeenregistrement: "",
            datecertificat: "",
            datedonument: "",
            documentcreation: "",
            email: "",
            emailresponsable: "",
            idarrondissement:"",
            intitule: "",
            numcertificat: "",
            numdocument: "",
            responsable: "",
            sigle: "",
            statut: false,
            telephone: "",
            telresponsable: "",
            typeentite: "",
            typeentitejuridique: "",
            
            numdecretclassement:"",
            datedecretclassement:"",
            atacherdecretclassement:"",
            numregcommerce:"",
            dateregcommerce:"",
            attacherregcommerce:"",
            numcontribuable:"",
            datecontribuable:"",
            attachercontribuable:"",
            personnephysique:false,
            societeexploitation: false, // boolean, non obligatoire
            societeinventaire: false, // boolean, non obligatoire
            societesylviculture: false, // boolean, non obligatoire
            societetransformation: false,

            typeentiteminfof:""
            };
             this.$nextTick(() => {
                this.$validator.reset();
            });

            this.$bvModal.hide('habitantModal');
            setTimeout(() => {
                this.$emit('closeModal');
            }, 500);
        },
        getLocalites() {
            this.$donneesReference.get("arrondissements?size=400").then(response => response.data).then(response => {
                this.arrondissements = response.result.items
                
                for (const dep of this.arrondissements.map(elt => elt.departement)) {
                    if (!this.departements.map(elt => elt.iddepartement).includes(dep.iddepartement)) {
                        this.departements.push(dep)
                    }
                }
                for (const reg of this.departements.map(elt => elt.region)) {
                    if (!this.regions.map(elt => elt.idregion).includes(reg.idregion)) {
                        this.regions.push(reg)
                    }
                }

                this.regions = this.regions.sort((a, b) => a.intitule > b.intitule ? 1 : -1)
            })
        },

        //validation formulaire d'ajout/modification d'una annonce
        onComplete(){
            this.showOverlay=true;
           
            

            if (this.action == 'edit') {
                
            }
            else {
                if(this.entiteforrestiere.typeentite=='PA'){
                    this.entiteforrestiere.intitule=this.nom+" "+this.prenom
                }
                console.log('data ',this.entiteforrestiere)
                this.$donneesReference.post("entites",this.entiteforrestiere).then(response =>{
                    this.resetModal()
                    this.$emit("entiteAdded", response.result);
                    this.showOverlay=false;
                    return App.notifySuccess(response.data.message)
                }).catch(error =>  {
                    this.showOverlay=false;
                    console.log('erreur ajout entite',error.message)
                    this.errorHappened(error)                 
                });
            }
            
        },
             

    },

}
</script>
<style scoped>
.is-red{
    border-color:red;
}
    .leloader,
.leloader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.leloader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #e74c3c;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.hightPadding{
    padding: 1em!important;
}

</style>