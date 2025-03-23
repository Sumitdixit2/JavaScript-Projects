const letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];

for (let i = letters.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]]; 
}

document.querySelectorAll('.card-back').forEach((card, index) => {
    card.textContent = letters[index];
});

function flipAllCardBacks() {
    document.querySelectorAll('.card-back').forEach(cardBack => {
        cardBack.style.transform = 'rotateY(180deg)';
    });
}

let score = 0;
let response = [];
let selectedCards = [];
let canClick = true; 


function handleCardClick() {
    if (!canClick || selectedCards.includes(this)) return; 

    const cardBack = this.querySelector('.card-back');
    const cardFront = this.querySelector('.card-front');


    cardBack.style.transform = 'rotateY(0deg)';
    cardFront.style.transform = 'rotateY(180deg)';


    response.push(cardBack.textContent);
    selectedCards.push(this);

 
    if (response.length === 2) {
        canClick = false; 

        setTimeout(() => {
            if (response[0] === response[1]) {
                
                score++;
                selectedCards.forEach(card => card.removeEventListener('click', handleCardClick));
            } else {
                
                selectedCards.forEach(card => {
                    let back = card.querySelector('.card-back');
                    let front = card.querySelector('.card-front');
                    back.style.transform = 'rotateY(180deg)';
                    front.style.transform = 'rotateY(0deg)';
                });
            }
            
            response = [];
            selectedCards = [];
            canClick = true; 
        }, 1000);
    }
}


setTimeout(flipAllCardBacks, 1500);


document.querySelectorAll('.card').forEach(card => {
    card.addEventListener("click", handleCardClick);
});
