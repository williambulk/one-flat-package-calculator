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
        <h1>One Flat Fee Package Calculator</h1>
        <p>Estimate Your Monthly Payment for a 35-Year Mortgage:</p>
        <form>
            <div class="mortgage">
                <label><strong>Mortgage Amount ($):</strong></label>
                <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="$CAD" required>
            </div>

            <div class="down-payment">
                <label><strong>Down Payment ($):</strong></label>
                <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="$CAD" required>
            </div>

            <div class="interest">
                <label><strong>Interest Rate (%):</strong></label>
                <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" placeholder="E.g. 3.5%" required>
            </div>

            <div class="loan-term">
                <label><strong>Select Length of Term:</strong></label>
                <select class="loanTerm" required>
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="25">25 years</option>
                    <option value="30">30 years</option>
                    <option value="35">35 years</option>
                </select>
            </div>

            <button type="button" class="one-flat-fee-package-calculator-submit-button">Calculate</button>

            <div class="one-flat-fee-package-calculator-estimate"></div>
        </form>

        <p class="disclaimer">Based on a fully amortized fixed rate loan. Ask your agent for the tax rates in your area. Insurance estimate is based on an average cost, your final premium cost will be determined by the type of coverage you select. This program only provides an estimate.</p>
    </div>

    <?php return ob_get_clean();

} ?>