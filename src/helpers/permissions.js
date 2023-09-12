export default function (name, permissions) {
    switch (name) {
        case "modules":
            return true;
        // operations de parc

            case "entree_parcs":
                return permissions.includes("LIST_OPERATION_ENTRE_PARC");
            case "create-entree-parc":
                return permissions.includes("CREER_OPERATION_ENTRE_PARC");
            case "details-entrees_parcs":
                return permissions.includes("CONSULTER_OPERATION_ENTRE_PARC");
            case "regularisations":
                return permissions.includes("LIST_OPERATION_REGULARISATIONS_PARC");
            case "details-regularisations":
                return permissions.includes("CONSULTER_REGULARISATIONS");
            case "billonnages":
                return permissions.includes("LIST_OPERATION_BILLONNAGES_PARC");
            case "detail_billonnage":
                return permissions.includes("CONSULTER_BILLONNAGE");
            case "lettres-voiture":
                return permissions.includes("LIST_OPERATION_LETTRES_VOITURE_PARC");
            case "detail-lettres-voiture":
                return permissions.includes("CONSULTER_LETTRES_DE_VOITURE");
            case "create-lettre_voiture":
                return permissions.includes("CREER_LETTRES_DE_VOITURE");

        // ADMINISTRATION
            case "admin-dashboard":
                return permissions.includes("DASHBOARD_ADMINISTRATION");
            case "utilisateurs":
                return permissions.includes("LIST_UTILISATEUR");
            case "details_utilisateurs":
                return permissions.includes("CONSULTER_UTILISATEUR");
            case "types-profils":
                return permissions.includes("LIST_TYPE_PROFIL");
            case "details-types-profils":
                return permissions.includes("CONSULTER_TYPE_PROFIL");
            case "profils":
                return permissions.includes("LIST_PROFIL");
            case "details-profil":
                return permissions.includes("CONSULTER_PROFIL");
            case "administration-rapport":
                return permissions.includes("LIST_ADMINISTRATION_RAPPORT");
            case "mouchard":
                return permissions.includes("LIST_MOUCHARD");
            case "modeles_fichiers":
                return permissions.includes("LIST_MODELES_FICHIERS");

        // ABBATAGE

            case "abbattages_titres":
                return permissions.includes("LIST_ABBATTAGES_TITRES");
            case "details-abbattages_titres":
                return permissions.includes("CONSULTER_ABATTAGE_TITRE");
            case "feuillet_df_10":
                return permissions.includes("LIST_FEUILLET_DF_10");
            case "bris_abbattages":
                return permissions.includes("LIST_BRIS_ABBATTAGES");
            case "bris_abbattages_detail":
                return permissions.includes("CONSULTER_ABATTAGE_ARB");
            case "abbattage-rapport":
                return permissions.includes("LIST_ABBATTAGES_RAPPORT");

        // CODES BARRES

            case "code_barres":
                return permissions.includes("LIST_CODE_BARRES");
            case "details_code_barres":
                return permissions.includes("CONSULTER_CODE_BARRES");

        // DONNEES DE REFERENCES

            case "pays":
                return permissions.includes("LIST_PAYS");
            case "departement":
                return permissions.includes("LIST_DEPARTEMENT");
            case "regions":
                return permissions.includes("LIST_REGIONS");
            case "arrondissements":
                return permissions.includes("LIST_ARRONDISSEMENTS");
            case "sites":
                return permissions.includes("LIST_SITES");
            case "details-site":
                return permissions.includes("CONSULTER_SITE");
            case "banques":
                return permissions.includes("LIST_BANQUES");
            case "type_de_beneficiaire":
                return permissions.includes("LIST_TYPE_BENEFICIAIRE");
            case "parametre_fixes":
                return permissions.includes("LIST_PARAMETRE_FIXES");
            case "entite_forestiere":
                return permissions.includes("LIST_ENTITE_FORESTIERE");
            case "details-entite_forestiere":
                return permissions.includes("CONSULTER_ENTITE_FORESTIERE");
            case "autres_entites":
                return permissions.includes("LIST_AUTRES_ENTITE");
            case "essences":
                return permissions.includes("LIST_ESSENCES");
            case "details-essences":
                return permissions.includes("CONSULTER_ESSENCE");
            case "traitement_sylvicole":
                return permissions.includes("LIST_TRAITEMENT_SYLVICOLE");
            case "valeurs_fob":
                return permissions.includes("LIST_VALEURS_FOB");
            case "classe_de_qualite":
                return permissions.includes("LIST_CLASSE_QUALITE");
            case "types_de_produits":
                return permissions.includes("LIST_TYPE_PRODUIT");
            case "parametre_variable":
                return permissions.includes("LIST_PARAMETRE_VARIABLE");
            case "repartition_beneficiares":
                return permissions.includes("LIST_REPARTITION_BENEFICIAIRES");
            case "type_infraction:":
                return permissions.includes("LIST_TYPE_INFRACTION");
            case "zone_d_exploitation":
                return permissions.includes("LIST_ZONE_EXPLOITATION");
            case "donnees-reference-rapport":
                return permissions.includes("LIST_DONNEES_REFERENCES_RAPPORT");

        // TRANSFORMATION

            case "productions":
                return permissions.includes("LIST_PRODUCTION");
            case "detail-production":
                return permissions.includes("CONSULTER_PRODUCTION");
            case "entree_usinage":
                return permissions.includes("LIST_ENTREE_USINAGE");
            case "detail-entree_usinage":
                return permissions.includes("CONSULTER_ENTREE_USINAGE_SITE");
            case "creer-entree_usinage":
                return permissions.includes("CREER_ENTREE_USINAGE_SITE");
            case "lignes_de_transformation":
                return permissions.includes("LIST_LIGNE_TRANSFORMATION");
            case "detail_lignes_de_transformation":
                return permissions.includes("CONSULTER_LIGNES_DE_TRANSFORMATION");
            case "create-lignes_de_transformation":
                return permissions.includes("CREER_LIGNES_DE_TRANSFORMATION");
            case "transformation-rapport":
                return permissions.includes("LIST_TRANSFORMATION_RAPPORT");
            case "rendement_matiere":
                return permissions.includes("LIST_RENDEMENT_MATIERE");
        
        // FISCALITES FORESTIERE

            case "quittance_lv":
                return permissions.includes("LIST_QUITTANCE_LV");
            case "quittance_lv_detail":
                return permissions.includes("CONSULTER_QUITTANCE_LV");
            case "quittance_df10":
                return permissions.includes("LIST_QUITTANCE_DF10");
            case "details-quittance_df10":
                return permissions.includes("CONSULTER_QUITTANCE_DF10");
            case "emission_titre_recouvrement":
                return permissions.includes("LIST_EMISSION_TITRE_RECOUVREMENT");
            case "fiscalite-forestiere-caution":
                return permissions.includes("LIST_FISCALITE_FORESTIERE_CAUTION");
            case "fiscalite-forestiere-moratoire":
                return permissions.includes("LIST_FISCALITE_FORESTIERE_MORATOIRE");
            case "fiscalite-forestiere-rapport":
                return permissions.includes("LIST_FISCALITE_FORESTIERE_RAPPORT");
            case "fiscalite-forestiere-quittance-paiement":
                return permissions.includes("LIST_FISCALITE_FORESTIERE_QUITTANCE_PAIEMENT");
            
        // CONTROLES

            case "controle_colis":
                return permissions.includes("LIST_CONTROLES_COLIS");
            case "controle_grume":
                return permissions.includes("LIST_CONTROLES_GRUMES");
            case "inspection_abattage":
                return permissions.includes("LIST_INSPECTION_ABBATAGES");
            case "details_inspection_abattage":
                return permissions.includes("CONSULTER_INSPECTION_ABBATAGES");
            case "controle-rapport":
                return permissions.includes("LIST_CONTROLE_RAPPORT");

        // TRACABILITE

            case "authenticite_document":
                return permissions.includes("LIST_AUTHENTICITE_DOCUMENT");
            case "produit_provenance_cameroun":
                return permissions.includes("LIST_PRODUIT_PROVENANCE_CAMEROUN");
            case "produit_provenance_cemac":
                return permissions.includes("LIST_PRODUIT_PROVENANCE_CEMAC");
            case "tracabilite-rapport":
                return permissions.includes("LIST_TRACABILITE_RAPPORT");
            case "stocks":
                return permissions.includes("LIST_STOCKS");

        // CERTIFICAT DE LEGALITE

            case "certificats":
                return permissions.includes("LIST_CERTIFICAT");
            case "demande_de_certificat":
                return permissions.includes("LIST_DEMANDE_DE_CERTIFICAT");
            case "certificats-de-legalite-rapport":
                return permissions.includes("LIST_CERTIFICAT_LEGALITE_RAPPORT");

        // EXPORTATION

            case "attestation_conformite_produit":
                return permissions.includes("LIST_ATTESTATION_CONFORMITE_PRODUIT");
            case "autorisation_exportation_grume":
                return permissions.includes("LIST_AUTORISATION_EXPORTATION_GRUME");
            case "autorisation_flegt":
                return permissions.includes("LIST_AUTORISATION_FLEGT");
            case "bois_exporte":
                return permissions.includes("LIST_BOIS_EXPORT");
            case "certificat_exportateur":
                return permissions.includes("LIST_CERTIFICAT_EXPORTATEUR");
            case "demande_acp":
                return permissions.includes("LIST_DEMANDE_ACP");
            case "demande_autorisation_flegt":
                return permissions.includes("LIST_DEMANDE_AUTORISATION_FLEGT");
            case "demande_bse":
                return permissions.includes("LIST_DEMANDE_BSE");
            case "demande_certificat_exportateur":
                return permissions.includes("LIST_DEMANDE_CERTIFICAT_EXPORTATEUR");
            case "permis_cites":
                return permissions.includes("LIST_PERMIS_CITES");
            case "quota_bois_exportation":
                return permissions.includes("LIST_QUOTA_BOIS_EXPORTATION");
            case "exportation-rapport":
                return permissions.includes("LIST_QUOTA_BOIS_EXPORTATION");
            case "specification_export":
                return permissions.includes("LIST_SPECIFICATION_EXPORT");

        // INVENTAIRE

            case "catalogues":
                return permissions.includes("LIST_CATALOGUE");
            case "inventaire":
                return permissions.includes("LIST_INVENTAIRES");
            case "detail-inventaire":
                return permissions.includes("CONSULTER_INVENTAIRE");
            case "Verification":
                return permissions.includes("LIST_VERIFICATION");
            case "detail-verification":
                return permissions.includes("CONSULTER_VERIFICATION_INVENTAIRE");
            case "inventaires-rapport":
                return permissions.includes("LIST_INVENTAIRE_RAPPORT");
            case "tracking_limites":
                return permissions.includes("LIST_TRACKING_LIMITES");
            case "details_tracking_limites":
                return permissions.includes("CONSULTER_TRACKING_LIMITES");

        // TITRES FORESTIERS

            case "aeb_vep":
                return permissions.includes("LIST_AEB_VEP");
            case "apc":
                return permissions.includes("LIST_APC");
            case "arb":
                return permissions.includes("LIST_ARB");
            case "concession_en_cp":
                return permissions.includes("LIST_CONCESSION_EN_CP");
            case "concession_en_cd":
                return permissions.includes("LIST_CONCESSION_EN_CD");
            case "concession_en_cd_detail":
                return permissions.includes("CONSULTER_CONCESSION_DEFINITIVE");
            case "foret_communale":
                return permissions.includes("LIST_FORET_COMMUNALE");
            case "foret_communautaire_en_cd":
                return permissions.includes("LIST_FORET_COMMUNAUTAIRE_EN_CD");
            case "foret_communautaire_en_cp":
                return permissions.includes("LIST_FORET_COMMUNAUTAIRE_EN_CP");
            case "permis_de_bois_d_oeuvre":
                return permissions.includes("LIST_PERMIS_BOIS_OEUVRE");
            case "permis_special":
                return permissions.includes("LIST_PERMIS_SPECIAL");
            case "titres_forestiers-rapport":
                return permissions.includes("LIST_TITRES_FORESTIERS_RAPPORT");
            case "vente_de_coupe":
                return permissions.includes("LIST_VENTE_DE_COUPE");

        // BOIS CEMAC 

            case "entite_forestiere_cemac":
                return permissions.includes("LIST_ENTITE_FORESTIERE_CEMAC");
            case "details_entite_forestiere_cemac":
                return permissions.includes("CONSULTER_ENTITE_FORESTIERE");
            case "entrees_en_parc_cemac":
                return permissions.includes("LIST_ENTREEES_EN_PARC_CEMAC");
            case "lettres_de_voiture_cemac":
                return permissions.includes("LIST_LETTRES_DE_VOITURES_CEMAC");
            case "code_barre":
                return permissions.includes("LIST_CODE_BARRE");
            case "details_code_barre":
                return permissions.includes("CONSULTER_CODE_BARRES");
            case "bois-cemac-rapport":
                return permissions.includes("LIST_BOIS_CEMAC_RAPPORT");

        // PERMIS

            case "demande_de_permis":
                return permissions.includes("LIST_DEMANDE_PERMIS");
            case "details_demande_de_permis":
                return permissions.includes("CONSULTER_DEMANDE_DE_PERMIS");
            case "permis":
                return permissions.includes("LIST_PERMIS");
            case "detail-permis":
                return permissions.includes("CONSULTER_PERMIS_DE_BOIS_OEUVRE");
            case "permis-rapport":
                return permissions.includes("LIST_PERMIS_RAPPORT");
        
        // CONTENCIEUX

            case "contencieux-proces_verbal":
                return permissions.includes("LIST_CONTENCIEUX_PROCES_VERBAL");
            case "contencieux-notification_primitive":
                return permissions.includes("LIST_CONTENCIEUX_NOTIFICATION_PRIMITIVES");
            case "contencieux-demande_transaction":
                return permissions.includes("LIST_CONTENCIEUX_DEMANDE_TRANSACTION");
            case "contencieux-notification_definitive":
                return permissions.includes("LIST_CONTENCIEUX_NOTIFICATION_DEFINITIVE");
            case "contencieux-decision_tribunal":
                return permissions.includes("LIST_CONTENCIEUX_DECISION_TRIBUNAL");
            case "contencieux-contencieux":
                return permissions.includes("LIST_CONTENCIEUX");
            case "contencieux-transaction":
                return permissions.includes("LIST_CONTENCIEUX_TRANSACTION");
    






























                case "admin-dashboard":
            return true;
            //module Administration 
        case "utilisateurs":
            return permissions.includes("UTILISATEUR")
        case "details_utilisateurs":
            return permissions.includes("CONSULTER_UTILISATEUR")
        case "profils":
            return permissions.includes("PROFIL")
        case "types-profils":
            return permissions.includes("TYPE_PROFIL")
        case "mouchard":
            return permissions.includes("MOUCHARD")
        //module Données de Reférence 
        case "pays":
            return permissions.includes("PAYS")
        case "departement":
            return permissions.includes("DEPARTEMENT")
        case "regions":
            return permissions.includes("REGION")
        case "arrondissements":
            return permissions.includes("ARRONDISSEMENT")
        case "sites":
            return permissions.includes("SITE")
        case "details-site":
            return permissions.includes("CONSULTER_SITE")
        case "banques":
            return permissions.includes("CONSULTER_UTILISATEUR")
        case "type_de_beneficiaire":
            return permissions.includes("PROFIL")
        case "parametre_fixes":
            return permissions.includes("TYPE_PROFIL")
        case "entite_forestiere":
            return permissions.includes("MOUCHARD")
        case "details-entite_forestiere":
            return permissions.includes("UTILISATEUR")
        case "autres_entites":
            return permissions.includes("AUTRE_ENTITE")
        case "essences":
            return permissions.includes("PROFIL")
        case "details-essences":
            return permissions.includes("TYPE_PROFIL")
        case "traitement_sylvicole":
            return permissions.includes("MOUCHARD")
        case "valeurs_fob":
            return permissions.includes("VALEUR_FOB")
        case "classe_de_qualite":
            return permissions.includes("CONSULTER_UTILISATEUR")
        case "types_de_produits":
            return permissions.includes("PROFIL")
        case "parametre_variable":
            return permissions.includes("TYPE_PROFIL")
        case "repartition_beneficiares":
            return permissions.includes("MOUCHARD")

            case "type_infraction":
            return permissions.includes("CONSULTER_UTILISATEUR")
        case "essences":
            return permissions.includes("PROFIL")
        case "zone_d_exploitation":
            return permissions.includes("TYPE_PROFIL")
        case "donnees-reference-rapport":
            return permissions.includes("MOUCHARD")


           
        default:
            return permissions.includes(name);
    }

}
