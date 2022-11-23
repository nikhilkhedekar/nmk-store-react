import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createUpiOrder } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";

const GPayButton = ({ product, amount, shippingFee, tax, otp, token }) => {
    const dispatch = useDispatch();
    const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
    const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
    const navigate = useNavigate();

    function getGooglePaymentsConfiguration() {
        return {
            environment: 'TEST',
            apiVersion: 2,
            apiVersionMinor: 0,
            merchantInfo: {
                // A merchant ID is available after approval by Google.
                // 'merchantId':'12345678901234567890',
                merchantName: 'Example Merchant'
            },
            allowedPaymentMethods: [{
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: allowedCardAuthMethods,
                    allowedCardNetworks: allowedCardNetworks
                },
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    // Check with your payment gateway on the parameters to pass.
                    // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
                    parameters: {
                        'gateway': 'example',
                        'gatewayMerchantId': 'exampleGatewayMerchantId'
                    }
                }
            }]
        };
    }

    function createPaymentRequest() {
        // Add support for the Google Pay API.
        const methodData = [{
            supportedMethods: 'https://google.com/pay',
            data: getGooglePaymentsConfiguration()
        }];
        // Add other supported payment methods.
        methodData.push({
            supportedMethods: 'basic-card',
            data: {
                supportedNetworks:
                    Array.from(allowedCardNetworks, (network) => network.toLowerCase())
            }
        });

        const details = {
            total: { label: 'Test Purchase', amount: { currency: 'INR', value: (tax + shippingFee + (Number(product.price) * amount).toString()) } }
        };

        const options = {
            // requestPayerEmail: true,
            // requestPayerName: true
        };

        return new PaymentRequest(methodData, details, options);
    }

    function showErrorForDebugging(text) {
        console.log("Error", text);
    }

    useEffect(() => {
        if (window.PaymentRequest) {
            const request = createPaymentRequest();

            request.canMakePayment()
                .then(function (result) {
                    console.log("Authorize", result);
                })
                .catch(function (err) {
                    showErrorForDebugging(
                        'canMakePayment() error! ' + err.name + ' error: ' + err.message);
                });
        } else {
            showErrorForDebugging('PaymentRequest API not available.');
        }
    }, []);

    function handlePaymentResponse(response) {
        console.log("Success", response);
    }

    function onBuyClicked() {
        if(otp != token) return;
        createPaymentRequest()
            .show()
            .then(function (response) {
                // Dismiss payment dialog.
                response.complete('success');
                handlePaymentResponse(response);
                let productDetails = {
                    singleOrderItem: {
                        amount,
                        name: product.name,
                        price: Number(product.price),
                        image: product.image,
                        product: product._id
                    },
                    total: tax + shippingFee + (Number(product.price) * amount),
                    subtotal: Number(product.price) * amount,
                    tax,
                    shippingFee,
                    tokenizationData: response.details.paymentMethodData.tokenizationData
                }
                dispatch(createUpiOrder(productDetails));
                navigate(`/products`)
            })
            .catch(function (err) {
                showErrorForDebugging(
                    'show() error! ' + err.name + ' error: ' + err.message);
            });
    }

    return (
        <Button onClick={onBuyClicked} size="small" type="submit" variant="contained" disabled={otp.length != 6}  >
            GPay
        </Button>
    )
}

export default GPayButton