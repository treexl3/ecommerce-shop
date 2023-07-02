import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import Shipping from './Shipping';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { makeRequest } from '../../makeRequest';

const initialValues = {
   billingAddress: {
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
   },
   shippingAddress: {
      isSameAddress: true,
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
   },
   email: "",
   phoneNumber: ""
};

const checkoutSchema = [
   yup.object().shape({
      billingAddress: yup.object().shape({
         firstName: yup.string().required("This field is required").matches(/[a-zA-Z]/, "This field requires letters"),
         lastName: yup.string().required("This field is required").matches(/[a-zA-Z]/, "This field requires letters"),
         country: yup.string().required("This field is required").matches(/[a-zA-Z]/, "This field requires letters"),
         street1: yup.string().required("This field is required"),
         street2: yup.string(),
         city: yup.string().required("This field is required").matches(/[a-zA-Z]/, "This field requires letters"),
         state: yup.string().required("This field is required").matches(/[a-zA-Z]/, "This field requires letters"),
         zipCode: yup.string().min(5, "Zip Code must be at least 5 characters").max(5, "Zip Code must be at least 5 characters").required("This field is required").matches(/[0-9]/, "This field requires numbers"),
      }),
      shippingAddress: yup.object().shape({
         isSameAddress: yup.boolean(),
         firstName: yup.string().when("isSameAddress", {
            is: false,
            then: yup.string().required("This field is required"),
         }),
         lastName: yup.string().when("isSameAddress", {
            is: false,
            then: yup.string().required("This field is required"),
         }),
         country: yup.string().when("isSameAddress", {
            is: false,
            then: yup.string().required("This field is required"),
         }),
         street1: yup.string().when("isSameAddress", {
            is: false,
            then: yup.string().required("This field is required"),
         }),
         street2: yup.string(),
         city: yup.string().when("isSameAddress", {
            is: false,
            then: yup.string().required("This field is required"),
         }),
         state: yup.string().when("isSameAddress", {
            is: false,
            then: yup.string().required("This field is required"),
         }),
         zipCode: yup.string().when("isSameAddress", {
            is: false,
            then: yup.string().max(5).min(5).required("This field is required"),
         }),
      }),
   }),
   yup.object().shape({
      email: yup.string().required("This field is required").email("Please provide a valid email"),
      phoneNumber: yup.string().min(4, "Phone Number must be at least 4 characters").max(12, "Phone Number must be at least 4 characters").required("This field is required"),
   }),
];

const Checkout = () => {
   const [activeStep, setActiveStep] = useState(0);
   const products = useSelector(state => state.cart.products);
   const isFirstStep = activeStep === 0;
   const isSecondStep = activeStep === 1;

   const handleFormSubmit = async (values, actions) => {
      setActiveStep(activeStep + 1);

      // copies the billing address onto shipping address
      if (isFirstStep && values.shippingAddress.isSameAddress) {
         actions.setFieldValue('shippingAddress', {
            ...values.billingAddress,
            isSameAddress: true
         });
      }

      if (isSecondStep) {
         makePayment(values);
      }

      actions.setTouched({});
   };

   const stripePromise = loadStripe(
      "pk_test_51N6xkDCVtlRkBotdhGE5dlsMVB4vrcGKHa4vwfddDAO5NUwfkWCTtrJCNZeuJ47dtdJxQJ2m3Pc8keAvIQ4w63LO00kyMisVs3"
   );

   const makePayment = async (values) => {
      try {
         const stripe = await stripePromise;

         const response = await makeRequest.post("/orders", {
            products,
            userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(" "),
            email: values.email,
            billingAddress: values.billingAddress,
            shippingAddress: values.shippingAddress,
         });

         await stripe.redirectToCheckout({
            sessionId: response.data.stripeSession.id,
         });
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <Box width="80%" m="100px auto">
         <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
            <Step>
               <StepLabel>Billing</StepLabel>
            </Step>
            <Step>
               <StepLabel>Payment</StepLabel>
            </Step>
         </Stepper>
         <Box>
            <Formik
               onSubmit={handleFormSubmit}
               initialValues={initialValues}
               validationSchema={checkoutSchema[activeStep]}
            >
               {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue
               }) => (
                  <form onSubmit={handleSubmit}>
                     {isFirstStep && (
                        <Shipping
                           values={values}
                           errors={errors}
                           touched={touched}
                           handleBlur={handleBlur}
                           handleChange={handleChange}
                           setFieldValue={setFieldValue}
                        />
                     )}
                     {isSecondStep && (
                        <Payment
                           values={values}
                           errors={errors}
                           touched={touched}
                           handleBlur={handleBlur}
                           handleChange={handleChange}
                           setFieldValue={setFieldValue}
                        />
                     )}
                     <Box display="flex" justifyContent="end" gap="50px">
                        {isSecondStep && (
                           <Button
                              fullWidth
                              type='submit'
                              color='primary'
                              variant='contained'
                              sx={{
                                 backgroundColor: 'gray',
                                 boxShadow: 'none',
                                 fontSize: '16px',
                                 fontWeight: '500',
                                 color: 'white',
                                 borderRadius: '5px',
                                 padding: '10px',
                                 ":hover": {
                                    bgcolor: "#696969",
                                 }
                              }}
                              onClick={() => setActiveStep(activeStep - 1)}
                           >Back</Button>
                        )}
                        <Button
                           type='submit'
                           color='primary'
                           variant='contained'
                           sx={{
                              width: isFirstStep ? '50%' : '100%',
                              backgroundColor: '#2879fe',
                              boxShadow: 'none',
                              fontSize: '16px',
                              fontWeight: '500',
                              color: 'white',
                              borderRadius: '5px',
                              padding: '10px',
                           }}
                        >{isFirstStep ? 'Next' : 'Place Order'}</Button>
                     </Box>
                  </form>
               )}
            </Formik>
         </Box>
      </Box>
   )
};

export default Checkout;