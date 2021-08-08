//--------------------------------------------
// VARIABLES
//--------------------------------------------
//  1 - on sélectionne notre canvas
const canvas = document.getElementById("canvas");
// 2 - on ajoute un contexte 2D
const ctx = canvas.getContext("2d");
// 3 - on précise au contexte qu'il va prendre toute la larguer + hauteur de la fenêtre
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//--------------------------------------------
// CLASSE
//--------------------------------------------
// 4 - création de la classe particules
class Particule {
	constructor(posX, posY, directionX, directionY, size, color) {
		this.posX = posX;
		this.posY = posY;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.color = color;
	}
	// je crée la méthode draw pour dessiner les particules
	draw() {
		// on démarre le tracé
		ctx.beginPath();
		// on utilise arc pour faire un cercle complet avec dans l'ordre :
		// posX - posY - taille - angle initial toujours à 0 - angle final = MATH.PI*2 - horaire ou antihoraie si false
		ctx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2, false);
		// on lui donne une couleur fill pour remplir stroke pour les contours
		ctx.strokeStyle = this.color;
		// on le dessine et on le remplit
		ctx.stroke();
		// ctx.fillStyle = this.color;
		// ctx.fill();
	}

	// méthode pour gérer l'animation des particules
	MAJ() {
		// on vérifie qi la position de la particule déborde sur le bord droit ou gauche du canvas => si oui on inverse sa direction
		if (this.posX + this.size > canvas.width || this.posX - this.size < 0) {
			// si trop a gauche repart à droite et inversement
			this.directionX = -this.directionX;
		}
		// une fois la direction changée, on la rajoute à la position
		this.posX += this.directionX;

		// sur Y
		if (this.posY + this.size > canvas.height || this.posY - this.size < 0) {
			// si trop a gauche repart à droite et inversement
			this.directionY = -this.directionY;
		}
		// une fois la direction changée, on la rajoute à la position
		this.posY += this.directionY;

		this.draw();
	}
}

//--------------------------------------------
// FONCTIONS
//--------------------------------------------
// 5 - création de plusieurs particules que l'on regroupe dans un array

// fonction pour générer les particules de façon aléatoire
let particulesArr;
function initParticules() {
	const colors = [
		"#FF6633",
		"#FFB399",
		"#FF33FF",
		"#FFFF99",
		"#00B3E6",
		"#E6B333",
		"#3366E6",
		"#999966",
		"#99FF99",
		"#B34D4D",
		"#80B300",
		"#809900",
		"#E6B3B3",
		"#6680B3",
		"#66991A",
		"#FF99E6",
		"#CCFF1A",
		"#FF1A66",
		"#E6331A",
		"#33FFCC",
		"#66994D",
		"#B366CC",
		"#4D8000",
		"#B33300",
		"#CC80CC",
		"#66664D",
		"#991AFF",
		"#E666FF",
		"#4DB3FF",
		"#1AB399",
		"#E666B3",
		"#33991A",
		"#CC9999",
		"#B3B31A",
		"#00E680",
		"#4D8066",
		"#809980",
		"#E6FF80",
		"#1AFF33",
		"#999933",
		"#FF3380",
		"#CCCC00",
		"#66E64D",
		"#4D80CC",
		"#9900B3",
		"#E64D66",
		"#4DB380",
		"#FF4D4D",
		"#99E6E6",
		"#6666FF",
	];
	particulesArr = [];
	for (let i = 0; i < 150; i++) {
		let color = colors[Math.floor(Math.random() * (colors.length + 1))];
		let size = (Math.random() + 0.2) * 20; // pour 0.01 pour éviter le 0
		let posX = Math.random() * (window.innerWidth - size * 2) + size; // pour éviter trop au bord avec size * 2
		let posY = Math.random() * (window.innerHeight - size * 2) + size;
		let directionX;
		let directionY;
		// la direction va aussi gérer la vitesse de déplacement => si on augmente les valeurs de l'intervalle (ici -0.2/0.2) les particules iront plus vite
		if (window.innerWidth < 768) {
			directionX = Math.random() * 0.4 - 0.2; // permet d'avoir un nombre positif ou négatif
			directionY = Math.random() * 0.4 - 0.2;
		} else {
			directionX = Math.random() * 0.8 - 0.4; // permet d'avoir un nombre positif ou négatif
			directionY = Math.random() * 0.8 - 0.4;
		}

		particulesArr.push(
			new Particule(posX, posY, directionX, directionY, size, color)
		);
	}
	// console.log(particulesArr);
}
// 6 - animation des particules avec une fonction récursive
function animateParticules() {
	// requestAnimationFrame appelle une fonction60 fois / s environ
	requestAnimationFrame(animateParticules);
	// nettoyer un rectangle => nettoie l'écran
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	// on fait ensuite apparâitre tous les éléments
	particulesArr.forEach((particule) => {
		particule.MAJ(); // MAJ est la méthode qui fait bouger les particules = méthode de la classe
	});
}

//--------------------------------------------
// MAIN
//--------------------------------------------

initParticules();
animateParticules();

// 7 - Eviter la déformation des particules quand on aggrandit/rétrécit la fenêtre
function resizing() {
	initParticules();
	animateParticules();
}

let adjustResize;
window.addEventListener("resize", () => {
	clearTimeout(adjustResize);
	adjustResize = setTimeout(resizing, 100);
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
});
