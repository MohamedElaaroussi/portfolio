

const playercolumns = [
  { name: "JOUEUR", uid: "joueur",exports: ["joueur"],sortable: true},
  { name: "ROLE",exports: ["role"], uid: "role"},
  { name: "EMAIL",exports: ["email"], uid: "email",sortable: true },
  { name: "DATE D'AJOUT",exports: ["dateajout"], uid: "dateajout",sortable: true},
  { name: "REVENUE TOTAL",exports: ["revenuetotal"], uid: "revenuetotal",sortable: true},
  { name: "SOLDE RESTANT",exports: ["solderestant"] ,uid: "solderestant" ,sortable: true},
  { name: "ACTIONS",exports: ["actions"] ,uid: "actions" },
];
const matchcolumns = [
  { name: "MATCH", uid: "match",exports:["match","date","heure"] ,sortable: true},
  { name: "HOST", uid: "host",exports:["host"]},
  { name: "JOUEURS", uid: "joueurs",exports:[]},
  { name: "PLACES", uid: "places",exports:["places"]},
  { name: "VILLE", uid: "ville",exports:["ville"],sortable: true},
  { name: "PRICE", uid: "price",exports:["price"],sortable: true },
  { name: "TOTAL PAYE", uid: "totalpaye",exports:["totalpaye"],sortable: true },
  { name: "STATUS", uid: "status",exports:["status"]},
  { name: "ACTIONS", uid: "actions",exports:["actions"] },
];
const ordercolumns = [
  { name: "MATCH",exports: ["match"], uid: "match" ,sortable: true},
  { name: "NOM",exports: ["nom"], uid: "nom",sortable: true},
  { name: "MONTANT",exports: ["montant"], uid: "montant",sortable: true},
  { name: "MODE DE PAIEMENT",exports: ["modedepaiement"], uid: "modedepaiement",sortable: true},
  { name: "DATE",exports: ["date"], uid: "date",sortable: true},
  { name: "STATUS",exports: ["status"], uid: "status"},
  { name: "ACTIONS",exports: ["actions"], uid: "actions" },
];
const usercolumns = [
  { name: "UTILISATEUR",exports: ["utilisateur"], uid: "utilisateur",sortable: true },
  { name: "ROLE",exports: ["role"], uid: "role"},
  { name: "DERNIER CONNEXION",exports: ["dernierconnexion"], uid: "dernierconnexion",sortable: true},
  { name: "DATE DE CREATION",exports: ["datecreation"], uid: "datecreation",sortable: true},
  { name: "ACTIONS",exports: ["actions"], uid: "actions" },
];
const statusOptions = [
  { name: "filled", uid: "filled" },
  { name: "pending", uid: "pending" },
  { name: "cancelled", uid: "cancelled" },
];
const statuscart = [
  { name: "paid", uid: "paid" },
  { name: "pending", uid: "pending" },
];
const roleOptions = [
  { name: "admin", uid: "admin" },
  { name: "user", uid: "user" },
  { name: "content", uid: "content" },
];
const typeOptions = [
  { name: "joueur", uid: "player" },
  { name: "host", uid: "host" },
];
const orders=[
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"mastercard",
    montant:5000,
    status: "vacation",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"mastercard",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "vacation",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "active",
    date:"Oct,04 2023",
  },
  {
    id:"@4567",
    match: "Match des amis",
    nom: "Amine El Farissi",
    modedepaiement: "Paye par carte",
    carte:"visa",
    montant:5000,
    status: "vacation",
    date:"Oct,04 2023",
  },
]
const utilisateurs=[
  { id:1,
    utilisateur:"farid al ansari",
    role:"user",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",

  },
  { id:2,
    utilisateur:"farid al ansari",
    role:"admin",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  } ,  {
    id:3,
    utilisateur:"farid al ansari",
    role:"content",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  },
  { id:4,
    utilisateur:"farid al ansari",
    role:"content",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  }, {
    id:5,  
    utilisateur:"farid al ansari",
    role:"user",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  },
  { id:6,
    utilisateur:"farid al ansari",
    role:"admin",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  },
  { id:7,
    utilisateur:"farid al ansari",
    role:"admin",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  },
  { id:8,
    utilisateur:"farid al ansari",
    role:"admin",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  },
  { id:9,
    utilisateur:"farid al ansari",
    role:"admin",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  },
  { id:10,
    utilisateur:"farid al ansari",
    role:"admin",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  },
  { id:11,
    utilisateur:"farid al ansari",
    role:"admin",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  },
  { id:12,
    utilisateur:"farid al ansari",
    role:"admin",
    email: "farid.alansari@example.com",
    dernierconnexion:"5 heures",
    heure:"8:00 am",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    datecreation:"Oct,04 2023",
  }
]
const users = [
  {
    id:"@4567",
    joueur: "Tony Reichert",
    dateajout: "Oct,04 2023",
    revenuetotal: 7500,
    status: "active",
    solderestant: 2900,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id:"@4567",
    joueur: "Zoey Lang",
    dateajout: "Oct,04 2023",
    revenuetotal: 6500,
    status: "paused",
    solderestant: 2500,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "zoey.lang@example.com",
  },
  {
    id:"@4567",
    joueur: "William Howard",
    dateajout: "Oct,04 2023",
    revenuetotal: 4500,
    status: "active",
    solderestant: 2200,
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "jane.fisher@example.com",
  },
  {
    id:"@4567",
    joueur: "William Howard",
    dateajout: "Oct,04 2023",
    revenuetotal: 5500,
    status: "vacation",
    solderestant: 2800,
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id:"@4567",
    joueur: "Kristen Copper",
    dateajout: "Oct,04 2023",
    revenuetotal: 500,
    status: "active",
    solderestant: 2400,
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "kristen.cooper@example.com",
  },
  {
    id:"@4567",
    joueur: "Brian Kim",
    dateajout: "Oct,04 2023",
    revenuetotal: 8500,
    solderestant: 2900,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "brian.kim@example.com",
    status: "Active",
  },    
  {
    id:"@4567",
    joueur: "Michael Hunt",
    dateajout: "Oct,04 2023",
    revenuetotal: 9500,
    status: "paused",
    solderestant: 2700,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "michael.hunt@example.com",
  },
  {
    id:"@4567",
    joueur: "Samantha Brooks",
    dateajout: "Oct,04 2023",
    revenuetotal: 9500,
    status: "active",
    solderestant: 3100,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "samantha.brooks@example.com",
  },
  {
    id:"@4567",
    joueur: "Frank Harrison",
    dateajout: "Oct,04 2023",
    revenuetotal: 4500,
    status: "vacation",
    solderestant: 3300,
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "frank.harrison@example.com",
  },
  {
    id:"@4567",
    joueur: "frank harrison",
    dateajout: "Oct,04 2023 ",
    revenuetotal: 500,
    status: "active",
    solderestant: 3500,
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "frank.harrison@example.com",
  },
  {
    id:"@4567",
    joueur: "Brandon Stevens",
    dateajout: "Oct,04 2023 ",
    revenuetotal: 500,
    status: "active",
    solderestant: 2200,
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
  },
  {
    id:"@4567",
    joueur: "Brandon Stevens",
    dateajout: "Oct,04 2023",
    revenuetotal: 500,
    status: "paused",
    solderestant: 2800,
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "megan.richards@example.com",
  },
  {
    id:"@4567",
    joueur: "Oliver Scott",
    dateajout: "Oct,04 2023",
    revenuetotal: 500,
    status: "active",
    solderestant: 3700,
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "oliver.scott@example.com",
  },
  {
    id:"@4567",
    joueur: "Grace Allen",
    dateajout: "Oct,04 2023",
    revenuetotal: 500,
    status: "active",
    solderestant: 3000,
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "grace.allen@example.com",
  },
  {
    id:"@4567",
    joueur: "Noah Carter",
    dateajout: "Oct,04 2023",
    revenuetotal: 500,
    status: "paused",
    solderestant: 3100,
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "noah.carter@example.com",
  },
  {
    id:"@4567",
    joueur: "luka Perez",
    dateajout: "Oct,04 2023",
    revenuetotal: 500,
    status: "active",
    solderestant: 2900,
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "luka.perez@example.com",
  },
  {
    id:"@4567",
    joueur: "Liam Johnson",
    dateajout: "Oct,04 2023",
    revenuetotal: 500,
    status: "active",
    solderestant: 2800,
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "liam.johnson@example.com",
  },
  {
    id:"@4567",
    joueur: "brandon Taylor",
    dateajout: "Oct,04 2023",
    revenuetotal: 5900,
    status: "active",
    solderestant: 2700,
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "brandon.taylor@example.com",
  },
  {
    id:"@4567",
    joueur: "Lucas Harris",
    dateajout: "Oct,04 2023",
    revenuetotal: 5700,
    status: "paused",
    solderestant: 3200,
    avatar: "https://i.pravatar.cc/150?img=50",
    email: "lucas.harris@example.com",
  },
  {
    id:"@4567",
    joueur: "lucas Robinson",
    dateajout: "Oct,04 2023",
    revenuetotal: 5500,
    status: "active",
    solderestant: 2600,
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "lucas.robinson@example.com",
  },
];
const matches = [
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/profile.svg",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "paused",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "paused",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "active",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "paused",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "active",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "active",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "active",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "active",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "paused",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "active",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "active",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "active",
    date:"Oct,04 2023",
    hour:"4.00 am"
  },
  {
    id:"@4567",
    match: "Stade Reinne",
    host: "/omar.png",
    joueurs: ["https://i.pravatar.cc/150?u=a048581f4e29026701d","https://i.pravatar.cc/150?u=a048581f4e29026701d"],
    places:10,
    ville: "Agadir",
    totalpaye: 4000,
    status: "active",
    date:"Oct,04 2023",
    hour:"4.00 am"
  }
];
const keys=[1,2,3,4]
const cities = [
  {label: "Agadir", value: "agadir"},
  {label: "Rabat", value: "rabat"},
  {label: "Casablanca", value: "casablanca"},
  {label: "Tanger", value: "tanger"},
]
const status = [
  {label: "Active", value: "active"},
  {label: "Desactive", value: "desactive"},

]
const categories = [
  {
    id: 1,
    name: "vip",
    avatar: "/player.svg",
  },
  {
    id: 2,
    name: "normal",
    avatar: "/host.svg",
  },
]
const nationalities = [
  {
    id: 1,
    name: "Maroc",
    avatar: "https://flagcdn.com/ma.svg",

  },
  {
    id: 2,
    name: "Argentine",
    avatar: "https://flagcdn.com/ar.svg",
  },
  {
    id: 3,
    name: "Lobnan",
    avatar: "https://flagcdn.com/lb.svg",

  },
  {
    id: 4,
    name: "Spain",
    avatar: "https://flagcdn.com/es.svg",

  },
  {
    id: 5,
    name: "Egypt",
    avatar: "https://flagcdn.com/eg.svg",

  },
  {
    id: 6,
    name: "Brasil",
    avatar: "https://flagcdn.com/br.svg",

  },
]
const types = [
  {
    id: 1,
    name: "joueur",
    avatar: "/player.svg",
  },
  {
    id: 2,
    name: "host",
    avatar: "/host.svg",
  },
]
const roles = [
  {
    id: 1,
    name: "admin",
    avatar: "/player.svg",
  },
  {
    id: 2,
    name: "Content",
    avatar: "/host.svg",
  },]
