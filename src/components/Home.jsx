import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../features/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    } 
    else {
      setTitle('');
      setValue('');
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and Content both are required!");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toLocaleDateString(),
    }

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
   
<div className='max-w-4xl mx-auto p-4 mt-6 rounded-xl shadow-2xl'>
  <div className='flex flex-row gap-4 justify-between items-center mb-6'>
    <input 
      className='border border-gray-700 rounded-md px-4 py-2 w-full focus:border-blue-500 outline-none transition-all font-semibold'
      type="text"
      placeholder='Enter title here...'
      value={title} 
      onChange={(e) => setTitle(e.target.value)}
    />

    <button 
      onClick={createPaste}
      className='px-6 py-2 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-900/20 whitespace-nowrap'
    >
      {pasteId ? "Update Paste" : "Create Paste"}
    </button>
  </div>

  <div className='mt-4'>
    <textarea 
      className='border border-gray-700 rounded-md w-full p-4 min-h-125 focus:border-blue-500 outline-none resize-none shadow-inner'
      placeholder='Write your content here...'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
  <div className='flex items-center           justify-between'>
    {pasteId && (
  <button onClick={() => setSearchParams({})} className="text-red-500 cursor-pointer hover:underline ml-2">
    Cancel Edit
  </button>
    )}
    {pasteId && (<Link to="/pastes" className="text-blue-500 hover:underline  text-right inline-block mr-2">
    ← Back to Pastes
  </Link>)}
  </div>
</div>
  )
}

export default Home