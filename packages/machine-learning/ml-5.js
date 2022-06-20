console.log(input);
const data = [{
    "ingredient": ["sel", "poivre", "oignon", "tomate", "piment", "parmesan"],
    "prix": 13.5,
    "type": "ENTREE",
    "ville": "Paris"
},
    {
        "ingredient": ["rubarbe", "miel", "vanille"],
        "prix": 8.5,
        "type": "DESSERT",
        "ville": "Paris"
    },
    {
        "ingredient": ["coco", "creme", "fraise"],
        "prix": 7.5,
        "type": "DESSERT",
        "ville": "Mans"
    },
    {
        "ingredient": ["sel", "poivre", "parmesan"],
        "prix": 7,
        "type": "ENTREE",
        "ville": "Paris"
    },
    {
        "ingredient": ["pain", "tomate", "chorizo", "parmesan"],
        "prix": 22,
        "type": "PLAT",
        "ville": "Paris"
    },
    {
        "ingredient": ["Fromage", "parmesan", "gorgonzola", "pain"],
        "prix": 17,
        "type": "PLAT",
        "ville": "Cergy"
    },
    {
        "ingredient": ["lait", "chocolat", "farine", "vanille"],
        "prix": 9,
        "type": "DESSERT",
        "ville": "Nice"
    },
    {
        "ingredient": ["sel", "poivre", "oignon", "tomate", "piment", "parmesan"],
        "prix": 13.5,
        "type": "ENTREE",
        "ville": "Paris"
    }
];
const options = {
    task: 'classification',
    debug: true
};

const nn = ml5.neuralNetwork(options);


data.forEach(item => {
    const inputs = {
        // ingredient: item.ingredient,
        prix: item.prix,
        type: item.type
    };
    const output = {
        ville: item.ville,
        prix: item.prix
    };

    nn.addData(inputs, output);
});
nn.normalizeData();

const trainingOptions = {
    epochs: 150,
    batchSize: 12
};
nn.train(trainingOptions, finishedTraining);

// Step 7: use the trained model
function finishedTraining() {
    classify();
}

// Step 8: make a classification
function classify() {

    nn.classify(input, handleResults);
}

// Step 9: define a function to handle the results of your classification
function handleResults(error, result) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(result);
}
