import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state , action) => {
      const paste = action.payload;

      const index = state.pastes.findIndex((item)=> item.title === paste.title);

      if(index >= 0){
        toast.error("Paste already exists with this title!");
      }else
      {
      state.pastes.push(paste);
      localStorage.setItem("pastes" , JSON.stringify(state.pastes));
      toast.success("Paste created successfully!")
      }
    },
    updateToPastes: (state , action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if(index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem('pastes' , JSON.stringify(state.pastes));

        toast.success("Paste Updated !");
      } 
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload ;

      state.pastes = state.pastes.filter((item) => item._id !== pasteId);

      localStorage.setItem('pastes' , JSON.stringify(state.pastes));

      toast.success("Paste Deleted !");
      
    }
  }
})

export const { addToPastes, updateToPastes, resetAllPastes , removeFromPastes  } = pasteSlice.actions

export default pasteSlice.reducer