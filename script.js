let startBtn = document.querySelector(".controls span");

startBtn.addEventListener("click", function() {
    let yourName = prompt("Whats your name ?");

    if(yourName == "" || yourName == null) {
        document.querySelector(".name span").innerHTML = "Unknown Player";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".controls").remove();
});

let duration = 1000;

let container = document.querySelector(".container");
let blocks = Array.from(container.children);
let orderRange = [...Array(blocks.length).keys()];

//shuffle the orders
shuffle(orderRange);


blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click", function() {
        flipBlock(block);
    });
});


function flipBlock(block) {
    block.classList.add("is-flipped");
    //collect all flipped cards
    let allFlippedBlocks = blocks.filter((flippedBlock) => {
        return flippedBlock.classList.contains("is-flipped");
    })
    //if there are 2 selected blocks
    if(allFlippedBlocks.length === 2) {
        //stop clicking function
        stopClicking();
        //check matched block function
        checkMatchingBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
};

function stopClicking() {
    container.classList.add("no-clicking");

    setTimeout(() => {
        container.classList.remove("no-clicking");
    }, duration);
};

function checkMatchingBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("matching");
        secondBlock.classList.add("matching");

        document.getElementById("success").play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);

        document.getElementById("fail").play();
    }
};

function shuffle(array) {
    let current = array.length;
    let temp;
    let random;

    while (current > 0) {
        //get random element
        random = Math.floor(Math.random() * current);
        //decrease length by 1
        current--;
        //save current element in stash
        temp = array[current];
        //current element = random element
        array[current] = array[random];
        //random element = get element from stash
        array[random] = temp;
    }

    return array;
};