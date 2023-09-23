import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import locale from './modules/locale'
import hasPermit from '../helpers/permissions'
const php = require("phpjs");


Vue.use(Vuex);

const state = {
    user: {},
    typesProfils:[],
    qualites:[],
    profils:[],
    essences:[],
    sites:[],
    sitesnoutbs:[],
    pays:[],
    regions:[],
    departements:[],
    arrondissements:[],
    permissions:[],
    typesTitres:[],
    entitesagrees:[],
    entiteswithoutminfof:[],
    arrondissementsfournis:[],
    sites:[],
    typesSites:[],
    traitements:[],
    entites:[],
    utbs:[],
    produitsTransformations:[],
    lignes:[],
    entreeUsinages:[],
    typesproduits:[],

    codesbarresgrumes:[], //utilisé à CREATION LETTRE DE VOITURE
    permisvalides:[] //utilisé pour la création des permis cités
}

export default new Vuex.Store({
    modules: {
        locale
    },
    plugins: [createPersistedState()],
    state,
    getters: {
        user(state) {
            return state.user
        },
        
        permissions(state) {
          return state.user.profil.privileges.Items||[];
        },
        isSuperAdmin(state) {
            const privileges=(state.user.profil || [])
            if (!privileges) {
                return false
            }
            return state.user.profil.privileges.Items.includes('sigifEntRole')
        },

        hasAccess(state, getters) {
            return (name) => {
                if (getters.isSuperAdmin) {
                    return true
                }
                return hasPermit(name, state.permissions)
            }
        },
        /*hasAccess(state) {
            return (name) => {
                if (name=='sigifEntRole') {
                    return true
                }
                else if(!php.empty(state.user)){return hasPermit(name, state.user.profil.privileges.Items)}
                else{return false;}
            }
        },*/
        lignes(state) {
            return state.lignes
        },
        entreeUsinages(state) {
            return state.entreeUsinages
        },
        essences(state) {
            return state.essences
        },
        typesproduits(state) {
            return state.typesproduits
        },
        codesbarresgrumes(state){
            return state.codesbarresgrumes
        },
        permisvalides(state){
            return state.permisvalides
        }
    },
    mutations: {
        CLEAR_USER_DATA(state){
            console.log('entrée reset mutate');
            state.profils=[]
            state.traitements=[]
            state.user={},
            state.typesProfils=[],
            state.essences=[],
            state.sites=[],
            state.sitesnoutbs=[],
            state.typesSites=[],
            state.pays=[],
            state.regions=[],
            state.departements=[]
            state.arrondissements=[]
            state.permissions=[]
            state.typesTitres=[]
            state.entitesagrees=[]
            state.sites=[]
            state.traitements=[]
            state.entites=[]
            state.utbs=[]
            state.produitsTransformations=[]
            state.lignes=[]
            state.entreeUsinages=[]
            state.typesproduits=[]
            state.entiteswithoutminfof=[]
            state.permisvalides=[]
            state.arrondissementsfournis=[]
        },
        profils(state, profils){
            state.profils=profils;
        },
        qualites(state,qualites){
            state.qualites=qualites
        },
        traitements(state, traitements){
            state.traitements=traitements;
        },
        entites(state, entites){
            state.entites=entites;
        },
        entiteswithoutminfof(state, entiteswithoutminfof){
            state.entiteswithoutminfof=entiteswithoutminfof;
        },
        arrondissementsfournis(state, arrondissementsfournis){
            state.arrondissementsfournis=arrondissementsfournis;
        },
        updateLocale(state, newLocale) {
            state.locale = newLocale
        },

        user(state, user) {
            state.user = user
        },
        typesProfils(state, typeProfils){
            state.typesProfils= typeProfils
        },
        typesTitres(state, tyepestitres){
            state.typesTitres=tyepestitres;
        },
        essences(state, essences){
            state.essences=essences;
        },
        sites(state, sites){
            state.sites=sites;
        },
        typesSites(state, typesSites){
            state.typesSites=typesSites;
        },
        sitesnoutbs(state, sitesnoutbs){
            state.sitesnoutbs=sitesnoutbs;
        },
        pays(state, pays){
            state.pays=pays;
        },
        regions(state, regions){
            state.regions=regions;
        },
        departements(state, departements){
            state.departements=departements;
        },
        arrondissements(state, arrondissements){
            state.arrondissements=arrondissements;
        },
        entitesagrees(state, entitesagrees){
            state.entitesagrees=entitesagrees;

        },
        permissions(state, permissions) {
            state.permissions = permissions
        },
        /**module transformation */
        utbs(state, utbs){
            state.utbs = utbs
        },
        produitsTransformations(state, produitsTransformations){
            state.produitsTrasformations = produitsTransformations
        },
        lignes(state, lignes){
            state.lignes = lignes
        },
        entreeUsinages(state, entreeUsinages){
            state.entreeUsinages = entreeUsinages
        },
        typesproduits(state, typesproduits){
            state.typesproduits = typesproduits
        },
        codesbarresgrumes(state, codesbarresgrumes){
             state.codesbarresgrumes = codesbarresgrumes
        },
        permisvalides(state, permisvalides){
            state.permisvalides = permisvalides
       },
     },
    actions: {
        changeLocale({ commit }, newLocale) {
            console.log('nl',this.$i18n);
            this.$i18n.locale = newLocale // important!
            commit('updateLocale', newLocale)
        },
        user(context, user) {
            context.commit('user', user)
            context.commit('permissions', user.profil.privileges.Items)
        },
        permissions(context, permissions) {
            context.commit('permissions', permissions)
        },
        typesProfils(context, typesProfils){
            context.commit('typesProfils',typesProfils)
        },
        profils(context, profils){
            context.commit('profils',profils)
        },
        qualites(context,qualites){
            context.commit('qualites',qualites)
        },
        traitements(context, traitements){
            context.commit('traitements',traitements)
        },
        entites(context, entites){
            context.commit('entites',entites)
        },
        entiteswithoutminfof(context, entiteswithoutminfof){
            context.commit('entiteswithoutminfof',entiteswithoutminfof)
        },
        arrondissementsfournis(context, arrondissementsfournis){ //utilisé à la création d'un site
            context.commit('arrondissementsfournis',arrondissementsfournis)
        },
        changeSites(context, sites){
            context.commit('sites', sites);
        },
        setUserPreferences({ commit }){
            axios.get('utilisateurs/'+storage.get('access_token'))
                .then(response => {
                    storage.set('user', response.result)
                    commit('user', response.result)
            })
        },
        typesTitres(context, typestitres) {
            context.commit('typesTitres', typestitres)
        },
        entitesagrees(context, entitesagrees) {
            context.commit('entitesagrees', entitesagrees)
        },
        sites(context, sites){
            context.commit('sites', sites)
        },
        typesSites(context, typesSites){
            context.commit('sites', typesSites)
        },
        sitesnoutbs(context, sitesnoutbs){
            context.commit('sitesnoutbs',sitesnoutbs)
        },
        essences(context, essences){
            context.commit('essences', essences)
        },
        pays(context, pays){
            context.commit('pays', pays)
        },
        regions(context, regions){
            context.commit('regions', regions)
        },
        departements(context, departements){
            context.commit('departements', departements)
        },
        arrondissements(context, arrondissements){
            context.commit('arrondissements', arrondissements)
        },
        LogOut :({commit}) =>{
            console.log('entrée reset action');
            commit('CLEAR_USER_DATA')

        },
        changeTypesTitres(context, typesTitres) {
            context.commit('typesTitres', typesTitres);
        },
        /**module transformation */
        utbs(context, utbs) {
            context.commit('utbs', utbs);
        },
        produitsTransformations(context, produitsTransformations) {
            context.commit('produitsTransformations', produitsTransformations);
        },
        lignes(context, lignes){
            context.commit('lignes', lignes);
        },
        entreeUsinages(context, entreeUsinages){
            context.commit('entreeUsinages', entreeUsinages);
        },
        typesproduits(context, typesproduits){
            context.commit('typesproduits', typesproduits);
        },
        codesbarresgrumes(context, codesbarresgrumes){
            context.commit('codesbarresgrumes', codesbarresgrumes);
       },
       permisvalides(context, permisvalides){
        context.commit('permisvalides', permisvalides);
       },
       
        
    },
});