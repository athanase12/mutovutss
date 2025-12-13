import React from 'react';

function Form() {
    return (<><center><br/><br/><br/>
        <div className='min-h-[40vh] border-2 border-gray-600 w-70 mx-auto my-10 bg-gray-800
         text-amber-50 rounded-lg shadow-lg flex flex-col items-center p-5 mt-5'>
            <h1 className='font-extrabold text-2xl text-blue-600 mb-3'>Login Form</h1>
            <form className='flex flex-col items-center w-full'>
                <div className='flex flex-col items-center w-full'>
                    <label className='mb-2'>Username</label>
                    <input 
                        type='text' 
                        placeholder='Enter username' 
                        required 
                        className='w-40 focus:border-red-500 focus:border-4 border-2 border-gray-300 rounded p-1'
                    />
                    <label className='py-4'>Password</label>
                    <input 
                        type='password' 
                        placeholder='Enter password' 
                        required 
                        className='w-40 focus:border-red-500 focus:border-4 border-2 border-gray-300 rounded p-1 mb-10'
                    />
                </div><br/>
                <div className='mt-10'>
                    <button 
                        type='submit' 
                        className='bg-blue-600 text-white py-4 px-4 rounded hover:bg-blue-700 transition duration-200 w-40'
                    >
                        LOGIN
                    </button>
                </div>
            </form>
        </div></center></>
    );
}

export default Form;
