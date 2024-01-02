'use client';
import { useReducer } from 'react';

const INCREMENT_COUNT = 'increment';
const DECREMENT_COUNT = 'decrement';
const VALUE_TO_ADD = 'valueToAdd';
const SUBMIT = 'submit';

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };

    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };

    case VALUE_TO_ADD:
      return {
        ...state,
        valueToAdd: action.value,
      };

    case SUBMIT:
      return {
        ...state,
        count: state.count + state.valueToAdd,
      };

    default:
      throw new Error('Unexpected action type: ' + action.type);
  }
};

export default function CounterPage() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    valueToAdd: 0,
  });

  const increment = () => {
    dispatch({
      type: INCREMENT_COUNT,
    });
  };

  const decrement = () => {
    dispatch({
      type: DECREMENT_COUNT,
    });
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value) || 0;

    dispatch({
      type: VALUE_TO_ADD,
      value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: SUBMIT,
      value: state.valueToAdd,
    });
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
