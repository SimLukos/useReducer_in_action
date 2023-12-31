'use client';
import { useReducer } from 'react';

const reducer = (state, action) => {
  if (action.type === 'increment') {
    return {
      ...state,
      count: state.count + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      ...state,
      count: state.count - 1,
    };
  }

  if (action.type === 'valueToAdd') {
    return {
      ...state,
      valueToAdd: action.value,
    };
  }

  if (action.type === 'submit') {
    return {
      ...state,
      count: state.count + action.value,
      valueToAdd: 0,
    };
  }

  return state;
};

export default function CounterPage() {
  // const [count, setCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    valueToAdd: 0,
  });

  const increment = () => {
    dispatch({
      type: 'increment',
    });
  };

  const decrement = () => {
    dispatch({
      type: 'decrement',
    });
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value) || 0;

    dispatch({
      type: 'valueToAdd',
      value,
    });

    // setValueToAdd(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: 'submit',
      value: state.valueToAdd,
    });

    // setCount(count + valueToAdd);
    // setValueToAdd(0);
  };

  return (
    <div className='m-3'>
      <h1 className='text-lg'>Count is {state.count}</h1>
      <div className='flex flex-row'>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        <input
          value={state.valueToAdd || ''}
          onChange={handleChange}
          type='number'
          className='p-1 m-3 bg-gray-50 border border-gray-500'
        />
        <button>Add it!</button>
      </form>
    </div>
  );
}
