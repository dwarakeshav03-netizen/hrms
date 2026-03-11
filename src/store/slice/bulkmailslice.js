import { createSlice } from '@reduxjs/toolkit';
import { sendBulkMail } from '../action/bulkmailaction';

const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    loading: false,
    success: false,
    error: null,
    result: null,
  },
  reducers: {
    resetMailState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendBulkMail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(sendBulkMail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.result = action.payload;
      })
      .addCase(sendBulkMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMailState } = mailSlice.actions;
export default mailSlice.reducer;

