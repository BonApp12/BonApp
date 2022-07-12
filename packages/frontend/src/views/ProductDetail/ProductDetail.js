import Layout from "../../components/Layout/Layout";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import fetchFullPlateById from "../../requests/plates/fetchFullPlate";
import LoadingPage from "../../components/Loading/LoadingPage";

/**
 * Ce composant doit avoir à sa disposition tous les détails du restaurant qui devront
 * lui être transmis via le composant parent. VALIDÉ
 * Son rôle est d'afficher en détail le produit demandé
 * Afficher des suggestions liés à ce produit (second temps)
 * Gérer le panier (en pouvant ajouter le produit qu'il gère
 */


const ProductDetail = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const props = location.state;

    const [plate, setPlate] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    // Implémenter un loader pour attendre la donnée et retourner les bonnes choses.

    useEffect(() => {
        let plateId = params.idPlate;
        fetchFullPlateById(plateId, setPlate, setIsLoaded, setError, navigate);
    }, [params.idPlate]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (error) return <div>Une erreur est survenue lors de la récupération du plat. Veuillez réessayer</div>;
    if (!isLoaded) return <div><LoadingPage color={"gray"}/></div>;
    return (
        <Layout restaurant={props.restaurant}>
            <p onClick={handleGoBack}>Retour</p>
            <h3>{props.plateName}</h3>
            <h4>Liste des ingrédients : </h4>
            <ul>
                {
                    plate.ingredient.map((i) => {
                        return (
                            <li key={i.id}>{i.name}</li>
                        );
                    })
                }
            </ul>
        </Layout>
    );
};

export default ProductDetail;
