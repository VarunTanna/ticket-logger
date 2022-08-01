import React from "react";
import { useQuery } from "@apollo/client";

import TicketList from "../components/TicketList";
import TicketsList from "../components/TicketsList";
import TicketForm from "../components/TicketForm";

import { QUERY_TICKETS, QUERY_SINGLE_TICKET } from '../utils/queries';