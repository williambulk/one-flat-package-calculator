document.addEventListener("DOMContentLoaded", function () {
	if (!document.querySelectorAll(".one-flat-fee-package-calculator").length)
		return;

	const oneFlatFeePackage = document.querySelectorAll(
		".one-flat-fee-package-calculator"
	);

	oneFlatFeePackage.forEach((calculator) => {
		let sellingPrice = calculator.querySelector(".selling-price input");
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

		formatCurrencyInput(sellingPrice);

		submitButton.addEventListener("click", (event) => {
			event.preventDefault();
			calculatePackage();
		});

		const calculatePackage = () => {
			let sellingPriceValue =
				parseFloat(sellingPrice.value.replace(/,/g, "").replace(/\$/g, "")) ||
				0;

			let startPoint = 100000;
			let remainder = sellingPriceValue - startPoint;
			if (remainder < 0) remainder = 0;

			// Determine One Flat Fee based on selling price
			let oneFlatFee = 3999;
			if (sellingPriceValue >= 500000 && sellingPriceValue < 800000) {
				oneFlatFee = 5499;
			} else if (sellingPriceValue >= 800000 && sellingPriceValue < 1000000) {
				oneFlatFee = 7499;
			} else if (sellingPriceValue >= 1000000 && sellingPriceValue < 1500000) {
				oneFlatFee = 9999;
			} else if (sellingPriceValue >= 1500000 && sellingPriceValue < 2000000) {
				oneFlatFee = 12500;
			} else if (sellingPriceValue >= 2000000) {
				oneFlatFee = 15000;
			}

			// Calculations
			let buyerCommission = startPoint * 0.0322 + remainder * 0.0115;
			let sellerCommission = startPoint * 0.0378 + remainder * 0.0135;
			let traditionalFee = startPoint * 0.07 + remainder * 0.025;
			let traditionalGST = traditionalFee * 0.05;
			let traditionalTotal = traditionalFee + traditionalGST;

			let offFee = oneFlatFee + buyerCommission;
			let offGST = offFee * 0.05;
			let offTotal = offFee + offGST;

			let savings = traditionalTotal - offTotal;

			// Output
			let result = `
				<table>
					<tr>
						<td>Seller's Realtor Commission:</td>
						<td>${sellerCommission.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</td>
					</tr>
					<tr>
						<td>Buyer's Realtor Commission:</td>
						<td>${buyerCommission.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</td>
					</tr>
					<tr>
						<td><strong>Traditional Agent Total (incl. GST):</strong></td>
						<td class="red"><strong>${traditionalTotal.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</strong></td>
					</tr>
					<tr>
						<td><strong>One Flat Fee Total (incl. GST):</strong></td>
						<td class="green"><strong>${offTotal.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</strong></td>
					</tr>
					<tr>
						<td><strong>Your Total Savings:</strong></td>
						<td class="green"><strong>${savings.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</strong></td>
					</tr>
				</table>
			`;

			document.querySelector(
				".one-flat-fee-package-calculator-estimate"
			).innerHTML = result;
		};
	});
});
