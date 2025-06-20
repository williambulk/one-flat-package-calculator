document.addEventListener("DOMContentLoaded", function () {
	if (!document.querySelectorAll(".one-flat-fee-package-calculator").length)
		return;

	const oneFlatFeePackage = document.querySelectorAll(
		".one-flat-fee-package-calculator"
	);

	oneFlatFeePackage.forEach((calculator) => {
		let sellingPrice = calculator.querySelector(".selling-price input");

		// Set default value
		sellingPrice.value = 1000000;

		const formatCurrencyInput = (inputElement) => {
			inputElement.addEventListener("input", function () {
				let numericValue = this.value.replace(/,/g, "").replace(/\$/g, "");
				let formattedValue = parseFloat(numericValue) || 0;
				this.value = formattedValue.toLocaleString("en-CA");
			});
		};

		formatCurrencyInput(sellingPrice);

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

			let result = `
				<table class="one-flat-fee-package-calculator-estimate">
					<tr>
						<thead>
							<th>Expenses</th>
							<th>Traditional Agent</th>
							<th>One Flat Fee</th>
						</thead>
					</tr>
					<tr>
						<td>Seller's Realtor Commission:</td>
						<td>${sellerCommission.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</td>
						<td>${oneFlatFee.toLocaleString("en-CA", {
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
						<td>${buyerCommission.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</td>
					</tr>
					<tr>
						<td>Total Fee:</td>
						<td>${traditionalFee.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</td>
						<td>${offFee.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</td>
					</tr>
					<tr>
						<td>GST:</td>
						<td>${traditionalGST.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</td>
						<td>${offGST.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</td>
					</tr>
					<tr>
						<td><strong>Total Fees You Pay:</strong></td>
						<td class="red"><strong>${traditionalTotal.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</strong></td>
						<td class="green"><strong>${offTotal.toLocaleString("en-CA", {
							style: "currency",
							currency: "CAD",
						})}</strong></td>
					</tr>
					<tfoot>
						<td><strong>Your Total Savings:</strong></td>
						<td colspan="2" class="featured-result"><strong>${savings.toLocaleString(
							"en-CA",
							{
								style: "currency",
								currency: "CAD",
							}
						)}</strong></td>
					</tfoot>
				</table>
			`;

			document.querySelector(
				".one-flat-fee-package-calculator-estimate"
			).innerHTML = result;
		};

		sellingPrice.addEventListener("input", (event) => {
			calculatePackage();
		});

		// Calculate with default value on page load
		calculatePackage();
	});
});
