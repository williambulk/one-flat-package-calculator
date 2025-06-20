<?php
/*
Plugin Name: One Flat Fee Package Calculator
Description: Calculates the total savings from using One Flat Fee's Package. You can use the [one_flat_fee_package_calculator] shortcode.
Version: 1.0
Author: Line49
*/

add_shortcode( 'one_flat_fee_package_calculator', 'one_flat_fee_package_calculator' );

// enqueue script file
add_action('wp_enqueue_scripts', 'one_flat_fee_package_calculator_enqueue_scripts');
function one_flat_fee_package_calculator_enqueue_scripts() {
    // Enqueue the JavaScript file
    wp_enqueue_script('one_flat_fee_package_calculator_script', plugins_url('one-flat-fee-package-calculator.js', __FILE__), array(), '1.0', true);

    // Enqueue the CSS file
    wp_enqueue_style('one_flat_fee_package_calculator_styles', plugin_dir_url(__FILE__) . 'one-flat-fee-package-calculator.css', array(), '1.0');
}

function one_flat_fee_package_calculator() { ?>

    <?php ob_start(); ?>

    <div class="one-flat-fee-package-calculator">
        <h1>Package Calculator</h1>
        <p>FULL SERVICE DISCOUNT REALTOR®</p>
        <form>
            <div class="selling-price">
                <label><strong>Selling Price ($):</strong></label>
                <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="$CAD" required>
            </div>
        </form>

        <table class="one-flat-fee-package-calculator-estimate">
            <thead>
                <tr>
                    <th>Expenses</th>
                    <th>Traditional Agent</th>
                    <th>One Flat Fee</th>
                </tr>
            </thead>
            <tr>
                <td>Seller's Realtor Commission:</td>
                <td class="seller-commission"></td>
                <td class="one-flat-fee"></td>
            </tr>
            <tr>
                <td>Buyer's Realtor Commission:</td>
                <td class="buyer-commission"></td>
                <td class="buyer-commission"></td>
            </tr>
            <tr>
                <td><strong>Total Fee:</strong></td>
                <td class="agent-total"></td>
                <td class="one-flat-fee-total"></td>
            </tr>
            <tr>
                <td>GST:</td>
                <td class="agent-gst"></td>
                <td class="one-flat-fee-gst"></td>
            </tr>
            <tr>
                <td><strong>Total Fees You Pay:</strong></td>
                <td class="total-fees-you-pay red"></td>
                <td class="one-flat-fee-total green"></td>
            </tr>
            <tfoot>
                <td><strong>Your Total Savings:</strong></td>
                <td colspan="2" class="total-savings green"></td>
            </tfoot>
        </table>

        <p class="disclaimer">
            *Based on buyers commission of 3.22% on first $100k/1.15% on balance<br>
            ** Traditional Agent total cost is based on: 7% on first $100k/2.5% on Balance (incl buyers agent commissions*)<br>
            *** ONEFLATFEE total cost is based from $3,999 plus buyers agent commissions*
        </p>
    </div>

    <?php return ob_get_clean();

} ?>