import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import jwtDecode from "jwt-decode";
const php  = require ( 'phpjs' ) ;
import store from '../store'
import unAuthorized from '../views/403.vue'
const routes = [


    /**
     * Authentification
     */
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'empty', noAuth: true },
        component: () =>
            import ('../views/auth/Login.vue')
    },
    /** page d'accès refusé */
    {
        path: '/unauthorized',
        name: 'unauthorized',
        meta: { layout: 'empty', noAuth: true },
        component: unAuthorized
    },
    /**
     * Accueil
     */
    { path: '/',meta: { layout: 'module' }, redirect: { name: 'modules' } },
    {
        path: '/modules',
        name: 'modules',
        meta: { layout: 'module'},
        component: () =>
            import ('../views/Modules.vue')
    }, 
    /**
     * Operations de parc
     */
     {
        path: '/operation_parc-dashboard',
        name: 'operation_parc-dashboard',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/Dashboard.vue')
    },
    {
        path: '/operation_parc-rapport',
        name: 'operation_parc-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/Rapport.vue')
    },
    {
        path: '/entree_parcs',
        name: 'entree_parcs',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/entrees_parcs/Manage.vue')
    },
    {
        path: '/create-entree-parc',
        name: 'create-entree-parc',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/entrees_parcs/Create.vue')
    },
    {
        path: '/entree_parcs/:id',
        name: 'details-entrees_parcs',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/entrees_parcs/detail.vue')
    },
    {
        path: '/regularisations',
        name: 'regularisations',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/regularisations/Manage.vue')
    },
    {
        path: '/regularisations/:id',
        name: 'details-regularisations',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/regularisations/Detail.vue')
    },
    {
        path: '/create-regularisations',
        name: 'create-regularisations',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/regularisations/Create.vue')
    },
    {
        path: '/create-billonnages-gr',
        name: 'create-billonnage-gr',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/billonnages/CreateGR.vue')
    },
    {
        path: '/create-billonnages-cl',
        name: 'create-billonnage-cl',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/billonnages/CreateCL.vue')
    },
    {
        path: '/billonnages',
        name: 'billonnages',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/billonnages/Manage.vue')
    },
    {
        path: '/billonnages-cl/:id',
        name: 'detail-billonnage-CL',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/billonnages/DetailCL.vue')
    },
    {
        path: '/billonnages-gr/:id',
        name: 'detail-billonnage-GR',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/billonnages/DetailGR.vue')
    },

    {
        path: '/lettres-voiture',
        name: 'lettres-voiture',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/lettres_de_voitures/Manage.vue')
    },
    {
        path: '/lettres-voiture/:id',
        name: 'detail-lettres-voiture',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/lettres_de_voitures/Detail.vue')
    },
 
    {
        path: '/create-lettre-voiture',
        name: 'create-lettre_voiture',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/lettres_de_voitures/Create.vue')
    },
    {
        path: '/create-lv-gr',
        name: 'create-lv-gr',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/lettres_de_voitures/CreateGR.vue')
    },
    {
        path: '/create-lv-cl',
        name: 'create-lv-cl',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/lettres_de_voitures/CreateCL.vue')
    },
    {
        path: '/edit-lvg/:id',
        name: 'edit-lvg',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/lettres_de_voitures/EditGR.vue')
    },
    {
        path: '/edit-lvd/:id',
        name: 'edit-lvd',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/operations_de_parcs/lettres_de_voitures/EditCL.vue')
    },
    
    
    /**
     * ADMINISTRATION
     */
     {
        path: '/administration-dashboard',
        name: 'admin-dashboard',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/Dashboard.vue')
     },
     {
        path: '/administration-utilisateurs',
        name: 'utilisateurs',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/utilisateurs/Manage.vue')
    },
    {
        path: '/administration-utilisateurs/:id',
        name: 'details_utilisateurs',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/utilisateurs/Detail.vue')
    },
    {
        path: '/administration-types-profils',
        name: 'types-profils',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/types_profils/Manage.vue')
    },
    {
        path: '/administration-types-profils/1',
        name: 'details-types-profils',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/types_profils/Detail.vue')
    },
    {
        path: '/administration-profils',
        name: 'profils',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/profils/Manage.vue')
    },
    {
        path: '/administration-profils/:id',
        name: 'details-profil',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/profils/Detail.vue')
    },
    {
        path: '/administration/profil-form',
        name: 'profil-form',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/profils/Create.vue')
    },
    {
        path: '/administration-rapport',
        name: 'administration-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/rapport/Manage.vue')
    },
    {
        path: '/administration-mouchard',
        name: 'mouchard',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/mouchard/Manage.vue')
    },
    {
        path: '/administration-modeles_fichiers',
        name: 'modeles_fichiers',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/modeles-fichiers/Manage.vue')
    },
    {
        path: '/administration-modeles_fichiers/1',
        name: 'details_fichiers',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/administration/modeles-fichiers/Detail.vue')
    },
    
    
    /**
     * ABBATTAGE
     */
    {
        path: '/abbattage-abbattage_titres',
        name: 'abbattages_titres',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/abbatage/abbatages_titres/Manage.vue')
    },
    {
        path: '/abbattage-abbattage_titres/:id',
        name: 'details-abbattages_titres',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/abbatage/abbatages_titres/Detail.vue')
    },
    {
        path: '/create-abbattage_titres/',
        name: 'create-abbattages_titres',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/abbatage/abbatages_titres/Create3.vue')
    },
    {
        path: '/abbattage-feuillet_df_10',
        name: 'feuillet_df_10',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/abbatage/feuillet_df_10/Manage.vue')
    },
    {
        path: '/abbattage-feuillet_df_10/2',
        name: 'feuillet2_df_10',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/abbatage/feuillet_df_10/Manage2.vue')
    },
    
    {
        path: '/abbattage-bris_abbattage',
        name: 'bris_abbattages',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/abbatage/bris_abbatage/Manage.vue')
    },
    {
        path: '/abbattage-bris_abbattage/:id',
        name: 'bris_abbattages_detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/abbatage/bris_abbatage/Detail.vue')
    },
    {
        path: '/create-bris_abbattage',
        name: 'create-bris_abbattage',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/abbatage/bris_abbatage/Create.vue')
    },
    {
        path: '/abbattage-rapport',
        name: 'abbattage-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/abbatage/rapport/Rapport.vue')
    },

    
     /**
     * CODES BARRES
     */
      {
        path: '/code_barres-dasboard',
        name: 'dasboard_codes_barres',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/codes_barres/codes_a_barres/Dashboard.vue')
    },
    {
        path: '/code_barres',
        name: 'code_barres',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/codes_barres/codes_a_barres/Manage.vue')
    },
    {
        path: '/code_barres/:id',
        name: 'details_code_barres',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/codes_barres/codes_a_barres/Detail.vue')
    },
    {
        path: '/code_barres-rapport',
        name: 'code_barres-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/codes_barres/Rapport/Rapport.vue')
    },

    /**
     * DONNEES DE REFERENCES
    */
     {
        path: '/donnees-reference-dashboard',
        name: 'evolution-entites',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/Dashboard.vue')
    },

    {
        path: '/donnees-reference-pays',
        name: 'pays',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/pays/Manage.vue')
    },
    {
        path: '/donnees-reference-departement',
        name: 'departement',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/departement/Manage.vue')
    },
    {
        path: '/donnees-reference-regions',
        name: 'regions',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/regions/Manage.vue')
    },
    {
        path: '/donnees-reference-arrondissements',
        name: 'arrondissements',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/arrondissements/Manage.vue')
    },
     
    {
        path: '/donnees-reference-sites',
        name: 'sites',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/sites/Manage.vue')
    },
    {
        path: '/donnees-reference-sites/:id',
        name: 'details-site',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/sites/Detail.vue')
    },      
    {
        path: '/donnees-reference-banques',
        name: 'banques',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/Banques/Manage.vue')
    },       
    {
        path: '/donnees-reference-type_de_beneficiaire',
        name: 'type_de_beneficiaire',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/type_de_beneficiaire/Manage.vue')
    },


    {
        path: '/donnees-reference-parametre_fixes',
        name: 'parametre_fixes',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/parametre_fixes/Manage.vue')
    },
           
    {
        path: '/donnees-reference-entite_forestiere',
        name: 'entite_forestiere',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/entite_forestiere/Manage.vue')
    },
    {
        path: '/donnees-reference-entite_forestiere/:id',
        name: 'details-entite_forestiere',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/entite_forestiere/Detail.vue')
    },
    {
        path: '/donnees-reference-autres_entites',
        name: 'autres_entites',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/autres_entites/Manage.vue')
    },
    {
        path: '/donnees-reference-essences',
        name: 'essences',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/essence/Manage.vue')
    },

    {
        path: '/donnees-reference-essences',
        name: 'details-essences',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/essence/Detail.vue')
    },
    {

        path: '/donnees-reference-traitement_sylvicole',
        name: 'traitement_sylvicole',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/traitement_sylvicole/Manage.vue')
    },     
    {
        path: '/donnees-reference-valeurs_fob',
        name: 'valeurs_fob',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/valeurs_fob/Manage.vue')
    },
    {
        path: '/donnees-reference-valeurs_fob/:id',
        name: 'details_valeurs_fob',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/valeurs_fob/detail.vue')
    },
    {
        path: '/donnees-reference-classe_de_qualite',
        name: 'classe_de_qualite',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/classe_de_qualite/Manage.vue')
    },
    {
        path: '/donnees-reference-types_de_produits',
        name: 'types_de_produits',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/types_de_produits/Manage.vue')
    },

    {
        path: '/donnees-reference-parametre_variable',
        name: 'parametre_variable',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/parametre_variable/Manage.vue')
    },
    {
        path: '/donnees-reference-repartion_beneficiares',
        name: 'repartition_beneficiares',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/repartition_beneficiaires/Manage.vue')
    },
    {
        path: '/donnees-reference-type_infraction',
        name: 'type_infraction',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/type_infraction/Manage.vue')
    },

    {
        path: '/donnees-reference-zone_d_exploitation',
        name: 'zone_d_exploitation',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/zone_d_exploitation/Manage.vue')
    },

    {
        path: '/donnees-reference-rapport',
        name: 'donnees-reference-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/donnees_de_reference/rapport/Manage.vue')
    },

    /**
     * TRANSFORMATION
    */
    {
        path: '/transformation-productions/list',
        name: 'productions',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/production/Manage.vue')
    },

    {
        path: '/transformation-productions/create',
        name: 'create-productions',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/production/Create.vue')
    },
    {
        path: '/transformation-productions/details/:id',
        name: 'detail-production',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/production/detail.vue')
    },
    {
        path: '/transformation-productions/update/:id',
        name: 'modification_lot_production',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/production/Update.vue')
    },
    {
        path: '/transformation-entree_usinage/list',
        name: 'entree_usinage',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/entree_usinage/Manage.vue')
    },

    {
        path: '/transformation-entree_usinage/details/:id',
        name: 'detail_entree_usinage',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/entree_usinage/detail.vue')
    },
    {
        path: '/transformation-entree_usinage/create',
        name: 'creer-entree_usinage',
        meta: { layout: 'default'},
        component: () =>
        import ('../views/transformation/entree_usinage/create.vue')
    },
    {
        path: '/transformation-entree_usinage/update/:id',
        name: 'edition_entree_usinage',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/entree_usinage/Update.vue')
    },

    {
        path: '/transformation-lignes/list',
        name: 'lignes_de_transformation',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/lignes_de_transformation/Manage.vue')
    },
    {
        path: '/transformation-lignes/details/:id',
        name: 'detail_lignes_de_transformation',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/lignes_de_transformation/Detail.vue')
    },
    {
        path: '/transformation-lignes/update/:id',
        name: 'modification_ligne_de_transformation',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/lignes_de_transformation/Update.vue')
    },
    {
        path: '/lignes_de_transformation/create',
        name: 'create-lignes_de_transformation',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/lignes_de_transformation/Create.vue')
    },
    
  
    {
        path: '/transformation-rapport',
        name: 'transformation-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/rapport/Manage.vue')
    },
    {
        path: '/transformation-rendement_matiere',
        name: 'rendement_matiere',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/transformation/rendement_matiere/Manage.vue')
    },
    
    /**
     * FISCALITES FORSTIERES
    */
     
    {
        path: '/fiscalite-forestiere-quittance_lv',
        name: 'quittance_lv',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/quittance_lv/Manage.vue')
    },

    {
        path: '/fiscalite-forestiere-quittance_lv/:id',
        name: 'quittance_lv_detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/quittance_lv/Detail.vue')
    },

    {
        path: '/fiscalite-forestiere-quittance_df10',
        name: 'quittance_df10',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/quittance_df10/Manage.vue')
    },
    {
        path: '/fiscalite-forestiere-quittance_df10/1',
        name: 'details-quittance_df10',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/quittance_df10/Detail.vue')
    },
   


    {
        path: '/fiscalite-forestiere-emission_titre_recouvrement',
        name: 'emission_titre_recouvrement',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/emission_titre_recouvrement/Manage.vue')
    },
    {
        path: '/fiscalite-forestiere-caution',
        name: 'fiscalite-forestiere-caution',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/caution/Manage.vue')
    },
    {
        path: '/fiscalite-forestiere-caution/:id',
        name: 'detail_caution',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/caution/Detail.vue')
    },

    {
        path: '/fiscalite-forestiere-moratoire',
        name: 'fiscalite-forestiere-moratoire',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/moratoire/Manage.vue')
    },
    {
        path: '/fiscalite-forestiere-moratoire/Create',
        name: 'create-moratoire',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/moratoire/Create.vue')
    },
    {
        path: '/fiscalite-forestiere-rapport',
        name: 'fiscalite-forestiere-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/rapport/Manage.vue')
    },
    {
        path: '/fiscalite-forestiere-quittance-paiement',
        name: 'fiscalite-forestiere-quittance-paiement',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/quittance_paiement/Manage.vue')
    },
    {
        path: '/fiscalite-forestiere-quittance-paiement/:id',
        name: 'detail_quittance-paiement',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/quittance_paiement/Detail.vue')
    },
    {
        path: '/fiscalite-forestiere-quittance-paiement-create',
        name: 'create-quittance-paiement',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/fiscalite_forestiere/quittance_paiement/Create.vue')
    },
    


    /**
     * CONTROLES
    */
     
    {
        path: '/controle-controle_colis',
        name: 'controle_colis',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/controle/controle_colis/Manage.vue')
    },
    {
        path: '/controle-controle_grume',
        name: 'controle_grume',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/controle/controle_grume/Manage.vue')
    },
    {
        path: '/controle-inspection_abattage',
        name: 'inspection_abattage',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/controle/inspection_abattage/Manage.vue')
    },
    {
        path: '/inspection_abattage/:id',
        name: 'details_inspection_abattage',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/controle/inspection_abattage/Detail.vue')
    },
    {
        path: '/controle-rapport',
        name: 'controle-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/controle/rapport/Manage.vue')
    },

     /**
     * TRACABILITE
    */
     
    {
        path: '/controle-authenticite_document',
        name: 'authenticite_document',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/tracabilite/authenticite_document/Manage.vue')
    },
    {
        path: '/controle-produit_provenance_cameroun',
        name: 'produit_provenance_cameroun',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/tracabilite/produit_provenance_cameroun/Manage.vue')
    },
    {
        path: '/controle-produit_provenance_cemac',
        name: 'produit_provenance_cemac',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/tracabilite/produit_provenance_cemac/Manage.vue')
    },
    {
        path: '/tracabilite-rapport',
        name: 'tracabilite-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/tracabilite/rapport/Manage.vue')
    },
    {
        path: '/controle-stocks',
        name: 'stocks',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/tracabilite/stocks/Manage.vue')
    },
    {
        path: '/controle-stocks/:id',
        name: 'stocks-details',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/tracabilite/stocks/Detail.vue')
    },

    /**
     * CERTIFICAT DE LEGALITE
    */

    {
        path: '/certificats-de-legalite-certificats',
        name: 'certificats',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/certificats_de_legalite/certificats/Manage.vue')
    },
    {
        path: '/certificats-de-legalite-demande_de_certificat',
        name: 'demande_de_certificat',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/certificats_de_legalite/demande_de_certificat/Manage.vue')
    },
    {
        path: '/certificats-de-legalite-rapport',
        name: 'certificats-de-legalite-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/certificats_de_legalite/rapport/Manage.vue')
    },


    /**
     * EXPORTATION
    */
     
    {
        path: '/exportation-acp',
        name: 'attestation_conformite_produit',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/attestation_conformite_produit/Manage.vue')
    },
    {
        path: '/exportation-acp/:id',
        name: 'attestation_conformite_produit-detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/attestation_conformite_produit/Detail.vue')
    },
    {
        path: '/exportation-acp/create',
        name: 'acp-create',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/attestation_conformite_produit/Create.vue')
    },
    {
        path: '/exportation-autorisation_exportation_grume',
        name: 'autorisation_exportation_grume',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/autorisation_exportation_grume/Manage.vue')
    },
    {
        path: '/create-autorisation_exportation_grume',
        name: 'create-autorisation_exportation_grume',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/autorisation_exportation_grume/Create.vue')
    },
    {
        path: '/exportation-autorisation_flegt',
        name: 'autorisation_flegt',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/autorisation_flegt/Manage.vue')
    },
    {
        path: '/exportation-autorisation_flegt/:id',
        name: 'details_autorisation_flegt',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/autorisation_flegt/Detail.vue')
    },
    {
        path: '/exportation-bois_exporte',
        name: 'bois_exporte',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/bois_exporte/Manage.vue')
    },
    {
        path: '/exportation-bois_exporte/detail',
        name: 'bois_exporte-detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/bois_exporte/Detail.vue')
    },
    {
        path: '/exportation-certificat_exportateur',
        name: 'certificat_exportateur',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/certificat_exportateur/Manage.vue')
    },
    {
        path: '/exportation-certificat_exportateur/detail',
        name: 'certificat_exportateur_detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/certificat_exportateur/Detail.vue')
    },
    {
        path: '/exportation-demande_acp',
        name: 'demande_acp',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/demande_acp/Manage.vue')
    },
    {
        path: '/exportation-demande_acp/create',
        name: 'create-demande_acp',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/demande_acp/Create.vue')
    },
    {
        path: '/exportation-demande_autorisation_flegt',
        name: 'demande_autorisation_flegt',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/demande_autorisation_flegt/Manage.vue')
    },
    {
        path: '/exportation-demande_autorisation_flegt/create',
        name: 'create-demande_autorisation_flegt',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/demande_autorisation_flegt/Create.vue')
    },
    {
        path: '/exportation-demande_bse',
        name: 'demande_bse',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/demande_bse/Manage.vue')
    },
    {
        path: '/exportation-demande_bse/create',
        name: 'create-demande_bse',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/demande_bse/Create.vue')
    },
    {
        path: '/exportation-demande_bse/:id',
        name: 'demande_bse_detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/demande_bse/Detail.vue')
    },
    {
        path: '/exportation-demande_certificat_exportateur',
        name: 'demande_certificat_exportateur',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/demande_certificat_exportateur/Manage.vue')
    },
    {
        path: '/exportation-/detail',
        name: 'demande_certificat_exportateur-detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/demande_certificat_exportateur/Detail.vue')
    },
    {
        path: '/exportation-permis_cites',
        name: 'permis_cites',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/permis_cites/Manage.vue')
    },
    {
        path: '/exportation-create_permis_cites',
        name: 'create-permis_cites',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/permis_cites/Create.vue')
    },
    {
        path: '/exportation-permis_cites/detail',
        name: 'permis_cites-detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/permis_cites/Detail.vue')
    },
    {
        path: '/exportation-quota_bois_exportation',
        name: 'quota_bois_exportation',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/quota_bois_exportation/Manage.vue')
    },
    {
        path: '/exportation-quota_bois_exportation/detail',
        name: 'quota_bois_exportation_detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/quota_bois_exportation/Detail.vue')
    },
    {
        path: '/exportation-rapport',
        name: 'exportation-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/rapport/Manage.vue')
    },
    {
        path: '/exportation-specification_export',
        name: 'bulletin_specification_export',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/bullettin_specification_export/Manage.vue')
    },
    {
        path: '/exportation-specification_export/:id',
        name: 'bulletin_specification_export-detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/exportation/bullettin_specification_export/Detail.vue')
    },

    /**
     * INVENTAIRES  
    */
     
    {
        path: '/inventaires-catalogues',
        name: 'catalogues',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/catalogues/Manage.vue')
    },
    {
        path: '/inventaires-catalogues/create',
        name: 'create-catalogue',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/catalogues/Create.vue')
    },
    {
        path: '/inventaires-catalogues/createAEB',
        name: 'create-catalogue-aeb',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/catalogues/CatalogueAEB.vue')
    },
    {
        path: '/inventaires-catalogues/createARB',
        name: 'create-catalogue-arb',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/catalogues/CatalogueARB.vue')
    },
    {
        path: '/inventaires-catalogues/createPS',
        name: 'create-catalogue-ps',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/catalogues/CataloguePS.vue')
    },
    {
        path: '/inventaires-catalogues/:id',
        name: 'details-catalogue',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/catalogues/Detail.vue')
    },
    {
        path: '/inventaires-inventaire',
        name: 'inventaire',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/inventaires/Manage.vue')
    },
    {
        path: '/inventaires-inventaire/:id',
        name: 'detail-inventaire',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/inventaires/Detail.vue')
    },
    {
        path: '/inventaires-table_stock',
        name: 'table_de_stock',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/inventaires/Table_stock.vue')
    },
    {
        path: '/inventaires-table_peuplement',
        name: 'table_de_peuplement',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/inventaires/Table_peuplement.vue')
    },
    {
        path: '/inventaires/create',
        name: 'create-inventaire',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/inventaires/CreateNew.vue')
    },
    {
        path: '/inventaires-inventaire/3',
        name: 'Verification',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/inventaires/Verification.vue')
    },

    {
        path: '/inventaires-rapport',
        name: 'inventaires-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/rapport/Manage.vue')
    },

    {
        path: '/inventaires-tracking_limites',
        name: 'tracking_limites',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/tracking_des_limites/Manage.vue')
    },
    {
        path: '/inventaires-tracking_limites/:id',
        name: 'details_tracking_limites',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/inventaires/tracking_des_limites/detail.vue')
    },

    /**
     * TITRES FORESTIERS
    */
     
    {
        path: '/titre_forestiers-aeb_vep',
        name: 'aeb_vep',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/aeb_vep/Manage.vue')
    },
    {
        path: '/titre_forestiers-aeb_vep/detail',
        name: 'aeb_vep-detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/aeb_vep/Detail.vue')
    },
    {
        path: '/titre_forestiers-aeb_vep/create',
        name: 'create-titre-aebvep',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/aeb_vep/Create.vue')
    },
    
    {
        path: '/titre_forestiers-apc',
        name: 'apc',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/apc/Manage.vue')
    },
    {
        path: '/titre_forestiers-apc/detail',
        name: 'apc-details',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/apc/Detail.vue')
    },
    {
        path: '/titre_forestiers-apc/create',
        name: 'create-titre-apc',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/apc/Create.vue')
    },
    
    {
        path: '/titre_forestiers-arb',
        name: 'arb',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/arb/Manage.vue')
    },
    {
        path: '/titre_forestiers-arb/detail',
        name: 'arb-detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/arb/Detail.vue')
    },
    {
        path: '/titre_forestiers-arb/create',
        name: 'create-titre-arb',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/arb/Create.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cp',
        name: 'concession_en_cp',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cp/Manage.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cp/:id',
        name: 'concession_en_cp_detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cp/Detail.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cp/ufa/:id',
        name: 'concession_en_cp_UFA',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cp/UFA.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cp/aac/:id',
        name: 'concession_en_cp_AAC',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cp/AAC.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cp/ccp',
        name: 'concession_en_cp_CCP',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cp/CP.vue')
    },
    {
        path: '/concession_en_cp/create',
        name: 'create-titre-cp-convention',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cp/Create.vue')
    },
   
    {
        path: '/titre_forestiers-concession_en_cd',
        name: 'concession_en_cd',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cd/Manage.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cd/:id',
        name: 'concession_en_cd_detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cd/Detail.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cd/ufa/:id',
        name: 'concession_en_cd_UFA',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cd/UFA.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cd/ufe/:id',
        name: 'concession_en_cd_UFE',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cd/UFE.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cd/aac/:id',
        name: 'concession_en_cd_AAC',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cd/AAC.vue')
    },
    {
        path: '/concession_en_cd/create',
        name: 'create-titre-cd-convention',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cd/Create.vue')
    },
    {
        path: '/titre_forestiers-concession_en_cd/2',
        name: 'concession_en_cd/2',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/concession_en_cd/concession2.vue')
    },

    {
        path: '/titre_forestiers-foret_communale',
        name: 'foret_communale',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communale/Manage.vue')
    },
    {
        path: '/titre_forestiers-foret_communale/detail',
        name: 'foret_communale_detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communale/Detail.vue')
    },
    {
        path: '/titre_forestiers-foret_communale/create',
        name: 'create-titre-cc',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communale/Create.vue')
    },
    {
        path: '/titre_forestiers-foret_communale/ufe/:id',
        name: 'foret_communale_UFE',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communale/UFE.vue')
    },
    {
        path: '/titre_forestiers-foret_communale/aac/:id',
        name: 'foret_communale_AAC',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communale/AAC.vue')
    },
    {
        path: '/titre_forestiers-foret_communautaire_en_cd',
        name: 'foret_communautaire_en_cd',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communautaire_en_cd/Manage.vue')
    },
    {
        path: '/titre_forestiers-foret_communautaire_en_cd/detail',
        name: 'foret_communautaire_en_cd_details',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communautaire_en_cd/Detail.vue')
    },
    {
        path: '/titre_forestiers-foret_communautaire_en_cd/create',
        name: 'create-titre-fcd',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communautaire_en_cd/Create.vue')
    },
    {
        path: '/titre_forestiers-foret_communautaire_en_cd/secteurs/:id',
        name: 'foret_communautaire_en_cd_details_secteurs',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communautaire_en_cd/Secteurs.vue')
    },
    {
        path: '/titre_forestiers-foret_communautaire_en_cd/parcelles/:id',
        name: 'foret_communautaire_en_cd_details_parcelles',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communautaire_en_cd/Parcelles.vue')
    },
    {
        path: '/titre_forestiers-foret_communautaire_en_cp',
        name: 'foret_communautaire_en_cp',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communautaire_en_cp/Manage.vue')
    },
    {
        path: '/titre_forestiers-foret_communautaire_en_cp/detail',
        name: 'foret_communautaire_en_cp_details',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communautaire_en_cp/Detail.vue')
    },
    {
        path: '/titre_forestiers-foret_communautaire_en_cp/create',
        name: 'create-titre-fcp',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communautaire_en_cp/Create.vue')
    },
    {
        path: '/titre_forestiers-foret_communautaire_en_cp/parcelles/:id',
        name: 'foret_communautaire_en_cp_details_parcelles',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/foret_communautaire_en_cp/Parcelles.vue')
    },
    {
        path: '/titre_forestiers-permis_de_bois_d_oeuvre',
        name: 'permis_de_bois_d_oeuvre',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/permis_de_bois_d_oeuvre/Manage.vue')
    },
    {
        path: '/titre_forestiers-permis_de_bois_d_oeuvre/detail',
        name: 'permis_de_bois_d_oeuvre-detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/permis_de_bois_d_oeuvre/Detail.vue')
    },
    {
        path: '/titre_forestiers-permis_de_bois_d_oeuvre/create',
        name: 'create-titre-pbo',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/permis_de_bois_d_oeuvre/Create.vue')
    },
    
    {
        path: '/titre_forestiers-permis_special',
        name: 'permis_special',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/permis_special/Manage.vue')
    },
    {
        path: '/titre_forestiers-permis_special/detail',
        name: 'permis_special-detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/permis_special/Detail.vue')
    },
    {
        path: '/titre_forestiers-permis_special/create',
        name: 'create-titre-ps',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/permis_special/Create.vue')
    },
    {
        path: '/titres_forestiers-rapport',
        name: 'titres_forestiers-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/rapport/Manage.vue')
    },
    {
        path: '/titre_forestiers-vente_de_coupe',
        name: 'vente_de_coupe',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/vente_de_coupe/Manage.vue')
    },
    {
        path: '/titre_forestiers-vente_de_coupe/:id',
        name: 'vente_de_coupe_detail',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/vente_de_coupe/Detail.vue')
    },
    {
        path: '/titre_forestiers-vc/create',
        name: 'create-titre-vc',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/vente_de_coupe/Create.vue')
    },
    {
        path: '/titres_forestiers-rapport',
        name: 'titres_forrestiers-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/titres_forestiers/rapport/Manage.vue')
    },
    
      /**
     * BOIS CEMAC
    */
    {
        path: '/bois-cemac-entite_forestiere_cemac',
        name: 'entite_forestiere_cemac',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/bois_cemac/entite_forestiere_cemac/Manage.vue')
    },
    {
        path: '/bois-cemac-entite_forestiere_cemac/1',
        name: 'details_entite_forestiere_cemac',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/bois_cemac/entite_forestiere_cemac/Detail.vue')
    },
    {
        path: '/bois-cemac-entrees_en_parc_cemac',
        name: 'entrees_en_parc_cemac',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/bois_cemac/entrees_en_parc_cemac/Manage.vue')
    },
    {
        path: '/bois-cemac-lettres_de_voiture_cemac',
        name: 'lettres_de_voiture_cemac',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/bois_cemac/lettres_de_voiture_cemac/Manage.vue')
    },
    {
        path: '/bois-cemac-code_barre',
        name: 'code_barre',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/bois_cemac/code_barre/Manage.vue')
    },
    {
        path: '/bois-cemac-code_barre/:id',
        name: 'details_code_barre',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/bois_cemac/code_barre/Detail.vue')
    },
    {
        path: '/bois-cemac-rapport',
        name: 'bois-cemac-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/bois_cemac/rapport/Manage.vue')
    },

      /**
     * PERMIS
    */
       {
        path: '/permis-demande_de_permis',
        name: 'demande_de_permis',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/permis/demande_de_permis/Manage.vue')
    },
    {
        path: '/permis-demande_de_permis/:id',
        name: 'details_demande_de_permis',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/permis/demande_de_permis/Detail.vue')
    },
   

     {
        path: '/permis-permis',
        name: 'permis',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/permis/permis/Manage.vue')
    },
     {
        path: '/permis-permis/new',
        name: 'permis-new',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/permis/permis/New.vue')
    },
     {
        path: '/permis-permis/verify',
        name: 'permis-verify',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/permis/permis/Verify.vue')
    },
    {
        path: '/permis-permis/:id',
        name: 'detail-permis',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/permis/permis/Detail.vue')
    },
    {
        path: '/permis-rapport',
        name: 'permis-rapport',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/permis/rapport/Rapport.vue')
    },

       /**
     * CONTENCIEUX
    */
    
        {
            path: '/contencieux-proces_verbal',
            name: 'contencieux-proces_verbal',
            meta: { layout: 'default'},
            component: () =>
                import ('../views/contencieux/proces_verbal/Manage.vue')
        },
        {
            path: '/contencieux-notification_primitive',
            name: 'contencieux-notification_primitive',
            meta: { layout: 'default'},
            component: () =>
                import ('../views/contencieux/notification_primitive/Manage.vue')
        },
        {
            path: '/contencieux-demande_transaction',
            name: 'contencieux-demande_transaction',
            meta: { layout: 'default'},
            component: () =>
                import ('../views/contencieux/demande_transaction/Manage.vue')
        },
        {
            path: '/contencieux-notification_definitive',
            name: 'contencieux-notification_definitive',
            meta: { layout: 'default'},
            component: () =>
                import ('../views/contencieux/notification_definitive/Manage.vue')
        },
        {
            path: '/contencieux-decision_tribunal',
            name: 'contencieux-decision_tribunal',
            meta: { layout: 'default'},
            component: () =>
                import ('../views/contencieux/decision_tribunal/Manage.vue')
        },
        {
            path: '/contencieux-contencieux',
            name: 'contencieux-contencieux',
            meta: { layout: 'default'},
            component: () =>
                import ('../views/contencieux/contencieux/Manage.vue')
        },
        {
            path: '/contencieux-transaction',
            name: 'contencieux-transaction',
            meta: { layout: 'default'},
            component: () =>
                import ('../views/contencieux/transaction/Manage.vue')
        },

    /**
     * RAPPORT
     */
    {
        path: '/rapport',
        name: 'rapport',
        meta: { layout: 'default', noAuth: true },
        component: () =>
            import ('../views/rapport/Rapport.vue')
    },
    {
        path:'/:notFound(.*)',
        name:'notFound',
        meta: { layout: 'default', noAuth: true },
        component:()=>import('../views/NotFound.vue')
    },
    /**
     * PAGE DE PROFIL DE L'UTILISATEUR CONNECTE
     */
    {
        path: '/administration/mon-profil',
        name: 'mon-profil',
        meta: { layout: 'default'},
        component: () =>
            import ('../views/userprofil/UserProfil.vue')
    },




]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach(async(to, from, next) => {
    const access_token = storage.get('access_token')

    //A Logged-in user can't go to login page again
    if (to.name === 'login' && access_token != null && access_token != undefined && access_token != '') {
        next({ name: 'home' })
    }
    else if (to.matched.some(record => (record.meta.noAuth && true === record.meta.noAuth))) {
        next()
    } 
    else if (!access_token || access_token == null || access_token == '') {
        store.dispatch('user', {})
        next({ name: 'login' })
    }
    else {
        let user = store.state.user;
        if (php.empty(user.login)) {
            console.log('11');
            try {
               user = await axios.get(`auth/login`,{ headers: {'Authorization': `Bearer ${access_token}`}}).then(response => response.result)
                store.dispatch('user', user)
                console.log('uuu',user);

            } catch (error) {
                storage.clear()
                store.dispatch('user', {})
                next({ name: 'login' })
                console.log('3 ',error);

            }
        }
        
        if (isUnRedirect(to.name)) {
            next()
        }
        else{
            next()
        }
        /*else {
            const privileges = user.profil.privileges.Items
            store.dispatch('permissions', privileges)

            if (!store.getters.hasAccess(to.name)) {
                next({ name: 'unauthorized' })
            }
            else {
                next()
            }
            
        }*/
    }
});

const isUnRedirect = (name) => {
    return [].includes(name)
}

export default router