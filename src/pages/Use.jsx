import React, { useState } from 'react';
function Use() {
    const [count, setCount] = useState(0);

    const Addition = () => {
        if (count<1000)
        setCount(count + 100);
    };

    const Decrement = () => {
        if (count > 0) 
            setCount(count - 50);
    };
    const Reset = () => {
        setCount(0);
    };
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-150 bg-gray-100 gap-2">
                <h1 className="text-2xl font-bold mb-5">Counter Application</h1>
                <div className="flex flex-col items-center gap-2">
                    <button 
                        onClick={Addition} 
                        className="w-40 px-8 py-4 mb-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-400 transition duration-300"
                    >
                        INCREASE(+100)<br/>
                    </button>
                    <button 
                        onDoubleClick={Decrement}  
                        className="w-40 px-4 py-2 mb-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-400 transition duration-300"
                    >
                        DECREASE(-50)<br/>
                    </button>
                    <button 
                        onClick={Reset} onKeyUp={Reset} 
                        className="w-40 px-4 py-2 mb-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-400 transition duration-300"
                    >
                        RESET(0)
                    </button>
                    <span className="text-3xl font-semibold mb-3 h-20 w-20 rounded-full bg-amber-50 text-center border-red-700 border-4">
                        {count}
                    </span>
                </div>
            </div>
        </>
    );
}
export default Use;
