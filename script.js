function init() {
    let form = document.getElementById('form');
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!form.checkValidity()){
            form.reportValidity();
            return;
        }

        calculatePosition();
    });
}

function calculatePosition() {
    const equity = parseFloat(document.getElementById("equity").value);
    const risk = parseFloat(document.getElementById("risk").value);
    const stopLoss = parseFloat(document.getElementById("stopLoss").value);
    const fee = parseFloat(document.getElementById("fee").value);
    const takeProfit = parseFloat(document.getElementById("takeProfit").value);

    const riskAmount = (risk / 100) * equity;
    const feeAmount = (fee / 100) * 2 // (entry fee + exit fee)
    const positionSize = riskAmount / ((stopLoss / 100) + feeAmount);
    const positionLeverage = positionSize > equity ? positionSize / equity : 0;

    document.getElementById("position").value = positionSize.toFixed(4);
    document.getElementById("position-leverage").value = positionLeverage.toFixed(2);

    document.getElementById("gain").value = riskAmount * takeProfit;
    document.getElementById("loss").value = riskAmount;
}

function updateTp(value) {
    document.getElementById("tpOut").value = value;
}

window.onload = init;
