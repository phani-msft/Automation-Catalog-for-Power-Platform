import { createContext } from 'react';
import { UserDetails } from '../models/UserDetails';
import { UserMemberships } from '../models/UserMemberships';

export const UserContext = createContext<{
    userBasicData?: UserDetails;
    userMemberships?: UserMemberships;
}>({
    userBasicData: undefined,
    userMemberships: undefined
});
