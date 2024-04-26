// Elements take from HTML
const footerOkBtn = document.getElementById('footerOkBtn')
const freePlanBtn = document.getElementById('freePlanBtn')
const images = document.querySelectorAll('#images')
const selectPlanBtnForPay = document.querySelectorAll('#selectPlanBtnForPay')
const payBtn = document.getElementById('payBtn')
const cancelBtn = document.getElementById('cancelBtn')
const selectUPIapp = document.getElementById('selectUPIapp')
const paymentProcessing = document.getElementById('paymentProcessing')
const planActivatedMessage = document.getElementById('planActivatedMessage')
const selectPage = document.getElementById('selectPage')
const planName = document.getElementById('planName')
const planAlreadyActivated = document.getElementById('planAlreadyActivated')



// Plan Rate and that Button index
const planBtnRateWithIndex = { '20': 0, '192': 1, '50': 2, '480': 3, '1600': 4 }
var planActivationStatus = false // Track Plan is Activate or Inactivate
var freePlanActivate = true // Free plan Activate Availablity check
var buyedPlanName; // Get the buyed Plan name for displaying in Plan Activated Message


// Close the Footer Information using [ OK ] button
footerOkBtn.addEventListener('click', () => {
    const newUserAlertMsg = document.getElementById('newUserAlertMsg')
    newUserAlertMsg.style.animationName = "slideTopToBottom"
    newUserAlertMsg.style.animationDuration = '.7s'
})


// EventListener for clicking the Free Plan Button
freePlanBtn.addEventListener('click', () => {
    if (planActivationStatus == false) { // Check : Other plan is Already Activated or Inactivated
        if (freePlanActivate) { // Check : Free plan is Already Activated or Inactivated
            planActivationStatus = true
            freePlanActivate = false
            selectUPIapp.style.display = 'flex'
            selectUPIapp.style.width = '50%'
            paymentProcessing.style.display = 'flex'
            planActivatedMessage.style.display = 'none'
            selectPage.style.display = 'none'
            payBtn.value = 'Free'
            setTimeout(() => {
                paymentProcessing.style.display = 'none'
                planActivatedMessage.style.display = 'flex'
                planName.innerText = `${payBtn.value}`
                setTimeout(() => {
                    selectUPIapp.style.display = 'none'
                }, 2000)
            }, 3000)

            setTimeout(() => {
                freePlanBtn.innerHTML = `<span id='days'>02</span>:<span id='hours'>23</span>:<span id='minutes'>59</span>:<span id='seconds'>59</span>`
                freePlanBtn.title = "DD:HH:MM:SS"

                const days = document.getElementById('days')
                const hours = document.getElementById('hours')
                const minutes = document.getElementById('minutes')
                const seconds = document.getElementById('seconds')

                for (let index = 0; index <= 4; index++) {
                    selectPlanBtnForPay[index].parentElement.style.background = 'white'
                }

                freePlanBtn.parentElement.style.backgroundImage = "url('./Images/activated.png')"
                freePlanBtn.parentElement.style.backgroundSize = 'contain'
                freePlanBtn.parentElement.style.objectFit = 'cover'
                freePlanBtn.parentElement.style.backgroundPosition = 'center'
                freePlanBtn.parentElement.style.backgroundRepeat = 'no-repeat'
                freePlanBtn.parentElement.style.backgroundBlendMode = 'hard-light'


                setInterval(planValidityTimer, 1000, days, hours, minutes, seconds, 0)
            }, 4000)

        }
    }
    else { // If any plan is Already Activated Show the Information (Plan Already Activated)
        planAlreadyActivated.style.display = 'flex'
        setTimeout(() => {
            planAlreadyActivated.style.display = 'none'
        }, 2000)
    }

})


// Function for calculate or display Remaining time for That user choosen plan [DAYS:HOURS:MINUTES:SECONDS]
function planValidityTimer(days, hours, minutes, seconds, checks) {

    if (days.innerText > 0 || hours.innerText > 0 || minutes > 0) {

        if (seconds.innerText == 0) {
            if (minutes.innerText > 0) {
                if (minutes.innerText <= 10) {
                    minutes.innerText = `0${minutes.innerText - 1}`
                } else {
                    minutes.innerText -= 1
                }
                seconds.innerText = 59
            }
            else if (hours.innerText > 0) {
                if (hours.innerText <= 10) {
                    hours.innerText = `0${hours.innerText - 1}`
                } else {
                    hours.innerText -= 1
                }
                minutes.innerText = 59
                seconds.innerText = 59
            }
            else {
                if (days.innerText <= 10) {
                    days.innerText = `0${days.innerText - 1}`
                }
                else {
                    days.innerText -= 1
                }

                hours.innerText = 23
                minutes.innerText = 59
                seconds.innerText = 59
            }

        }
        else if (seconds.innerText <= 10) {
            seconds.innerText = `0${seconds.innerText - 1}`
        } else {
            seconds.innerText -= 1
        }
    }
    else if (seconds.innerText > 0) {
        if (seconds.innerText <= 10)
            seconds.innerText = `0${seconds.innerText - 1}`
        else
            seconds.innerText -= 1
    }
    else { // If the Plan is Expired or Ended show some Information [Plan Expired]
        planActivationStatus = false
        clearInterval(4) // If Plan is Expired clear the setInterval()
        if (checks == 1) {
            selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].parentElement.style.backgroundImage = "url('./Images/completed.png')"
            selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].innerHTML = buyedPlanName;

        }
        else {
            freePlanBtn.innerHTML = `<h4 style='color:orangered;'>Plan Expired</h4>`
            freePlanBtn.parentElement.style.backgroundImage = "url('./Images/completed.png')"
        }
    }

}


