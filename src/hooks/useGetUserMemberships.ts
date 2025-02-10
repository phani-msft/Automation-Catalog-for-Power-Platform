import { useQuery } from 'react-query';
import { useAuth } from "./useAuthenticatedClient";
import config from '../config';
import { apiRoutes } from '../apiRoutes';
import { UserMemberships } from '../common/models/UserMemberships';

export const useGetUserMemberships = (setUserMemberships) => {
    const [httpClient] = useAuth(config.apiEndpoint!, config.defaultTokenScope!);
    return useQuery(
        ['user-membership', 'get'],
        async () => {
            const response = await httpClient.get(apiRoutes.getUserMemberships);
            const userMembershipData: UserMemberships = response?.data;
            setUserMemberships(userMembershipData)
            return userMembershipData;
        },
        { refetchOnWindowFocus: false, retry: false },
    );
};
