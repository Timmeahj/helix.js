class Helix{
    height = 320;
    width = 150;
    yAmount = 10;
    div = document.createElement('div');
    globes = [];

    init(){
        document.body.appendChild(this.div);
        this.div.style.height = this.height+'px';
        this.div.style.width = this.width+'px';
        this.div.style.position = 'absolute';
        this.div.style.left = (window.innerWidth/2)-(this.width/2)+'px';
        this.div.style.top = (window.innerHeight/2)-(this.height/2)+'px';
        for (let y = 0; y < this.yAmount; y++) {
            for (let x = 0; x < 2; x++) {
                const globe = new Globe(x, y);
                this.globes.push(globe);
                globe.init(this);
            }
        }
    }
}

class Globe{
    size = 30;
    color;
    speed = 1;
    div = document.createElement('div');
    x;
    y;
    direction = 'right';
    opacity = 1;

    constructor(x,y) {
        this.x = x;
        this.y = y;
        if(x === 1){
            this.direction = 'left';
        }
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        this.color = 'rgb('+r+', '+g+', '+b+')';
    }

    init(helix){
        helix.div.appendChild(this.div);
        this.div.style.transition = this.speed+'s';
        this.div.style.height = this.size+'px';
        this.div.style.width = this.size+'px';
        this.div.style.borderRadius = '50%';
        this.div.style.background = this.color;
        this.div.style.position = 'absolute';
        this.div.style.transitionTimingFunction = "ease-in-out";
        this.div.style.left = this.x*helix.width+'px';
        this.div.style.top = this.y*helix.height/helix.yAmount+'px';
    }

    animate(){
        let x = this.x;
        if(x === 1){
            x = 0;
        }else{
            x = 1;
        }
        this.x = x;
        this.update();
    }

    regularSize(){
        this.size = 25;
    }

    increaseSize(){
        this.size = 40;
        this.opacity = 1;
        this.div.style.filter = 'invert(0)';
    }

    decreaseSize(){
        this.size = 10;
        this.opacity = 0.2;
        this.div.style.filter = 'invert(1)';
    }

    update(){
        this.div.style.left = this.x*helix.width+'px';
        this.div.style.height = this.size+'px';
        this.div.style.width = this.size+'px';
        this.div.style.opacity = this.opacity+'';
        if(this.x === 1){
            this.direction = 'left';
        }else{
            this.direction = 'right';
        }
    }
}

document.body.style.background = 'rgb(25,15,20)';

const helix = new Helix();
helix.init();

helix.globes.forEach(globe => {
    setTimeout(function(){
        setInterval(function (){
            if(globe.direction === 'right'){
                globe.increaseSize();
            }else{
                globe.decreaseSize();
            }
            globe.animate();
        }, globe.speed*1000);
        setTimeout(function(){
            setInterval(function (){
                globe.regularSize();
                globe.update();
            }, globe.speed*1000);
        }, globe.speed*500);
    }, globe.y*100);
});