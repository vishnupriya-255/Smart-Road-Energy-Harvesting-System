/* =========================================
   PIEZOSENSE
   ENERGY HARVESTING & CONDITION MONITORING
========================================= */


/* =========================================
   INITIAL VALUES
========================================= */

let voltage = 0;

let capacitor = 2.18;

let pressureEvents = 0;


// Capacitor HEALTH is separate from
// capacitor stored voltage.

let capacitorCondition = 88;


// Piezo element health

const piezoHealth = [
    94,
    91,
    96,
    89,
    93,
    95
];


// Voltage history

const voltageHistory = [
    1.1,
    1.8,
    1.4,
    2.2,
    1.9,
    2.7,
    2.1,
    2.9,
    2.35
];



/* =========================================
   CREATE GRAPH
========================================= */

const ctx =
    document.getElementById("voltageChart");


const voltageChart =
    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09"
            ],

            datasets: [

                {
                    label:
                        "Harvested Voltage (V)",

                    data:
                        voltageHistory,

                    borderWidth: 2,

                    tension: 0.35,

                    pointRadius: 3,

                    fill: false
                }

            ]
        },


        options: {

            responsive: true,

            maintainAspectRatio: false,


            plugins: {

                legend: {

                    labels: {

                        boxWidth: 10,

                        font: {
                            size: 9
                        }
                    }
                }
            },


            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        font: {
                            size: 8
                        }
                    }
                },


                y: {

                    beginAtZero: true,

                    suggestedMax: 4,

                    title: {

                        display: true,

                        text:
                            "Voltage (V)",

                        font: {
                            size: 9
                        }
                    }
                }
            }
        }
    });



/* =========================================
   PIEZO ARRAY
========================================= */

function updatePiezoArray() {

    const container =
        document.getElementById(
            "sensorList"
        );


    if (!container) return;


    container.innerHTML = "";


    piezoHealth.forEach(
        (health, index) => {

            let status =
                "NOMINAL";

            let statusClass =
                "nominal";


            if (health < 75) {

                status =
                    "FAULT";

                statusClass =
                    "fault";

            }

            else if (health < 85) {

                status =
                    "WARNING";

                statusClass =
                    "warning";
            }


            container.innerHTML += `

                <div class="piezo">

                    <div class="piezo-name">
                        PIEZO ${index + 1}
                    </div>

                    <div class="
                        piezo-status
                        ${statusClass}
                    ">

                        ● ${status}

                    </div>

                    <div class="piezo-health">

                        ${health.toFixed(0)}%

                    </div>

                </div>

            `;
        }
    );
}



/* =========================================
   UPDATE DASHBOARD
========================================= */

let lastGraphUpdate = 0;


