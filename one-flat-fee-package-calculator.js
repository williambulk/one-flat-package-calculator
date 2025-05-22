document.addEventListener("DOMContentLoaded", function () {
	if (!document.querySelectorAll(".one-flat-fee-package-calculator").length)
		return;

	const oneFlatFeePackage = document.querySelectorAll(
		".one-flat-fee-package-calculator"
	);

	oneFlatFeePackage.forEach((calculator) => {
		let mortgage = calculator.querySelector(".mortgage input");
		let downPayment = calculator.querySelector(".down-payment input");
		let interest = calculator.querySelector(".interest input");
		let loanTerm = calculator.querySelector(".loan-term select");
		const submitButton = calculator.querySelector(
			".one-flat-fee-package-calculator-submit-button"
		);

		const formatCurrencyInput = (inputElement) => {
			inputElement.addEventListener("input", function () {
				let numericValue = this.value.replace(/,/g, "").replace(/\$/g, "");
				let formattedValue = parseFloat(numericValue) || 0;
				this.value = formattedValue.toLocaleString("en-CA");
			});
		};

		formatCurrencyInput(mortgage);
		formatCurrencyInput(downPayment);

		submitButton.addEventListener("click", (event) => {
			event.preventDefault();
			calculateMortgage();
		});

		const calculateMortgage = () => {
			let mortgageValue =
				parseFloat(mortgage.value.replace(/,/g, "").replace(/\$/g, "")) || 0;
			let downPaymentValue =
				parseFloat(downPayment.value.replace(/,/g, "").replace(/\$/g, "")) || 0;
			let interestValue = parseFloat(interest.value.replace(/,/g, "")) || 0;
			let loanTermOption = parseInt(loanTerm.value) || 0;

			let paymentsPerYear = 12;
			let loanTermTotalMonths = loanTermOption * paymentsPerYear;
			let monthlyInterest = interestValue / 100 / paymentsPerYear;
			let loanAmount = mortgageValue - downPaymentValue;

			let monthlyPayment = 0;
			if (monthlyInterest > 0) {
				monthlyPayment =
					(loanAmount *
						monthlyInterest *
						Math.pow(1 + monthlyInterest, loanTermTotalMonths)) /
					(Math.pow(1 + monthlyInterest, loanTermTotalMonths) - 1);
			} else {
				monthlyPayment = loanAmount / loanTermTotalMonths;
			}

			let totalPayment = monthlyPayment * loanTermTotalMonths;
			let totalInterest = totalPayment - loanAmount;

			let result = `
        <strong>Monthly Payment: ${monthlyPayment.toLocaleString("en-CA", {
					style: "currency",
					currency: "CAD",
				})}</strong> <br>
        Total Payment: ${totalPayment.toLocaleString("en-CA", {
					style: "currency",
					currency: "CAD",
				})} <br>
        Total Interest: ${totalInterest.toLocaleString("en-CA", {
					style: "currency",
					currency: "CAD",
				})} <br>
      `;

			document.querySelector(
				".one-flat-fee-package-calculator-estimate"
			).innerHTML = result;
		};
	});
});