// Choose the Payment app with Background color (limegreen) 
// [ IMPORTANT ]* if we change the Image background color in CSS then must chenge the color here
images.forEach(img => {
    img.addEventListener('click', () => {
        for (let index = 0; index < images.length; index++) {
            images[index].style.background = 'inherit'
        }
        img.style.background = 'limegreen'
        document.getElementById('showSelectError').style.display = 'none'
    })
})


// Track which Plan button is Selected
selectPlanBtnForPay.forEach(selectBtn => {
    selectBtn.addEventListener('click', () => {
        if (planActivationStatus) {
            planAlreadyActivated.style.display = 'flex'
            setTimeout(() => {
                planAlreadyActivated.style.display = 'none'
            }, 2000)
        } else {
            payBtn.innerHTML = `${selectBtn.innerHTML} `
            buyedPlanName = `${selectBtn.innerHTML} `
            payBtn.value = `${selectBtn.value}`
            payBtn.setAttribute('name', selectBtn.parentElement.firstElementChild.innerHTML)
            selectUPIapp.style.display = 'flex'
            selectUPIapp.style.width = '80%'
            selectPage.style.display = 'flex'
            paymentProcessing.style.display = 'none'
            planActivatedMessage.style.display = 'none'

        }

    })
})

// If click the cancel button ,we close the payment window
cancelBtn.addEventListener('click', () => {
    selectUPIapp.style.display = 'none'
})


// For Pay the amount
payBtn.addEventListener('click', () => {
    let index;
    for (index = 0; index < images.length; index++) {
        if (images[index].style.background == 'limegreen') {
            planActivationStatus = true; // Plan is Activated
            paymentProcessing.style.display = 'flex'
            selectUPIapp.style.width = '50%'
            selectPage.style.display = 'none'


            for (let index = 0; index <= 4; index++) {
                selectPlanBtnForPay[index].parentElement.style.background = 'white'
            }
            freePlanBtn.parentElement.style.background = "white" // ---- Remove Background Image


            selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].parentElement.style.backgroundImage = "url('./Images/activated.png')"
            selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].parentElement.style.backgroundSize = 'contain'
            selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].parentElement.style.objectFit = 'cover'
            selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].parentElement.style.backgroundPosition = 'center'
            selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].parentElement.style.objectFit = 'cover'
            selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].parentElement.style.backgroundRepeat = 'no-repeat'
            selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].parentElement.style.backgroundBlendMode = 'hard-light'

            setTimeout(() => {
                paymentProcessing.style.display = 'none'
                planActivatedMessage.style.display = 'flex'
                planName.innerText = `${payBtn.name}`
                setTimeout(() => {
                    selectUPIapp.style.display = 'none'
                }, 2000)
            }, 3000)

            setTimeout(() => {

                if (planBtnRateWithIndex[payBtn.value] == 4) {
                    selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].innerHTML = `<p style='color:limegreen;font-weight:bold;font-size:13px;letter-spacing:1px;'>Activated</p>`;
                }
                else {
                    let planDays = planBtnRateWithIndex[payBtn.value] == 0 || planBtnRateWithIndex[payBtn.value] == 2 ? 28 : 365; // Set Duration for selected Plan

                    if (planDays == 365) {
                        selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].classList.remove('yearlyPlanBtn')
                    }
                    selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].title = "DD:HH:MM:SS";
                    selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].innerHTML = `<span id='days'>${planDays - 1}</span>:<span id='hours'>23</span>:<span id='minutes'>59</span>:<span id='seconds'>59</span>`
                    const days = document.getElementById('days')
                    const hours = document.getElementById('hours')
                    const minutes = document.getElementById('minutes')
                    const seconds = document.getElementById('seconds')
                    setInterval(planValidityTimer, 1000, days, hours, minutes, seconds, 1)
                }
            }, 5000)
            break;
        }
    }
    // If the condition is True that time the user didn't select any UPI ,when show Error [Must Select UPI] 
    if (index > 2) { 
        document.getElementById('showSelectError').style.display = 'inline'
    }
})
