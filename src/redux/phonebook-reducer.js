import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { combineReducers } from 'redux';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: token => ({
        url: '/contacts',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: arg => ({
        url: `/contacts/${arg.contact}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${arg.token}`,
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
    createContact: builder.mutation({
      query: content => ({
        url: '/contacts',
        method: 'POST',
        body: {
          id: content.id,
          name: content.name,
          number: content.number,
        },
        headers: {
          Authorization: `Bearer ${content.token}`,
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

const filterSlice = createSlice({
  name: 'contacts',
  initialState: '',
  reducers: {
    changeFilter: (state, action) => {
      return action.payload;
    },
  },
});
const contactReducer = combineReducers({
  filter: filterSlice.reducer,
});

export const {
  useFetchContactsQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
} = contactsApi;
export const { changeFilter } = filterSlice.actions;
export default contactReducer;