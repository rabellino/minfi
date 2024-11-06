





// TODO: LEFT OFF HERE!






import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import formatDate from '../../assets/js/formatDate';


const { BASE_URL } = import.meta.env;


/**
* Formats some datetime string into: Jan 01, 1970 00:00 UTC
*
* @param {string} datetime
* @returns {string}
*/
const formatIssueDt = (datetime) =>
 `${formatDate(datetime, 'dayMonthYear', true)} ${formatDate(datetime, 'monitorTimeCardTime', true)}`;


/**
* Comparison function for Array.sort() to sort Event Portfolios/Support Profiles by their issueDt
* @param {object} eventPortA
* @param {object} eventPortB
* @returns
*/
const compareByIssueDt = ({ issueDt: a }, { issueDt: b }) => {
 if (new Date(a) > new Date(b)) {
   return 1;
 }
 if (new Date(a) < new Date(b)) {
   return -1;
 }
 return 0;
};


const gatewayApi = createApi({
 reducerPath: 'gateway',
 // retry() wrapper will resend a failed request 3 times, then wait some (exponentially increasing)
 // delay before trying again. Useful protection if an API is misconfigured or completely down
 baseQuery: retry(
   fetchBaseQuery({
     baseUrl: `${BASE_URL}api`,
     headers: {
       'Content-Type': 'application/json',
     },
   }),
   { maxRetries: 3 },
 ),
 keepUnusedDataFor: 300, // caching for 5 minutes
 endpoints(builder) {
   return {
     fetchHealth: builder.query({
       query: () => ({
         url: '/health',
         method: 'GET',
         mode: 'cors',
       }),
     }),
     fetchEventPort: builder.query({
       query: ({ uuid, issueDt = null }) => ({
         url: `/eventportfolio?uuid=${uuid}${issueDt ? `&issueDt=${issueDt}` : ''}`,
         method: 'GET',
         mode: 'cors',
       }),
     }),
     fetchEventPortList: builder.query({
       query: () => ({
         url: '/eventportfolios',
         method: 'GET',
         mode: 'cors',
       }),
       transformResponse: (response) =>
         // loop through eventPortfolio metadata and append a (most likely) unique "displayName"
         // attribute which has eventPortfolio name, and issueDt if needed
         response
           .sort(compareByIssueDt) // sort all the Event Portfolios by issueDt, most recent first
           .reverse()
           .map((it) => ({
             ...it,
             displayName:
               response.filter((ep) => ep.name === it.name).length === 1
                 ? it.name
                 : `${it.name} (${formatIssueDt(it.issueDt)})`,
           })),
     }),
     fetchEventPortIds: builder.query({
       query: () => ({
         url: '/uuids',
         method: 'GET',
         mode: 'cors',
       }),
     }),
     fetchData: builder.query({
       query: (requestDetails) => ({
         url: '/data',
         method: 'POST',
         body: JSON.stringify(requestDetails),
         mode: 'cors',
       }),
       // this is for invalidating the cache when the requestDetails change
       providesTags: (result, error, requestDetails) => [
         { type: 'Data', id: JSON.stringify(requestDetails) },
       ],
       transformResponse: (response) => {
         // data is an object of valid times, each holding a 2d array of values
         const keys = Object.keys(response.data);
         const newData = {};
         // compute the offset and scale for the full dataset
         keys.forEach((key) => {
           const newArray = response.data[key].map((valueArr) =>
             valueArr.map((value) => Number(value) * response.scale + response.offset),
           );
           newData[key] = newArray;
         });
         return { ...response, data: newData };
       },
     }),
   };
 },
});


export { gatewayApi };
export const {
 useFetchHealthQuery,
 useFetchEventPortQuery,
 useFetchEventPortListQuery,
 useFetchEventPortIdsQuery,
 useFetchDataQuery,
} = gatewayApi;