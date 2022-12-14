// import React from 'react';
// import { usePaystackPayment } from 'react-paystack';
// import { useStateContext } from '../../context/StateContext';

// //const { totalPrice } = useStateContext()

// const config = {
//     reference: (new Date()).getTime().toString(),
//     email: "mobolajiajakaiye@gmail.com",
//     //amount: totalPrice * 100,
//     amount: 100000,
//     publicKey: process.env.PAYSTACK_PUBLIC_KEY,
// };

// // you can call this function anything
// const onSuccess = (reference) => {
//   // Implementation for whatever you want to do with reference and after success call.
//   console.log(reference);
// };

// // you can call this function anything
// const onClose = () => {
//   // implementation for  whatever you want to do when the Paystack dialog closed.
//   console.log('closed')
// }

// const PaystackHookExample = () => {
//     const initializePayment = usePaystackPayment(config);
//     return (
//       <div>
//           <button onClick={() => {
//               initializePayment(onSuccess, onClose)
//           }}>Paystack Hooks Implementation</button>
//       </div>
//     );
// };

// export default PaystackHookExample


import React from 'react';
import { PaystackButton } from 'react-paystack';


const config = {
  reference: (new Date()).getTime().toString(),
  email: "mobolajiajakaiye@gmail.com",
  amount: 20000,
  publicKey: process.env.PAYSTACK_PUBLIC_KEY,
};

function App() {
  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const componentProps = {
      ...config,
      text: 'Paystack Button Implementation',
      onSuccess: (reference) => handlePaystackSuccessAction(reference),
      onClose: handlePaystackCloseAction,
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <PaystackButton {...componentProps} />
    </div>
  );
}

export default App;