function updateDashboard() {


    /* =====================================
       HARVESTED VOLTAGE
    ===================================== */

    const voltageElement =
        document.getElementById(
            "voltage"
        );


    if (voltageElement) {

        voltageElement.textContent =
            voltage.toFixed(2);
    }



    /* =====================================
       STORED VOLTAGE
    ===================================== */

    const capacitorElement =
        document.getElementById(
            "capacitor"
        );


    if (capacitorElement) {

        capacitorElement.textContent =
            capacitor.toFixed(2);
    }


    const capCurrent =
        document.getElementById(
            "capCurrent"
        );


    if (capCurrent) {

        capCurrent.textContent =
            capacitor.toFixed(2) + " V";
    }



    /* =====================================
       PRESSURE EVENTS
    ===================================== */

    const footsteps =
        document.getElementById(
            "footsteps"
        );


    if (footsteps) {

        footsteps.textContent =
            pressureEvents;
    }



    /* =====================================
       PIEZO HEALTH
    ===================================== */

    const averageHealth =

        piezoHealth.reduce(
            (sum, value) =>
                sum + value,
            0
        )
        /
        piezoHealth.length;


    const piezoHealthElement =
        document.getElementById(
            "piezoHealth"
        );


    if (piezoHealthElement) {

        piezoHealthElement.textContent =
            Math.round(
                averageHealth
            );
    }



    /* =====================================
       CAPACITOR HEALTH
    ===================================== */

    const capacitorHealth =
        Math.round(
            capacitorCondition
        );


    const capHealth =
        document.getElementById(
            "capHealth"
        );


    if (capHealth) {

        capHealth.textContent =
            capacitorHealth;
    }



    /* =====================================
       CAPACITOR RING
    ===================================== */

    const capacitorRing =
        document.getElementById(
            "capacitorRing"
        );


    if (capacitorRing) {

        capacitorRing.style.background =

            `conic-gradient(
                #2ba49c
                ${capacitorHealth}%,

                #e3eaee
                0
            )`;
    }



    /* =====================================
       CAPACITOR STATUS
    ===================================== */

    const capStatus =
        document.getElementById(
            "capStatus"
        );


    if (capStatus) {

        if (capacitorHealth >= 75) {

            capStatus.textContent =
                "NOMINAL";

        }

        else if (capacitorHealth >= 50) {

            capStatus.textContent =
                "WARNING";

        }

        else {

            capStatus.textContent =
                "FAULT";
        }
    }



    /* =====================================
       SYSTEM HEALTH
    ===================================== */

    const systemHealth =

        Math.round(

            (
                averageHealth
                +
                capacitorHealth
            )
            /
            2
        );


    const systemHealthElement =
        document.getElementById(
            "systemHealth"
        );


    if (systemHealthElement) {

        systemHealthElement.textContent =
            systemHealth + "%";
    }



    /* =====================================
       OUTPUT METER
    ===================================== */

    const meter =
        document.getElementById(
            "meterFill"
        );


    const voltageLevel =
        document.getElementById(
            "voltageLevel"
        );


    let percentage =
        (voltage / 4) * 100;


    percentage =
        Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        );


    if (meter) {

        meter.style.width =
            percentage + "%";
    }


    if (voltageLevel) {

        if (voltage < 1.5) {

            voltageLevel.textContent =
                "LOW";

        }

        else if (voltage < 2.5) {

            voltageLevel.textContent =
                "NOMINAL";

        }

        else {

            voltageLevel.textContent =
                "HIGH";
        }
    }



    /* =====================================
       DIAGNOSTICS
    ===================================== */

    const diagnostic =
        document.getElementById(
            "diagnosticStatus"
        );


    const finalStatus =
        document.getElementById(
            "finalStatus"
        );


    if (
        averageHealth < 75 ||
        capacitorHealth < 50
    ) {

        if (diagnostic) {

            diagnostic.textContent =
                "FAULT";

            diagnostic.className =
                "fault";
        }


        if (finalStatus) {

            finalStatus.textContent =
                "SYSTEM REQUIRES INSPECTION";
        }

    }


    else if (
        averageHealth < 85 ||
        capacitorHealth < 75
    ) {

        if (diagnostic) {

            diagnostic.textContent =
                "WARNING";

            diagnostic.className =
                "warning";
        }


        if (finalStatus) {

            finalStatus.textContent =
                "SYSTEM OPERATING WITH CAUTION";
        }

    }


    else {

        if (diagnostic) {

            diagnostic.textContent =
                "NORMAL";

            diagnostic.className =
                "nominal";
        }


        if (finalStatus) {

            finalStatus.textContent =
                "SYSTEM OPERATING WITHIN EXPECTED RANGE";
        }
    }



    /* =====================================
       GRAPH UPDATE
    ===================================== */

    const nowMs =
        Date.now();


    if (
        nowMs -
        lastGraphUpdate >
        1000
    ) {

        voltageChart.data.labels.push(
            String(pressureEvents)
        );


        voltageChart
            .data
            .datasets[0]
            .data
            .push(
                Number(
                    voltage.toFixed(2)
                )
            );


        if (
            voltageChart
                .data
                .labels
                .length > 12
        ) {

            voltageChart
                .data
                .labels
                .shift();


            voltageChart
                .data
                .datasets[0]
                .data
                .shift();
        }


        voltageChart.update("none");


        lastGraphUpdate =
            nowMs;
    }



    /* =====================================
       LAST UPDATE
    ===================================== */

    const lastUpdate =
        document.getElementById(
            "lastUpdate"
        );


    if (lastUpdate) {

        lastUpdate.textContent =
            new Date()
                .toLocaleTimeString();
    }

}



/* =========================================
   VEHICLE + PRESSURE PLATE
========================================= */

const pressurePlate =
    document.getElementById(
        "pressurePlate"
    );


const vehicleStatus =
    document.getElementById(
        "vehicleStatus"
    );


const plateStatus =
    document.getElementById(
        "plateStatus"
    );


const roadEvents =
    document.getElementById(
        "roadEvents"
    );


