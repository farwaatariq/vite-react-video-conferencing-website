// import './App.css'

// function App() {

//   return (
//     <>
//       <div>
//         <img src="cloud.png" alt="cute cloud icon" />
//       </div>
//       <h1 className='text-4xl font-semibold'>
//         Welcome!
//       </h1>
//       <p className='text-orange-400'>this is a video conferencing app</p>
//       <div className='flex flex-col items-center gap-y-2'>
//         <button className='max-w-fit bg-amber-700 text-amber-100 font-semibold rounded-lg mt-10 hover:border-amber-300'>
//           Create a room
//         </button>
//         <p>or</p>
//         <form>
//           <input type='text' placeholder='Enter the URL' className='border-amber-600 p-2 rounded-lg'/>
//         </form>
//       </div>
//     </>
//   )
// }

// export default App

import { useState } from 'react'
import './App.css'

function App() {
  const [roomUrl, setRoomUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');

  const createRoom = async () => {
    try {
      const res = await fetch('http://localhost:5000/create-room', {
        method: 'POST',
      });
      const data = await res.json();
      setRoomUrl(data.url);
    } catch (err) {
      console.error('Error creating room:', err);
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http')) {
      finalUrl = 'https://' + finalUrl;
    }
    setRoomUrl(finalUrl);
    console.log("final url: " + finalUrl);
  };
  

  return (
    <div className='max-w-full'>
      {!roomUrl ? (
        <div className='w-full flex flex-col items-center justify-center'>
          <div className='flex w-full justify-center'>
            <img src="cloud.png" alt="cute cloud icon"/>
          </div>
          <h1 className='text-4xl font-semibold'>
            Welcome!
          </h1>
          <p className='text-orange-400'>this is a video conferencing app</p>
          <div className='flex flex-col items-center gap-y-2'>
            <button
              onClick={createRoom}
              className='max-w-fit bg-amber-700 text-amber-100 font-semibold rounded-lg mt-10 px-4 py-2 hover:border-amber-300'
            >
              Create a room
            </button>
            <p>or</p>
            <form onSubmit={handleJoin} className='flex gap-2'>
              <input
                type='text'
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder='Enter the URL'
                className='border border-amber-600 p-2 rounded-lg w-72'
              />
              <button
                type='submit'
                className='bg-amber-600 text-white px-4 rounded-lg'
              >
                Join
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-6xl h-[80vh] rounded-2xl overflow-hidden">
            <iframe
              src={roomUrl}
              allow="camera; microphone; fullscreen; speaker; display-capture"
              title="Daily Video Room"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
