import { useSelector } from 'react-redux';

function Customer() {
  // useSelector creates subscription and the component will be rerendered whenever store changes
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
