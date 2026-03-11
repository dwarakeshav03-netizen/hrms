// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const sendBulkMail = createAsyncThunk(
//   'mail/sendBulkMail',
//   async (mailData, { rejectWithValue }) => {
//     try {
//       console.log('Sending bulk mail with data:', mailData);
      
//       const response = await axios.post(
//         // 'https://marketingtoolapidev.crestclimbers.com/api/MailMarketting/queue',
//         'https://localhost:7052/api/MailMarketting/queue',
//         mailData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'accept': '*/*'
//           }
//         }
//       );
      
//       console.log('Mail API Response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Mail sending error:', error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );