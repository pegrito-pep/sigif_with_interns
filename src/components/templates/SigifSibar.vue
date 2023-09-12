<template>
    <div id="administration" class="administration">
            <nav class="pt-4">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <AdministrationItem
                        v-for="menu in menus"
                        :key="menu.id"
                        :menu="menu"
                        :mainLink="menu.items"
                    />
                </ul>
            </nav>
        </div>
</template>

<script>
import AdministrationItem from '../AdministrationItem.vue';
export default {
    name: "SigifSibar",
    components: {
        AdministrationItem,
    },
     data(){
        return {
            // Menu pour administrateur
            menus : [
                {
                    id: 1,
                    libelle: "Administration",
                    icon: "/img/images/1Administrationb.png",
                    items: [
                        {
                            id: 'TABLEAU_DE_BORD',
                            libelle: "Tableau de Bord",
                            url: "/administration-dashboard"
                        },
                        {
                            id: 'UTILISATEUR',
                            libelle: "Utilisateurs",
                            url: "/administration-utilisateurs"
                        },
                        {
                            id: 'TYPES_PROFIL',
                            libelle: "Type de profils",
                            url: "/administration-types-profils"
                        },
                        {
                            id: 'PROFIL',
                            libelle: "Profils",
                            url: "/administration-profils"
                        },
                        {
                            id: 'MOUCHARD',
                            libelle: "Mouchard",
                            url: "/administration-mouchard"
                        },
                        {
                            id: 'MODELES_FICHIER',
                            libelle: "Modèles de fichiers",
                            url: "/administration-modeles_fichiers"
                        },
                        {
                            id: 'RAPPORT_ADMINISTRATION',
                            libelle: "Rapport",
                            url: "/administration-rapport"
                        },
                    ]
                },
                {
                    id: 2,
                    libelle: "Données de référence",
                    icon: "/img/images/2Donnees_de_referenceb.png",
                    items: [
                         {
                            id: 8,
                            libelle: "Tableau de bord",
                            url: "/donnees-reference-dashboard"
                        },
                        {
                            id: 9,
                            libelle: "Pays",
                            url: "/donnees-reference-pays"
                        },
                        {
                            id: 10,
                            libelle: "Régions",
                            url: "/donnees-reference-regions"
                        },
                        {
                            id: 11,
                            libelle: "Départements",
                            url: "/donnees-reference-departement"
                        },
                        {
                            id: 12,
                            libelle: "Arrond./Commune",
                            url: "/donnees-reference-arrondissements"
                        },
                        {
                            id: 13,
                            libelle: "Sites",
                            url: "/donnees-reference-sites"
                        },
                        {
                            id: 14,
                            libelle: "Entité forestière",
                            url: "/donnees-reference-entite_forestiere"
                        },
                        {
                            id: 15,
                            libelle: "Autres entités",
                            url: "/donnees-reference-autres_entites"
                        },
                        {
                            id: 16,
                            libelle: "Traitements sylvicoles",
                            url: "/donnees-reference-traitement_sylvicole"
                        },
                        {
                            id: 17,
                            libelle: "Essence",
                            url: "/donnees-reference-essences"
                        },
                        {
                            id: 18,
                            libelle: "Valeurs FOB",
                            url: "/donnees-reference-valeurs_fob"
                        },
                        {
                            id: 19,
                            libelle: "Classe de qualité",
                            url: "/donnees-reference-classe_de_qualite"
                        },
                        {
                            id: 20,
                            libelle: "Types de produits",
                            url: "/donnees-reference-types_de_produits"
                        },
                        {
                            id: 21,
                            libelle: "paramètre fixes",
                            url: "/donnees-reference-parametre_fixes"
                        },
                        {
                            id: 22,
                            libelle: "Paramètre variable",
                            url: "/donnees-reference-parametre_variable"
                        },
                        {
                            id: 23,
                            libelle: "Banques",
                            url: "/donnees-reference-banques"
                        },
                        {
                            id: 24,
                            libelle: "Types bénéficiaires",
                            url: "/donnees-reference-type_de_beneficiaire"
                        },
                        {
                            id: 25,
                            libelle: "Répartition bénéficiaires",
                            url: "/donnees-reference-repartion_beneficiares"
                        },
                        {
                            id: 26,
                            libelle: "Type d'infraction",
                            url: "/donnees-reference-type_infraction"
                        },
                        {
                            id: 27,
                            libelle: "Zone d'exploitation",
                            url: "/donnees-reference-zone_d_exploitation"
                        },
                        {
                            id: 28,
                            libelle: "Rapport",
                            url: "/donnees-reference-rapport"
                        },
                    ]
                },
                {
                    id: 3,
                    libelle: "Titres forestiers",
                    icon: "/img/images/3Titresb.png",
                    items: [
                        {
                            id: 29,
                            libelle: "Concession en CP",
                            url: "/titre_forestiers-concession_en_cp"
                        },
                        {
                            id: 30,
                            libelle: "Concession en CD",
                            url: "/titre_forestiers-concession_en_cd"
                        },
                        {
                            id: 31,
                            libelle: "Forêt communautaire en CP",
                            url: "/titre_forestiers-foret_communautaire_en_cp"
                        },
                        {
                            id: 4,
                            libelle: "Forêt communautaire en CD",
                            url: "/titre_forestiers-foret_communautaire_en_cd"
                        },
                        {
                            id: 5,
                            libelle: "Vente de coupe",
                            url: "/titre_forestiers-vente_de_coupe"
                        },
                        {
                            id: 6,
                            libelle: "Forêt communale",
                            url: "/titre_forestiers-foret_communale"
                        },
                        {
                            id: 7,
                            libelle: "ARB",
                            url: "/titre_forestiers-arb"
                        },
                        {
                            id: 8,
                            libelle: "Permis de bois d'oeuvre",
                            url: "/titre_forestiers-permis_de_bois_d_oeuvre"
                        },
                        {
                            id: 9,
                            libelle: "Permis spécial",
                            url: "/titre_forestiers-permis_special"
                        },
                        {
                            id: 10,
                            libelle: "APC",
                            url: "/titre_forestiers-apc"
                        },
                        {
                            id: 11,
                            libelle: "AEB/VEP",
                            url: "/titre_forestiers-aeb_vep"
                        },
                        {
                            id: 12,
                            libelle: "Rapport",
                            url: "/titres_forestiers-rapport"
                        },
                    ]
                },
                {
                    id: 4,
                    libelle: "Codes  barres",
                    icon: "/img/images/4Code_a_barresb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Tableau de Bord",
                            url: "/code_barres-dasboard"
                        },
                        {
                            id: 2,
                            libelle: "Code à barres",
                            url: "/code_barres"
                        },
                        {
                            id: 3,
                            libelle: "Rapport",
                            url: "/code_barres-rapport"
                        },
                        
                    ]
                },
                {
                    id: 5,
                    libelle: "Inventaires",
                    icon: "/img/images/6Inventairesb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Tracking des limites",
                            url: "/inventaires-tracking_limites"
                        },
                         {
                            id: 2,
                            libelle: "Inventaires",
                            url: "/inventaires-inventaire"
                        },
                         {
                            id: 3,
                            libelle: "Catalogues",
                            url: "/inventaires-catalogues"
                        },
                        {
                            id: 4,
                            libelle: "Rapport",
                            url: "/inventaires-rapport"
                        },
                    ]
                },
                {
                    id: 6,
                    libelle: "Permis",
                    icon: "/img/images/7Permisb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Demande de permis",
                            url: "/permis-demande_de_permis"
                        },
                        {
                            id: 2,
                            libelle: "Permis",
                            url: "/permis-permis"
                        },
                        {
                            id: 3,
                            libelle: "Rapport",
                            url: "/permis-rapport"
                        },
                        
                    ]
                },
                {
                    id: 7,
                    libelle: "Abattages",
                    icon: "/img/images/9Abattagesb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Abattage titre",
                            url: "/abbattage-abbattage_titres"
                        },
                        {
                            id: 2,
                            libelle: "Bris abattage",
                            url: "/abbattage-bris_abbattage"
                        },
                        {
                            id: 3,
                            libelle: "Feuillet DF10",
                            url: "/abbattage-feuillet_df_10"
                        },
                        {
                            id: 4,
                            libelle: "Rapport",
                            url: "/abbattage-rapport"
                        },
                    ]
                },
                {
                    id: 8,
                    libelle: "Bois CEMAC",
                    icon: "/img/images/8Bois_CEMACb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Entité forestière CEMAC",
                            url: "/bois-cemac-entite_forestiere_cemac"
                        },
                        {
                            id: 2,
                            libelle: "Code barre",
                            url: "/bois-cemac-code_barre"
                        },
                        {
                            id: 3,
                            libelle: "Lettre de voiture CEMAC",
                            url: "/bois-cemac-lettres_de_voiture_cemac"
                        },
                        {
                            id: 4,
                            libelle: "Entrée en parc CEMAC",
                            url: "/bois-cemac-entrees_en_parc_cemac"
                        },
                        {
                            id: 5,
                            libelle: "Rapport",
                            url: "/bois-cemac-rapport"
                        },
                    ]
                },
                {
                    id: 9,
                    libelle: "Opérations de parc",
                    icon: "/img/images/10Operation_de_parcb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Tableau de Bord",
                            url: "/operation_parc-dashboard"
                        },
                        {
                            id: 2,
                            libelle: "Entrée parc",
                            url: "/entree_parcs"
                        },
                        {
                            id: 3,
                            libelle: "Régularisations",
                            url: "/regularisations"
                        },
                        {
                            id: 4,
                            libelle: "Billonnages",
                            url: "/billonnages"
                        },
                        {
                            id: 5,
                            libelle: "Lettre de voiture",
                            url: "/lettres-voiture"
                        },
                        {
                            id: 6,
                            libelle: "Table de stocks",
                            url: "/tables-stock"
                        },
                        {
                            id: 7,
                            libelle: "Rapport",
                            url: "/operation_parc-rapport"
                        },
                    ]
                },
                {
                    id: 10,
                    libelle: "Transformation",
                    icon: "/img/images/11Transformationb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Lignes de tranformation",
                            url: "/transformation-lignes/list"
                        },
                        {
                            id: 2,
                            libelle: "Entrées d'usinage",
                            url: "/transformation-entree_usinage/list"
                        },
                        {
                            id: 3,
                            libelle: "Production",
                            url: "/transformation-productions/list"
                        },
                        {
                            id: 4,
                            libelle: "Rendement matière",
                            url: "/transformation-rendement_matiere"
                        },
                        {
                            id: 5,
                            libelle: "Rapport",
                            url: "/transformation-rapport"
                        },
                    ]
                },
                {
                    id: 11,
                    libelle: "Fiscalité forestière",
                    icon: "/img/images/12Fiscaliteb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Emission des titres de recouvrement",
                            url: "/fiscalite-forestiere-emission_titre_recouvrement"
                        },
                        {
                            id: 2,
                            libelle: "Quittances de paiement",
                            url: "/fiscalite-forestiere-quittance-paiement"
                        },
                         {
                            id: 3,
                            libelle: "Quittance DF 10",
                            url: "/fiscalite-forestiere-quittance_df10"
                        },
                        {
                            id: 4,
                            libelle: "Quittance LV",
                            url: "/fiscalite-forestiere-quittance_lv"
                        },
                        {
                            id: 5,
                            libelle: "Cautions",
                            url: "/fiscalite-forestiere-caution"
                        },
                        {
                            id: 6,
                            libelle: "Moratoires",
                            url: "/fiscalite-forestiere-moratoire"
                        },
                        {
                            id: 7,
                            libelle: "Rapport",
                            url: "/fiscalite-forestiere-rapport"
                        },
                        
                    ]
                },
                {
                    id: 12,
                    libelle: "Contentieux",
                    icon: "/img/images/13Contentieuxb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Procès verbal",
                            url: "/contencieux-proces_verbal"
                        },
                        {
                            id: 2,
                            libelle: "Notification primitive",
                            url: "/contencieux-notification_primitive"
                        },
                        {
                            id: 3,
                            libelle: "Demmande de transaction",
                            url: "/contencieux-demande_transaction"
                        },
                        {
                            id: 4,
                            libelle: "Transaction",
                            url: "/contencieux-transaction"
                        },
                        {
                            id: 5,
                            libelle: "Notification définitive",
                            url: "/contencieux-notification_definitive"
                        },
                        {
                            id: 6,
                            libelle: "Décision du tribunal",
                            url: "/contencieux-decision_tribunal"
                        },
                        {
                            id: 7,
                            libelle: "Contentieux",
                            url: "/contencieux-contencieux"
                        },
                        {
                            id: 8,
                            libelle: "Rapport",
                            url: "#"
                        },
                    ]
                },
                {
                    id: 13,
                    libelle: "Certificats de légalité",
                    icon: "/img/images/14Certificat_de_legaliteb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Demande de certificat",
                            url: "/certificats-de-legalite-demande_de_certificat"
                        },
                        {
                            id: 2,
                            libelle: "Certificats",
                            url: "/certificats-de-legalite-certificats"
                        },
                        {
                            id: 3,
                            libelle: "Rapport",
                            url: "/certificats-de-legalite-rapport"
                        },
                        
                    ]
                },
                {
                    id: 14,
                    libelle: "Exportations",
                    icon: "/img/images/15Exportationb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Quotas de bois à l'exportation",
                            url: "/exportation-quota_bois_exportation"
                        },
                        {
                            id: 2,
                            libelle: "Certificat en qualité d'exportateur",
                            url: "/exportation-certificat_exportateur"
                        },
                        {
                            id: 3,
                            libelle: "Permis CITES",
                            url: "/exportation-permis_cites"
                        },
                        {
                            id: 4,
                            libelle: "Autorisation d'exportation de grumes",
                            url: "/exportation-autorisation_exportation_grume"
                        },
                        {
                            id: 5,
                            libelle: "Demande de BSE",
                            url: "/exportation-demande_bse"
                        },
                        {
                            id: 6,
                            libelle: "Bulletin de spécification à l'export",
                            url: "/exportation-specification_export"
                        },
                        {
                            id: 7,
                            libelle: "Demande d'ACP",
                            url: "/exportation-demande_acp"
                        },
                        {
                            id: 8,
                            libelle: "Attestation de conformité de produits",
                            url: "/exportation-acp"
                        },
                        {
                            id: 9,
                            libelle: "Bois exportés",
                            url: "/exportation-bois_exporte"
                        },
                        {
                            id: 10,
                            libelle: "Demande Autorisation FLEGT",
                            url: "/exportation-demande_autorisation_flegt"
                        },
                        {
                            id: 11,
                            libelle: "Autorisation Flegt",
                            url: "/exportation-autorisation_flegt"
                        },
                        {
                            id: 12,
                            libelle: "Demande de certificat d'exportateur",
                            url: "/exportation-demande_certificat_exportateur"
                        },
                        {
                            id: 13,
                            libelle: "Rapport",
                            url: "/exportation-rapport"
                        },
                        
                    ]
                },
                {
                    id: 15,
                    libelle: "Traçabilté",
                    icon: "/img/images/16Tracabiliteb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Produit provenance Cameroun",
                            url: "/controle-produit_provenance_cameroun"
                        },
                        {
                            id: 2,
                            libelle: "Produit provenance CEMAC",
                            url: "/controle-produit_provenance_cemac"
                        },
                        {
                            id: 3,
                            libelle: "Stocks",
                            url: "/controle-stocks"
                        },
                        {
                            id: 4,
                            libelle: "Authenticité documents",
                            url: "/controle-authenticite_document"
                        },
                        {
                            id: 5,
                            libelle: "Rapport",
                            url: "/tracabilite-rapport"
                        },
                    ]
                },
                {
                    id: 16,
                    libelle: "Contrôle",
                    icon: "/img/images/17Controleb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Inspection d'abattage",
                            url: "/controle-inspection_abattage"
                        },
                        {
                            id: 2,
                            libelle: "Contrôle grume",
                            url: "/controle-controle_grume"
                        },
                        {
                            id: 3,
                            libelle: "Contrôle colis",
                            url: "/controle-controle_colis"
                        },
                        {
                            id: 4,
                            libelle: "Rapport",
                            url: "/controle-rapport"
                        },
                        
                    ]
                },
                {
                    id: 17,
                    libelle: "SIG",
                    icon: "/img/images/5SIGb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Rapport",
                            url: "#"
                        },
                    ]
                },
                {
                    id: 18,
                    libelle: "Rapport",
                    icon: "/img/images/18Rapportsb.png",
                    items: [
                        {
                            id: 1,
                            libelle: "Rapport Général",
                            url: "/rapport"
                        },
                    ]
                },
            ],
        }
    }

    
}
</script>

<style scoped>
.administration{
    background:#82C138;
    padding-bottom: 0px;
    /*/background: rgb(0, 82, 44);*/
    border-top: 2px solid white;
    
}

#administration{
    width: 250px;
    height: calc(100vh - 140px);
    overflow-y: scroll;
}


/* width */
#administration::-webkit-scrollbar {
  width: 0px;
}

/* Track */
#administration::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey;  */
  border-radius: 2px;
}
 
/* Handle */
#administration::-webkit-scrollbar-thumb {
  background: rgb(0, 82, 44); 
  border-radius: 2px;
}

/* Handle on hover */
#administration::-webkit-scrollbar-thumb:hover {
  background: rgb(0, 82, 44); 
}
</style>