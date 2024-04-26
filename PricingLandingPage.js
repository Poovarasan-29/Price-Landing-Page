const footerOkBtn = document.getElementById('footerOkBtn')
const freePlanBtn = document.getElementById('freePlanBtn')
const images = document.querySelectorAll('#images')
let planActivated = document.getElementById('planActivated')
const selectPlanBtnForPay = document.querySelectorAll('#selectPlanBtnForPay')
let payBtn = document.getElementById('payBtn')
const cancelBtn = document.getElementById('cancelBtn')
const selectUPIapp = document.getElementById('selectUPIapp')
const paymentProcessing = document.getElementById('paymentProcessing')
const planActivatedMessage = document.getElementById('planActivatedMessage')
const selectPage = document.getElementById('selectPage')
let planName = document.getElementById('planName')
const planAlreadyActivated = document.getElementById('planAlreadyActivated')




const planBtnRateWithIndex = { '20': 0, '192': 1, '50': 2, '480': 3, '1600': 4 }
var planActivationStatus = false
var freePlanActivate = true
var buyedPlanName;



footerOkBtn.addEventListener('click', () => {
    const newUserAlertMsg = document.getElementById('newUserAlertMsg')
    newUserAlertMsg.style.animationName = "slideTopToBottom"
    newUserAlertMsg.style.animationDuration = '.7s'
})



freePlanBtn.addEventListener('click', () => {
    if (planActivationStatus == false) {
        if (freePlanActivate) {
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

                let days = document.getElementById('days')
                let hours = document.getElementById('hours')
                let minutes = document.getElementById('minutes')
                let seconds = document.getElementById('seconds')

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
    else {
        planAlreadyActivated.style.display = 'flex'
        setTimeout(() => {
            planAlreadyActivated.style.display = 'none'
        }, 2000)
    }

})



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
    else {
        planActivationStatus = false
        clearInterval(4)
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




images.forEach(img => {
    img.addEventListener('click', () => {
        for (let index = 0; index < images.length; index++) {
            images[index].style.background = 'inherit'
        }
        img.style.background = 'limegreen'
        document.getElementById('showSelectError').style.display = 'none'
    })
})



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

cancelBtn.addEventListener('click', () => {
    selectUPIapp.style.display = 'none'
})



payBtn.addEventListener('click', () => {
    let index;
    for (index = 0; index < images.length; index++) {
        if (images[index].style.background == 'limegreen') {
            console.log("Inseide Image LiemGreen");
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
                    let planDays = planBtnRateWithIndex[payBtn.value] == 0 || planBtnRateWithIndex[payBtn.value] == 2 ? 28 : 365;

                    if (planDays == 365) {
                        selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].classList.remove('yearlyPlanBtn')
                    }
                    selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].title = "DD:HH:MM:SS";
                    selectPlanBtnForPay[planBtnRateWithIndex[payBtn.value]].innerHTML = `<span id='days'>${planDays - 1}</span>:<span id='hours'>23</span>:<span id='minutes'>59</span>:<span id='seconds'>59</span>`
                    let days = document.getElementById('days')
                    let hours = document.getElementById('hours')
                    let minutes = document.getElementById('minutes')
                    let seconds = document.getElementById('seconds')
                    setInterval(planValidityTimer, 1000, days, hours, minutes, seconds, 1)
                }


            }, 5000)
            break;
        }

    }
    if (index > 2) {
        document.getElementById('showSelectError').style.display = 'inline'
    }
})
