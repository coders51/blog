import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="not-prose flex items-center gap-4">
      <button
        className="rounded bg-coders51 px-2 py-1 text-white"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      <p>Count: {count}</p>
    </div>
  )
}

export default Counter
