import {useState} from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold text-gray-800'>Counter</h2>
      <p className='text-4xl font-semibold text-blue-600'>{count}</p>
      <div className='flex gap-2'>
        <button
          onClick={() => setCount(count - 1)}
          className='px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors'
        >
          Decrease
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition-colors'
        >
          Increase
        </button>
      </div>
    </div>
  );
}
