// Inicialize o sh
function setup() {
  createCanvas(400, 400);
  let slider = select('#slider'); //// recebe as informaçoes do input do slider
}

//cores
let cor_curva = 'rgb(203,75,203)'
let cor_pontc ='rgb(203,75,203)'
let cor_polic = 'rgba(203,75,203,0.5)'

// Lista de pontos de controle
let points = [];

//nEvaluation
let nEvaluations = 50;

// Calcula a curva de Bezier
let curve = deCasteljau(points, nEvaluations);

// cria uma nova curva caso s slider se mova com o valor selecionado
slider.addEventListener('input', sliderChanged);
function sliderChanged(){
  nEvaluations = slider.value;
  curve = deCasteljau(points, nEvaluations);
}

// recebe as informaçoes do input do botão clear
let buttonclear = document.getElementById("buttonClear");
// limpa a tela caso o botão seja apertado
buttonclear.addEventListener('click', function() {
    points = [];
    clear();
    curve = deCasteljau(points, nEvaluations);
});

// função que adicionas os pontos as curva de benzier
function mouseClicked() {
  let newPoint = createVector(mouseX, mouseY); 
  if (mouseX <= 400 && mouseY <= 400){
      append(points, newPoint); 
      curve = deCasteljau(points, nEvaluations);
  }
}

//ocultar/mostrar curvas
const curvasCheckbox = document.getElementById("curvas");
curvas.addEventListener("change", function() {
  if (curvasCheckbox.checked) {
    cor_curva = "rgba(203,75,203,0)";
  }
  else {
    cor_curva = "rgb(203,75,203)";
  }
});

//ocultar/mostrar pontos de controle
//tá ocultando as partes que intersectam com os poligonais
const pontcCheckbox = document.getElementById("pontc");
pontc.addEventListener("change", function() {
  if (pontcCheckbox.checked) {
    cor_pontc = "rgba(203,75,203,0)";
  }
  else {
    cor_pontc = "rgb(203,75,203)";
  }
});

//ocultar/mostrar poligonais de controle
//tá ocultando as partes que cruzam com a curva
const policCheckbox = document.getElementById("polic");
polic.addEventListener("change", function() {
  if (policCheckbox.checked) {
    cor_polic = "rgba(203,75,203,0)";
  }
  else {
    cor_polic = "rgba(203,75,203,0.5)";
  }
});


// Desenha na tela
function draw() {
  background(255);
  noFill();
  //stroke(0);
  strokeWeight(2);

  // desenhado a cruva de benzier
  beginShape();
  stroke(cor_curva)
  curve.forEach(point => {
    vertex(point.x, point.y);
  });
  endShape();

  // desenhando as linhas entre pontos
  beginShape();
  stroke(cor_polic)
      points.forEach(point => {
        vertex(point.x, point.y);
      });
  endShape();

  // desenha os pontos
  stroke(cor_pontc); 
  strokeWeight(5);
  points.forEach(ponto => {
    point(ponto.x, ponto.y);
  });

}

// Função de interpolação
function interpolate(t, p0, p1) {
  return { x: (1 - t) * p0.x + t * p1.x, y: (1 - t) * p0.y + t * p1.y };
}

// Função de De Casteljau
function deCasteljau(points, nEvaluations) {
  if (points == undefined || points.length < 1) return [] ;
  result = [];
  start = points[0];
  for (let t = 0; t <= 1; t += 1 / nEvaluations) {
    controls = points;

    while (controls.length > 1) {
      aux = [];

      for (i = 0; i < controls.length - 1; i++) {
        aux[i] = interpolate(t, controls[i], controls[i + 1]);
      }
      controls = aux;
    }

    result.push(controls[0]);
  }
  return result;
}