const dates =[
  {
   jour:"Mon ",
   num:11
  },
  {
    jour:"Tue",
    num:12
  },
  {
    jour:"Wed",
    num:13
   },
   {
     jour:"Thu",
     num:14
   },
   {
    jour:"Fri",
    num:15
   },
   {
     jour:"Sat",
     num:16
   },
   {
    jour:"Sun",
    num:17
  },
]

const months =[
  {
    month:'Jan',
    num:'01'
  },
  {
    month:'Fev',
    num:'02'
  },
  {
    month:'Mar',
    num:'03'
  },
  {
    month:'Avr',
    num:'04'
  },
  {
    month:'Mai',
    num:'05'
  },
  {
    month:'Jun',
    num:'06'
  },
  {
    month:'Jui',
    num:'07'
  },
  {
    month:'Aut',
    num:'08'
  },
  {
    month:'Sep',
    num:'09'
  },
  {
    month:'Oct',
    num:'10'
  },
  {
    month:'Nov',
    num:'11'
  },
  {
    month:'Dec',
    num:'12'
  },
]
export {months,statuscart,typeOptions ,roles, dates,playercolumns, ordercolumns, matchcolumns, usercolumns, users, statusOptions,matches,orders,utilisateurs,roleOptions,keys,nationalities,categories,status,cities,types };
