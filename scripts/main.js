const canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const c=canvas.getContext('2d');

const mouse = {
  x: undefined,
  y: undefined
}

let maxRadius=40;
let minRadius=5;
let mouseAffect=100;
const colorArray = [
  '#594F4F',
  '#A4928E',
  '#404155',
  '#3C373D',
  '#BFA89B',
];

window.addEventListener('mousemove',
  function (e) {
    mouse.x=event.x;
    mouse.y=event.y;
});

window.addEventListener('resize',
  function() {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    init();
  }
);



class Circle {

  constructor(x,y,dx, dy, radius){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=radius;
    this.color=colorArray[ Number((Math.random()*colorArray.length-1).toFixed(0))  ];
  }

  draw(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0, Math.PI * 2, false);
    //c.strokeStyle = 'blue';
    c.fillStyle = this.color;
    //c.stroke();
    c.fill();
  }

  update() {
    if(this.x + this.radius> innerWidth || this.x - this.radius < 0){
      this.dx=-this.dx;
    }
    if(this.y + this.radius> innerHeight || this.y - this.radius < 0){
      this.dy=-this.dy;
    }
    this.x+=this.dx;
    this.y+=this.dy;

    //interactivity
    if(mouse.x - this.x < mouseAffect && mouse.x - this.x >-mouseAffect
      && mouse.y - this.y < mouseAffect && mouse.y - this.y >-mouseAffect){
        if(this.radius < maxRadius){
          this.radius +=1;
        }
    }
    else if(this.radius > this.minRadius){
      this.radius -=1;
    }

    this.draw();
  }

}
//let circle=new Circle(200,200, 3, 3, 0);

let circleArray = [];


const init=()=>{
  circleArray = [];
  for (var i = 0; i < 800; i++) {
    var x=Math.random()*(innerWidth - radius*2) + radius;
    var y=Math.random()*(innerHeight - radius*2) + radius;
    var dx = (Math.random()-0.5) * 8;
    var dy = (Math.random()-0.5) * 8;
    var radius=Math.random()*3 + 1;
    circleArray.push(new Circle(x,y, dx, dy, radius))
  }
}





function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  //circle.update();
}

init();
animate();
