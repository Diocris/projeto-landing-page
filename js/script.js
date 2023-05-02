const select = (el) => { return document.querySelector(el) };
const selectAll = (el) => { return document.querySelectorAll(el) }
const root = document.querySelector(":root")

window.addEventListener("load", () => {
//! Nav bar start
    const navBttn = select(".nav-card-button")
    navBttn.addEventListener("click", ()=>{
        const secondSec = select(".second-section").getBoundingClientRect().top
        window.removeEventListener("scroll", animScroll)
        window.scrollTo(0 , secondSec)
    })
//! Nav bar end
    const autoChange = select(".auto-change")
    const changePhrases = ["YOU","ALL","FUTURE"]

    function autoChangeFunc(num) {
        setInterval(() => {
            autoChange.innerHTML = changePhrases[0]
            setTimeout(() => {
                autoChange.innerHTML = changePhrases[1]
            }, num/3*1);
            setTimeout(() => {
                autoChange.innerHTML = changePhrases[2]
            }, num/3*2);
        }, num);
    
           
    }

    autoChangeFunc(3000)
//! Hero start

//-- Set cards hero randomly position - start

    const heroXPositive = select(".hero").getBoundingClientRect().width
    const heroXNegative = -(select(".hero").getBoundingClientRect().width)

    const heroYNegativeMax = select(".hero").getBoundingClientRect().height / 2
    const heroYNegativeMin = (select(".hero").getBoundingClientRect().height / 2) * -1

    const deckHolder = select(".deck-holder")


    //? set how many cards is going to be created - start

    function cardCreator(x) {
        for (let i = 0; i <= x; i++) {
            const newCard = document.createElement("div")
            newCard.classList.add("card-hero")
            deckHolder.append(newCard)
        }
    }
    cardCreator(16)

    //? set how many cards is going to be created - end


    //? set new POS to the cards - start

    const spreadedCards = Array.from(selectAll(".card-hero"))

    function sortPosHero(elem) {
        for (let i = 0; i < elem.length; i++) {
            const limitX = Math.random() * (heroXPositive - heroXNegative) + heroXNegative + "px"
            const limitY = (Math.random() * (heroYNegativeMax - heroYNegativeMin) + heroYNegativeMin) + "px"

            const rotate = Math.random() * 360 + "deg"
            elem[i].style.transform = `translate(${limitX},${limitY}) rotate(${rotate})`

        }

    }
    sortPosHero(spreadedCards)

    //? set new POS to the cards - end

//-- Set cards hero randomly position - end

//-- Set functions to animation works - start

    const primaryButton = select(".primary-button")
    const windowScroll = select(".nav-bar").getBoundingClientRect().height + select(".hero").getBoundingClientRect().height
    const body = select('body')
    const nav = select(".nav-bar")
    let navTop;

//? First animation function, when button is clicked or when user does Y scroll, actives, givng the card the original/initial position, also after this first step, removes those initials functions and adds the second part functions for animation.


    function animScroll(e) {
        navTop = nav.getBoundingClientRect().y

        if (navTop <= -100 && navTop >= -(select(".hero").getBoundingClientRect().height / 2)) {
            body.style.overflow = "hidden"
            setTimeout(() => {
                body.style.overflow = "initial"
            }, 2000);
            for (let i = 0; i < spreadedCards.length; i++) {
                spreadedCards[i].style.transform = `translate(0,0)`
            }
            window.removeEventListener("scroll", animScroll)
            window.addEventListener("scroll", cardMove)
        }
    }

    //
//? first animation function - end

//? second animation function, after a second click or a little more scroll Y, send the ammounted deck to the first section, after a delay also guides the user window to have this section con his 100% viewport, also removing itself avoiding visual and user bugs.

    function cardMove() {
        navTop = nav.getBoundingClientRect().y
        if (navTop <= -200) {
            body.style.overflow = "hidden"
            setTimeout(() => {
                for (let i = 0; i < spreadedCards.length; i++) {
                    spreadedCards[i].style.transition = `all 400ms ease-in`
                    spreadedCards[i].style.transform = `translate(0,700px)`
                }
            }, 100);
        
            setTimeout(() => {
                for (let i = 0; i < spreadedCards.length; i++) {
                    spreadedCards[i].style.display = "none"
                }
                
                window.removeEventListener("scroll", cardMove)
                setTimeout(() => {
                    window.scrollTo(0, windowScroll)
                    setTimeout(() => {
                        body.style.overflow = "initial"
                    }, 200);
                }, 600);
            }, 400);
        }
    }

//? second function - end
//? click anim function - start

function animClick() {
    window.removeEventListener("scroll", animScroll)
    body.style.overflow = "hidden"
    for (let i = 0; i < spreadedCards.length; i++) {
    spreadedCards[i].style.transition = "all 400ms linear"
    spreadedCards[i].style.transform = `translate(0,0)`
    }

    setTimeout(() => {
        for (let i = 0; i < spreadedCards.length; i++) {
            spreadedCards[i].style.transition = `all 400ms ease-in`
            spreadedCards[i].style.transform = `translate(0,700px)`
        }
        body.style.overflow = "initial"

        setTimeout(() => {
            for (let i = 0; i < spreadedCards.length; i++) {
    
                       spreadedCards[i].style.display = "none"
            }
     
            window.scrollTo(0, windowScroll)
        }, 800);
    }, 600);

}

    window.addEventListener("scroll", animScroll)
    primaryButton.addEventListener("click", animClick)

    //-- Set functions to animation works - end

//! Hero end

//! First Section - Mobile and Desktop functions

//-- First setting ups, its display or not the properly first section according to the user screen width.
    const firstSection = select(".first-section")
    firstSection.style.display = "none"
    const firstSectionDesktop = select(".first-section-desktop")

    const screenWidth = window.matchMedia("(max-width: 768px)")

    window.addEventListener("resize", () => {
        match(screenWidth)
    })
    function match(X) {
        if (X.matches) {
            firstSection.style.display = "grid"
            firstSectionDesktop.style.display = "none"
        } else {
            firstSection.style.display = "none"
            firstSectionDesktop.style.display = "grid"
        }
        primaryButton.addEventListener("click", ()=>{
            window.scrollTo(0, select(".text-section-1").getBoundingClientRect().top)
        })
    }

    match(screenWidth)

//-- first settings - end

//-- First desktop -- MOBILE start

//? First section mobile function to change the text according to the item who is beeing hovered.
  

        const cards = document.getElementsByClassName('card-item')
        const cardName = document.getElementById("card-name")
        const cardDetails = document.getElementById("card-details")
        const buttonCardMobile = selectAll(".button-card-mobile")
        const cardMobile = selectAll(".card-item")

    function mobileFirstSec(array) {
        for (let i = 0; i <array.length; i++) {
            array[i].addEventListener("click", () => {
                if (!cardMobile[i].classList.contains("card-clicked")) {
                    for (let k = 0; k < 3; k++) {
                        cardMobile[k].classList.remove("card-clicked")
                    }
                    cardMobile[i].classList.toggle("card-clicked")
                }
            })
        }
        for (let i = 0; i < array.length; i++) {
            array[i].addEventListener("click", () => {
                cardName.innerText = headings[i]
                cardDetails.innerText = paragraphs[i]
            })
        }
    }


    mobileFirstSec(buttonCardMobile)
    mobileFirstSec(cards)

//-- First desktop -- MOBILE end

//-- First desktop -- DESKTOP start

    //create all consts that will be used.
    const cardDeck = Array.from(selectAll(".card-deck"))
    const buttonsCard = Array.from(selectAll(".button-holder button"))
    const cardsHolder = select(".card-holder")
    const frontFaces = Array.from(selectAll(".front-face-anim"))
    const backFaces = Array.from(selectAll(".back-face-anim"))
    let holderHalfHeight = (cardsHolder.getBoundingClientRect().height / 2) + "px"

    window.addEventListener("resize", () => {
        root.style.setProperty(`--pos--card`, `0 ,${holderHalfHeight}`)
    })

    //set first part
    buttonsCard[0].setAttribute("disabled", "true")
    buttonsCard[0].classList.add("button-card-actived")
    frontFaces[0].style = `rotateY(90deg)`
    backFaces[0].style = `rotateY(360deg)`
    //creates a new css property that will define where the cards are supposed to go when activateds
    root.style.setProperty(`--pos--card`, `0 ,${holderHalfHeight}`)

    
        
    //initalize a fot looping for buutons
    for (let i = 0; i < buttonsCard.length; i++) {
        //each button click initiates the functions
        buttonsCard[i].addEventListener("click", () => {

            //able all buttons
            function ableButtons() {
                for (const button of buttonsCard) {
                    button.removeAttribute("disabled")
                }
            }

            //add classes to set up animations
            function addClasses() {
                cardDeck[i].classList.add("card-float", "actived", "z-3")
                buttonsCard[i].setAttribute("disabled", "true")
            }

            //disable all buttons when one is clicked
            function disableButton() {
                for (const button of buttonsCard) {
                    button.classList.remove("button-card-actived")
                    button.setAttribute("disabled", "true")
                }
            }
            //animations sets
            function animations() {
                buttonsCard[i].classList.add("button-card-actived")
                setTimeout(() => {
                    cardDeck[i].style.transform = `translate(0, ${holderHalfHeight})`

                }, 800);

                setTimeout(() => {
                    frontFaces[i].style.transform = `rotateY(90deg)`
                    backFaces[i].style.transform = `rotateY(360deg)`
                    ableButtons()
                    cardDeck[i].classList.remove("card-float")
                    cardDeck[i].classList.remove("z-3")
                    buttonsCard[i].setAttribute("disabled", "true")
                }, 1400);

            }
            //animations resets
            function resetAnim() {
                const activedCard = Array.from(selectAll(".actived"))
                for (const actived of activedCard) {
                    actived.style.transform = `translate(0,0)`
                }
                for (const front of frontFaces) {
                    front.style.transform = `rotateY(0deg)`
                }
                for (const back of backFaces) {
                    back.style.transform = `rotateY(90deg)`
                }

            }


            addClasses()
            disableButton()
            animations()
            resetAnim()

        })

    }
    


    const buttons = Array.from(selectAll(".button-card"))
    const h = select(".h-change")
    const p = select(".p-change")
    const headings = [`Star Card`, `Moon Card`, `Sun Card`]
    const paragraphs = [
        `No annual fee;
        Accepted worldwide;
        Protection against fraud and theft;
        Option to add up to 3 additional cards for free.
        `,
        `All the benefits of the Star Card;
        1% cashback on all purchases;
        Access to exclusive promotions on travel, hotels, and restaurants;
        24-hour concierge service for reservations and suggestions.
        `,
        `All the benefits of the Moon and Star Card;
        2% cashback on all purchases;
        Rewards program with points that can be redeemed for travel, electronics, and other products;
        Free travel insurance;
        Priority boarding and check-in on selected flights.`
    ]

    function textChange() {
        
    for (let i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("click", () => {

            h.innerText = headings[i]
            p.innerText = paragraphs[i]
        }
        )
    }
   }

   

   textChange()




//-- First desktop -- DESKTOP end

//! First Section - Mobile and Desktop functions end


//! Second Section - Start
    const eyeHolder = select(".eye-holder")
   const sliders = selectAll(".open-acc-holder")
   const nextBttn = selectAll(".next")
   const nextFake = select(".next-fake")
   const openSign = select("#open-sign")
   const previousBttn = selectAll(".previous")
   const previousMain = select(".previous-main")
   const accButton = select(".open-acc-button")


   previousMain.addEventListener("click", ()=>{
        eyeHolder.classList.toggle("open-acc-desactived")
        sliders[0].classList.toggle("open-acc-desactived")   
   })

   for (let i = 0; i < nextBttn.length -1 ; i++) {
    nextBttn[i].addEventListener("click", ()=>{
        sliders[i].classList.add("open-acc-desactived")
        sliders[i+1].classList.remove("open-acc-desactived")
    } )
   }

   for (let i = 0; i < previousBttn.length; i++) {
    previousBttn[i].addEventListener("click", (e)=>{
        sliders[i+1].classList.add("open-acc-desactived")
        sliders[i].classList.remove("open-acc-desactived")
    } )
   }
function openRegisterForm() {
    
    eyeHolder.classList.toggle("open-acc-desactived")
    sliders[0].classList.toggle("open-acc-desactived")
    eyeHolder.classList.add("open-acc-desactived")
}

   accButton.addEventListener("click", openRegisterForm)
   
   let countClickFake = 0
   nextFake.addEventListener("click", ()=>{
    countClickFake += 1  
    checkValue = openSign.value.toLowerCase()
    if(countClickFake === 0 && checkValue !== "gemini" || checkValue !== "gemeos" || checkValue !== "gêmeos"){
        openSign.value = "" 
        openSign.placeholder = "Not a gemini"
    }
    if (countClickFake >= 2 || checkValue === "gemini" || checkValue === "gemeos" || checkValue === "gêmeos"){
        alert("I'm sorry to say, the universe has other plans for you. This form is faker than a politician promise, my tarot cards are saying 'not today, my friend.' Even if you're a lovely Gemini, I'm afraid I can't work my magic on this one. ")
        
    
    }
   })

   select(".form-button").addEventListener("click", ()=>{
    alert("Well, I'm pretty sure you don't need the cards to see that it's just a project with no backend involved. So hopefully, the cards will tell me that you tried to contact me.")
   })

// //    }
  
  

  
  
//! Second Section - End
})