const vehicle =
    document.getElementById(
        "vehicle"
    );


let vehicleWasOnPlate =
    false;



/* =========================================
   VEHICLE SIMULATION
========================================= */

function simulateVehicleAndHarvesting() {

    if (
        !vehicle ||
        !pressurePlate
    ) {
        return;
    }


    const carRect =
        vehicle.getBoundingClientRect();


    const plateRect =
        pressurePlate.getBoundingClientRect();


    const carCenter =
        carRect.left +
        carRect.width / 2;


    const plateLeft =
        plateRect.left;


    const plateRight =
        plateRect.right;


    const onPlate =

        carCenter >
        plateLeft - 15 &&

        carCenter <
        plateRight + 15;



    /* =====================================
       CAR ON PRESSURE PLATE
    ===================================== */

    if (onPlate) {

        pressurePlate.classList.add(
            "active"
        );


        if (vehicleStatus) {

            vehicleStatus.textContent =
                "ON PRESSURE PLATE";
        }


        if (plateStatus) {

            plateStatus.textContent =
                "PRESSING";
        }



        /* =================================
           NEW PRESSURE EVENT
        ================================= */

        if (!vehicleWasOnPlate) {

            vehicleWasOnPlate =
                true;


            /* Increase event counter */

            pressureEvents++;



            /* =================================
               PIEZOELECTRIC VOLTAGE
            ================================= */

            voltage =
                2.0 +
                Math.random() * 1.3;



            /* =================================
               STORE HARVESTED ENERGY
            =================================

               Every car crossing adds
               approximately 0.15 V.

               Maximum = 3.00 V.
            */

            capacitor =

                Math.min(
                    3.0,

                    capacitor +
                    0.15
                );



            /* =================================
               UPDATE CAPACITOR IMMEDIATELY
            ================================= */

            const capacitorElement =
                document.getElementById(
                    "capacitor"
                );


            const capCurrent =
                document.getElementById(
                    "capCurrent"
                );


            if (capacitorElement) {

                capacitorElement.textContent =
                    capacitor.toFixed(2);
            }


            if (capCurrent) {

                capCurrent.textContent =
                    capacitor.toFixed(2)
                    +
                    " V";
            }



            /* =================================
               SMALL PIEZO WEAR
            ================================= */

            piezoHealth.forEach(
                (health, index) => {

                    if (
                        Math.random() <
                        0.20
                    ) {

                        piezoHealth[index] =

                            Math.max(
                                60,

                                health - 0.1
                            );
                    }

                }
            );



            /* =================================
               SHOW EVENT
            ================================= */

            if (roadEvents) {

                roadEvents.textContent =
                    pressureEvents;
            }


            if (document.getElementById("footsteps")) {

                document.getElementById(
                    "footsteps"
                ).textContent =
                    pressureEvents;
            }


            updatePiezoArray();

            updateDashboard();

        }

    }



    /* =====================================
       CAR NOT ON PLATE
    ===================================== */

    else {

        pressurePlate.classList.remove(
            "active"
        );


        vehicleWasOnPlate =
            false;


        if (carCenter < plateLeft) {

            if (vehicleStatus) {

                vehicleStatus.textContent =
                    "APPROACHING";
            }

        }

        else {

            if (vehicleStatus) {

                vehicleStatus.textContent =
                    "DEPARTING";
            }
        }


        if (plateStatus) {

            plateStatus.textContent =
                "READY";
        }



        /* =================================
           VOLTAGE FALLS AFTER IMPACT
        ================================= */

        voltage =

            Math.max(
                0.65,

                voltage * 0.92
            );

    }



    /* =====================================
       UPDATE
    ===================================== */

    updatePiezoArray();

    updateDashboard();

}



/* =========================================
   RUN SENSOR CHECK
========================================= */

setInterval(
    simulateVehicleAndHarvesting,
    120
);



/* =========================================
   VERY SLOW CAPACITOR DISCHARGE
=========================================

   This represents small system losses.

   It is intentionally VERY slow so that
   the increase caused by each vehicle
   remains clearly visible.
========================================= */

setInterval(() => {

    if (!vehicleWasOnPlate) {

        capacitor =

            Math.max(
                0.65,

                capacitor - 0.002
            );
    }


    updateDashboard();

}, 1000);



/* =========================================
   INITIAL DISPLAY
========================================= */

updatePiezoArray();

updateDashboard();