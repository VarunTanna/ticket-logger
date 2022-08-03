// import React from 'react';

// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import TicketsList from '../components/TicketList';
// import TicketForm from '../components/TicketForm';

// import { QUERY_SINGLE_TICKET, QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';

// const Profile = () => {
//   const { profileId } = useParams();

//   // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
//   const { loading, data } = useQuery(
//     profileId ? QUERY_SINGLE_TICKET : QUERY_ME,
//     {
//       variables: { ticketId: ticketId },
//     }
//   );

//   // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
//   const ticket = data?.me || data?.ticket || {};

//   // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
//   if (Auth.loggedIn() && Auth.getProfile().data._id === ticketId) {
//     return <Navigate to="/me" />;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!ticket?.name) {
//     return (
//       <h4>
//         You need to be logged in to see your profile page. Use the navigation
//         links above to sign up or log in!
//       </h4>
//     );
//   }

//   return (
//     <div>
//       <h2 className="card-header">
//         {ticketsId ? `${ticket.name}'s` : 'Your'} friends have endorsed these
//         tickets...
//       </h2>

//       {ticket.tickets?.length > 0 && (
//         <SkillsList
//           skills={ticket.tickets}
//           isLoggedInUser={!ticketsId && true}
//         />
//       )}

//       <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
//         <SkillForm ticketId={ticket._id} />
//       </div>
//     </div>
//   );
// };

// export default Profile;
