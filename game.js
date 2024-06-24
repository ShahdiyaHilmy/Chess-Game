const board = document.querySelector("#board");
const player=document.querySelector("#player");
const info=document.querySelector("#info");
const width = 8;
let player_move = 'black'
player.textContent = 'black'
const Pieces = [
    rook_b,knight_b,bishop_b,queen_b,king_b,bishop_b,knight_b,rook_b,
    pawn_b,pawn_b,pawn_b,pawn_b,pawn_b,pawn_b,pawn_b,pawn_b,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn_b,pawn_b,pawn_b,pawn_b,pawn_b,pawn_b,pawn_b,pawn_b,
    rook_b,knight_b,bishop_b,queen_b,king_b,bishop_b,knight_b,rook_b
    
    
    
];

function create_board(){
    Pieces.forEach((piece,i)=>{
        const tile = document.createElement("div")
        tile.classList.add('tile')
        tile.innerHTML = piece;
        tile.firstElementChild && tile.firstElementChild.setAttribute('draggable',true);
        tile.setAttribute('tile-id',i)
        //tile.classList.add('black')
        const row = Math.floor((63-i)/8)+1
        if(row%2==0){
            tile.classList.add(i%2===0?"black":"white")
        }
        else{
            tile.classList.add(i%2===0?"white":"black")
        }


        if(i<= 15){
            tile.firstChild.firstChild.classList.add('black_p')
        }

        if(i>= 48){
            tile.firstChild.firstChild.classList.add('white_p')
        }
        // if(i<=15){
        //     tile.first
        // }

        board.append(tile)
    })

    const tiles = document.querySelectorAll("#board .tile")
   tiles.forEach(tile =>{
    tile.addEventListener('dragstart',drag_start)
    tile.addEventListener('dragover',drag_over)
    tile.addEventListener('drop',drag_drop)
   })

   let position_startId
   let dragged

   function drag_start(e){
    position_startId=e.target.parentNode.getAttribute('tile-id');
    dragged = e.target
   }

   function drag_over(e){
        e.preventDefault()
   }

   function drag_drop(e){
    e.stopPropagation()
    // console.log('e.target',e.target)
    const correct_move = dragged.firstElementChild.classList.contains(player_move)
    const attacked = e.target.classList.contains('piece')
    const valid = check_valid(e.target)
    const opponent_move=player_move === 'white'?'black' : 'white'
    const oppo_attack=e.target.firstChild?.classList.contains(opponent_move)
    

    if(correct_move){
        if(oppo_attack && valid){
            e.target.parentNode.append(dragged)
            e.target.remove()
            win()
            changeplayer()
            return
        }
        if(attacked && !oppo_attack){
            return 
        }
        if(valid)
        {
            e.target.append(dragged)
            win()
            changeplayer()
            return
        }
    }
    
    function check_valid(target){
        console.log(target)
         const targetId = Number(target.getAttribute('tile-id')) || Number(target.parentNode.getAttribute('tile-id'))
        const start_id=Number(position_startId)
        const piece = dragged.id
        console.log('targetidt',targetId)
        console.log('start',start_id)
        console.log('piece',piece )

       
        switch(piece){
            case 'pawn_b':
                let start_row = [8,9,10,11,12,13,14,15]
                if(start_row.includes(start_id)&& start_id + width * 2  === targetId 
                || start_id + width  === targetId || !start_id - width  === targetId)
                {
                    target.parentNode.append(dragged)
                    target.append(dragged)
                }
                if(start_id + width -1 === targetId && document.querySelector(`[tile-id="${start_id + width-1}"]`).firstChild||
                start_id + width +1 === targetId && document.querySelector(`[tile-id="${start_id + width+1}"]`).firstChild)
                {
                e.target.parentNode.append(dragged)
                e.target.remove()
                }
                break;
                case 'knight_b':
                    if(start_id + width * 2 + 1===targetId||
                        start_id + width * 2 - 1===targetId||
                        start_id + width - 2 == targetId||
                        start_id + width + 2 === targetId||
                        start_id - width * 2 + 1===targetId||
                        start_id - width * 2 - 1===targetId||
                        start_id - width - 2 == targetId||
                        start_id - width + 2 === targetId)
                        {
                            target.parentNode.append(dragged)
                            target.append(dragged)
                        }
                        
                        if(start_id + width * 2 + 1===targetId && document.querySelector(`[tile-id="${start_id + width * 2 + 1}"]`).firstChild||
                            start_id + width * 2 - 1===targetId && document.querySelector(`[tile-id="${start_id + width * 2 - 1}"]`).firstChild||
                            start_id + width - 2 == targetId && document.querySelector(`[tile-id="${start_id + width - 2}"]`).firstChild ||
                            start_id + width + 2 === targetId && document.querySelector(`[tile-id="${start_id + width + 2}"]`).firstChild ||
                            start_id - width * 2 + 1===targetId && document.querySelector(`[tile-id="${start_id - width * 2 + 1}"]`).firstChild ||
                            start_id - width * 2 - 1===targetId && document.querySelector(`[tile-id="${start_id  - width * 2 - 1}"]`).firstChild ||
                            start_id - width - 2 == targetId && document.querySelector(`[tile-id="${start_id + width - 2}"]`).firstChild ||
                            start_id - width + 2 === targetId && document.querySelector(`[tile-id="${start_id + width + 2}"]`).firstChild )
                        {
                            e.target.parentNode.append(dragged)
                            e.target.remove()
                        }
                    break;
                    case 'bishop_b':
                        if( start_id + width - 1 === targetId||
                            start_id -width + 1 === targetId||
                            start_id - width - 1 === targetId||
                            start_id + width + 1 === targetId||
                            start_id + width * 2 + 2 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild||
                            start_id + width * 3 + 3 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild||
                            start_id + width * 4 + 4 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild ||
                            start_id + width * 5 + 5 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 + 4}"]`).firstChild||
                            start_id + width * 6 + 6 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5 + 5}"]`).firstChild||
                            start_id + width * 7 + 7 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5 + 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 6 + 6}"]`).firstChild||

                            
                            start_id - width * 2 - 2 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild||
                            start_id - width * 3 - 3 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild||
                            start_id - width * 4 - 4 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild ||
                            start_id - width * 5 - 5 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 - 4}"]`).firstChild||
                            start_id - width * 6 - 6 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5 - 5}"]`).firstChild||
                            start_id - width * 7 - 7 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5 - 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 6 - 6}"]`).firstChild||

                            
                            start_id - width * 2 + 2 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild||
                            start_id - width * 3 + 3 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild||
                            start_id - width * 4 + 4 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild ||
                            start_id - width * 5 + 5 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 + 4}"]`).firstChild||
                            start_id - width * 6 + 6 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5 + 5}"]`).firstChild||
                            start_id - width * 7 + 7 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5 + 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 6 + 6}"]`).firstChild||

                           
                            start_id + width * 2 - 2 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild||
                            start_id + width * 3 - 3 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild||
                            start_id + width * 4 - 4 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild ||
                            start_id + width * 5 - 5 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 - 4}"]`).firstChild||
                            start_id + width * 6 - 6 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5 - 5}"]`).firstChild||
                            start_id + width * 7 - 7 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5 - 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 6 - 6}"]`).firstChild
                            )
                            {
                                target.parentNode.append(dragged)
                                target.append(dragged)
                                
                            }
                            if(start_id + width * 2 + 2 === targetId && document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild||
                            start_id + width * 3 + 3 === targetId && document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild||
                            start_id + width * 4 + 4 === targetId && document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild ||
                            start_id + width * 5 + 5 === targetId && document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id + width * 4 + 4}"]`).firstChild||
                            start_id + width * 6 + 6 === targetId && document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id + width * 4 + 4}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 5 + 5}"]`).firstChild||
                            start_id + width * 7 + 7 === targetId && document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id + width * 4 + 4}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 5 + 5}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 6 + 6}"]`).firstChild||

                            
                            start_id - width * 2 - 2 === targetId && document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild||
                            start_id - width * 3 - 3 === targetId && document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild||
                            start_id - width * 4 - 4 === targetId && document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild ||
                            start_id - width * 5 - 5 === targetId && document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id - width * 4 - 4}"]`).firstChild||
                            start_id - width * 6 - 6 === targetId && document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id - width * 4 - 4}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 5 - 5}"]`).firstChild||
                            start_id - width * 7 - 7 === targetId && document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id - width * 4 - 4}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 5 - 5}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 6 - 6}"]`).firstChild||

                            
                            start_id - width * 2 + 2 === targetId && document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild||
                            start_id - width * 3 + 3 === targetId && document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild||
                            start_id - width * 4 + 4 === targetId && document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild ||
                            start_id - width * 5 + 5 === targetId && document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id - width * 4 + 4}"]`).firstChild||
                            start_id - width * 6 + 6 === targetId && document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id - width * 4 + 4}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 5 + 5}"]`).firstChild||
                            start_id - width * 7 + 7 === targetId && document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id - width * 4 + 4}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 5 + 5}"]`).firstChild && document.querySelector(`[tile-id="${start_id - width * 6 + 6}"]`).firstChild||

                           
                            start_id + width * 2 - 2 === targetId && document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild||
                            start_id + width * 3 - 3 === targetId && document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild||
                            start_id + width * 4 - 4 === targetId && document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild ||
                            start_id + width * 5 - 5 === targetId && document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id + width * 4 - 4}"]`).firstChild||
                            start_id + width * 6 - 6 === targetId && document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id + width * 4 - 4}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 5 - 5}"]`).firstChild||
                            start_id + width * 7 - 7 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild  && document.querySelector(`[tile-id="${start_id + width * 4 - 4}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 5 - 5}"]`).firstChild && document.querySelector(`[tile-id="${start_id + width * 6 - 6}"]`).firstChild)
                            {

                                e.target.parentNode.append(dragged)
                                e.target.remove()  
                            }
                            case 'rook':
                                if(
                                    start_id + width * 2 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild||
                                    start_id + width * 3 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild||
                                    start_id + width * 4 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3}"]`).firstChild||
                                    start_id + width * 5 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 4}"]`).firstChild||
                                    start_id + width * 6 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5}"]`).firstChild||
                                    start_id + width * 7 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 6}"]`).firstChild||
                                    
                                    
                                    start_id - width * 2 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild||
                                    start_id - width * 3 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild||
                                    start_id - width * 4 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3}"]`).firstChild||
                                    start_id - width * 5 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 4}"]`).firstChild||
                                    start_id - width * 6 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5}"]`).firstChild||
                                    start_id - width * 7 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 6}"]`).firstChild||
                                    
                                   
                                    start_id + 2 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild||
                                    start_id + 3 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild||
                                    start_id + 4 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 3}"]`).firstChild||
                                    start_id + 5 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 4}"]`).firstChild||
                                    start_id + 6 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 5}"]`).firstChild||
                                    start_id + 7 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 6}"]`).firstChild||

                                    
                                    start_id - 2 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild||
                                    start_id - 3 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild||
                                    start_id - 4 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 3}"]`).firstChild||
                                    start_id - 5 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 4}"]`).firstChild||
                                    start_id - 6 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 5}"]`).firstChild||
                                    start_id - 7 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 6}"]`).firstChild
                                    )
                                    {
                                        target.parentNode.append(dragged)
                                        target.append(dragged)
                                    }else
                                    if(start_id + width === target||Idstart_id - width === targetId||start_id - 1 === targetId|| start_id + 1 === targetId)
                                    {
                                        e.target.parentNode.append(dragged)
                                        e.target.remove()   
                                    }
                                    break;
                                    case 'queen_b':
                                       if (
                                            
                            start_id + width * 2 + 2 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild||
                            start_id + width * 3 + 3 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild||
                            start_id + width * 4 + 4 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild ||
                            start_id + width * 5 + 5 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 + 4}"]`).firstChild||
                            start_id + width * 6 + 6 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5 + 5}"]`).firstChild||
                            start_id + width * 7 + 7 === targetId && !document.querySelector(`[tile-id="${start_id + width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5 + 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 6 + 6}"]`).firstChild||

                            
                            start_id - width * 2 - 2 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild||
                            start_id - width * 3 - 3 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild||
                            start_id - width * 4 - 4 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild ||
                            start_id - width * 5 - 5 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 - 4}"]`).firstChild||
                            start_id - width * 6 - 6 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5 - 5}"]`).firstChild||
                            start_id - width * 7 - 7 === targetId && !document.querySelector(`[tile-id="${start_id - width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5 - 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 6 - 6}"]`).firstChild||

                            
                            start_id - width * 2 + 2 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild||
                            start_id - width * 3 + 3 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild||
                            start_id - width * 4 + 4 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild ||
                            start_id - width * 5 + 5 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 + 4}"]`).firstChild||
                            start_id - width * 6 + 6 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5 + 5}"]`).firstChild||
                            start_id - width * 7 + 7 === targetId && !document.querySelector(`[tile-id="${start_id - width + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2 + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3 + 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id - width * 4 + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5 + 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 6 + 6}"]`).firstChild||

                            
                            start_id + width * 2 - 2 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild||
                            start_id + width * 3 - 3 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild||
                            start_id + width * 4 - 4 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild ||
                            start_id + width * 5 - 5 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 - 4}"]`).firstChild||
                            start_id + width * 6 - 6 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5 - 5}"]`).firstChild||
                            start_id + width * 7 - 7 === targetId && !document.querySelector(`[tile-id="${start_id + width - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2 - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3 - 3}"]`).firstChild  && !document.querySelector(`[tile-id="${start_id + width * 4 - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5 - 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 6 - 6}"]`).firstChild||

                            
                                    start_id + width * 2 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild||
                                    start_id + width * 3 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild||
                                    start_id + width * 4 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3}"]`).firstChild||
                                    start_id + width * 5 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 4}"]`).firstChild||
                                    start_id + width * 6 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5}"]`).firstChild||
                                    start_id + width * 7 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + width * 6}"]`).firstChild||
                                    
                                    
                                    start_id - width * 2 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild||
                                    start_id - width * 3 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild||
                                    start_id - width * 4 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3}"]`).firstChild||
                                    start_id - width * 5 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 4}"]`).firstChild||
                                    start_id - width * 6 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5}"]`).firstChild||
                                    start_id - width * 7 === targetId && !document.querySelector(`[tile-id="${start_id + width}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - width * 6}"]`).firstChild||
                                    
                                    
                                    start_id + 2 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild||
                                    start_id + 3 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild||
                                    start_id + 4 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 3}"]`).firstChild||
                                    start_id + 5 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 4}"]`).firstChild||
                                    start_id + 6 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 5}"]`).firstChild||
                                    start_id + 7 === targetId && !document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id + 6}"]`).firstChild||

                                    
                                    start_id - 2 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild||
                                    start_id - 3 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild||
                                    start_id - 4 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 3}"]`).firstChild||
                                    start_id - 5 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 4}"]`).firstChild||
                                    start_id - 6 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 5}"]`).firstChild||
                                    start_id - 7 === targetId && !document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 2}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 3}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 4}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 5}"]`).firstChild && !document.querySelector(`[tile-id="${start_id - 6}"]`).firstChild
                                    )
                                    {
                                        target.parentNode.append(dragged)
                                        target.append(dragged)
                                        
    
                                    }
                                    
                                    break;
                                    case 'king_b':
                                        
                                        if(start_id + 1 === targetId && document.querySelector(`[tile-id="${start_id + 1}"]`).firstChild ||
                                          start_id - 1 === targetId && document.querySelector(`[tile-id="${start_id - 1}"]`).firstChild ||
                                          start_id + width === targetId && document.querySelector(`[tile-id="${start_id + width}"]`).firstChild ||
                                          start_id - width === targetId && document.querySelector(`[tile-id="${start_id - width}"]`).firstChild ||
                                          start_id + width + 1 === targetId && document.querySelector(`[tile-id="${start_id +width + 1}"]`).firstChild ||
                                          start_id + width - 1 === targetId && document.querySelector(`[tile-id="${start_id + width-1}"]`).firstChild ||
                                          start_id - width + 1 === targetId && document.querySelector(`[tile-id="${start_id -width + 1}"]`).firstChild ||
                                          start_id - width - 1 === targetId && document.querySelector(`[tile-id="${start_id -width - 1}"]`).firstChild 
                                          )
                                        {
                                            target.parentNode.append(dragged)
                                            e.target.remove()
                                        }
        }
        

          
    }


  
    // e.target.parentNode.append(dragged)
    // e.target.remove()
    // e.target.append(dragged)
    win()
    changeplayer()
    
    function changeplayer()
    {
        if(player_move==="white"){
            
            revert();
            player_move = "black"
            player.textContent = 'black'
            
        }else{
            
            reverse();
            player_move="white"
            player.textContent='white'
        }
    

    function reverse(){
        const tiles=document.querySelectorAll(".tile")
        tiles.forEach((tile,i)=>tile.setAttribute('tile-id',(width*width-1)-i))
    }

    function revert(){
        const tiles = document.querySelectorAll(".tile")
        tiles.forEach((tile,i)=>tile.setAttribute('tile-id',i))
    }
    function win(){
        const king_b=Array.from(document.querySelectorAll('#king_b'))
        console.log(kings)
        if(!kings.some(king => king.firstChild.classList.contains('white'))){
            info.innerHTML = "Black Wins"
            const tiles = document.querySelectorAll('.tile')
            tiles.forEach(tile => tile.firstChild?.setAttribute('draggable',false))
        }
        if(!kings.some(king => king.firstChild.classList.contains('black'))){
            info.innerHTML = "White Wins"
            const tiles = document.querySelectorAll('.tile')
            tiles.forEach(tile => tile.firstChild?.setAttribute('draggable',false))
        }

    }
}

    }

}

create_board()



