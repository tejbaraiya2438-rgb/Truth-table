/* =========================================
   TRUTH TABLE WORKING MODEL
========================================= */

let cableConnected = false; // A
let currentFlowing = false; // B


/* DOM */

const cableSwitch = document.getElementById("cableSwitch");
const currentSwitch = document.getElementById("currentSwitch");

const valueA = document.getElementById("valueA");
const valueB = document.getElementById("valueB");

const andResult = document.getElementById("andResult");
const orResult = document.getElementById("orResult");

const cable = document.getElementById("cable");

const bulb = document.getElementById("bulb");
const bulbStatus = document.getElementById("bulbStatus");

const resultMessage = document.getElementById("resultMessage");
const circuitState = document.getElementById("circuitState");

const activeCombination =
    document.getElementById("activeCombination");

const cableCondition =
    document.getElementById("cableCondition");

const currentCondition =
    document.getElementById("currentCondition");


const rows = {
    "00": document.getElementById("row-00"),
    "01": document.getElementById("row-01"),
    "10": document.getElementById("row-10"),
    "11": document.getElementById("row-11")
};


/* =========================================
   UPDATE MODEL
========================================= */

function updateModel() {

    const A = cableConnected ? 1 : 0;
    const B = currentFlowing ? 1 : 0;

    const AND = A && B;
    const OR = A || B;

    const bulbOn = AND === 1;


    /* VALUES */

    valueA.textContent = A;
    valueB.textContent = B;

    andResult.textContent = AND;
    orResult.textContent = OR;

    activeCombination.textContent =
        `A=${A}, B=${B}`;


    /* TRUTH TABLE */

    Object.values(rows).forEach(row => {
        row.classList.remove("active-row");
    });

    const activeRow = rows[`${A}${B}`];

    if (activeRow) {
        activeRow.classList.add("active-row");
    }


    /* CABLE */

    cable.classList.toggle(
        "connected",
        cableConnected
    );


    /* CABLE CONDITION */

    cableCondition.textContent =
        cableConnected
            ? "Connected"
            : "Not Connected";


    /* CURRENT CONDITION */

    currentCondition.textContent =
        currentFlowing
            ? "Current Flowing"
            : "No Current";


    /* BULB */

    bulb.classList.toggle(
        "glowing",
        bulbOn
    );


    if (bulbOn) {

        bulbStatus.textContent = "BULB ON";
        circuitState.textContent = "ON";

        resultMessage.textContent =
            "A = 1 and B = 1 → AND = 1 → Bulb ON 💡";

    } else {

        bulbStatus.textContent = "BULB OFF";
        circuitState.textContent = "OFF";


        if (!cableConnected && !currentFlowing) {

            resultMessage.textContent =
                "A = 0, B = 0 → AND = 0 → Bulb OFF.";

        } else if (!cableConnected && currentFlowing) {

            resultMessage.textContent =
                "A = 0, B = 1 → OR = 1 but AND = 0 → Bulb OFF.";

        } else {

            resultMessage.textContent =
                "A = 1, B = 0 → OR = 1 but AND = 0 → Bulb OFF.";
        }
    }


    /* SWITCH UI */

    updateSwitch(
        cableSwitch,
        cableConnected,
        "CONNECTED",
        "DISCONNECTED"
    );

    updateSwitch(
        currentSwitch,
        currentFlowing,
        "CURRENT ON",
        "OFF"
    );
}


/* =========================================
   SWITCH UI
========================================= */

function updateSwitch(
    button,
    active,
    activeText,
    inactiveText
) {

    button.classList.toggle(
        "active",
        active
    );

    button.setAttribute(
        "aria-pressed",
        active
    );

    const status =
        button.querySelector(".switch-status");

    status.textContent =
        active
            ? activeText
            : inactiveText;
}


/* =========================================
   CABLE SWITCH
========================================= */

cableSwitch.addEventListener("click", () => {

    cableConnected = !cableConnected;

    updateModel();
});


/* =========================================
   CURRENT SWITCH
========================================= */

currentSwitch.addEventListener("click", () => {

    currentFlowing = !currentFlowing;

    updateModel();
});


/* =========================================
   INITIAL STATE
========================================= */

updateModel();
