const width = 28
const grid = document.querySelector('.grid')
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]
// 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
  const squares = []

  //create your board
  function createBoard(){
      for(let i=0;i<layout.length;i++){
          const square = document.createElement('div')
          grid.appendChild(square)
          squares.push(square)
          //Add layout to the board
          if(layout[i] === 1){
              squares[i].classList.add('wall')
          }
      }
  }
  createBoard()
  
  //draw pacman and blinky
  let pacmanCurrentIndex = 502
  squares[pacmanCurrentIndex].classList.add('pac-man')
  
  let blinkyCurrentIndex = 197
  squares[blinkyCurrentIndex].classList.add('blinky')

//get coordinates of pacman or blinky
function getCoordinates(index){
 return [index % width,Math.floor(index / width)]
}
console.log(getCoordinates(502))

//move Blinky
function moveBlinky(){
    const directions = [-1,+1,+width,-width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    let ghostTimerId = NaN
    ghostTimerId = setInterval(function(){
     if(!squares[blinkyCurrentIndex + direction].classList.contains('wall')){
         //remove ghost class
         squares[blinkyCurrentIndex].classList.remove('blinky')
         //check if the new space is closer
         const [blinkyX,blinkyY] = getCoordinates(blinkyCurrentIndex)
         const [pacmanX,pacmanY] = getCoordinates(pacmanCurrentIndex)
         const [blinkyNewX,blinkyNewY] = getCoordinates(blinkyCurrentIndex + direction)
         function isXCoordCloser(){
             if((blinkyNewX - pacmanX) > (blinkyX - pacmanX)){
                 return true
             }else{
                 return false
             }
         }
         function isYCoordCloser(){
            if((blinkyNewY - pacmanY) > (blinkyY - pacmanY)){
                return true
            }else{
                return false
            }
         }
         if(isXCoordCloser() || isYCoordCloser()){
             blinkyCurrentIndex += direction
             squares[blinkyCurrentIndex].classList.add('blinky')
         }else{
            squares[blinkyCurrentIndex].classList.add('blinky')
            direction = directions[Math.floor(Math.random() * directions.length)]

         }
         squares[blinkyCurrentIndex].classList.add('blinky')   
     }else{
        direction = directions[Math.floor(Math.random() * directions.length)]
     }
     //stop game when pac-man is eaten
     if(squares[blinkyCurrentIndex].classList.contains('pac-man')) clearInterval(ghostTimerId)
    },300)
}
moveBlinky()