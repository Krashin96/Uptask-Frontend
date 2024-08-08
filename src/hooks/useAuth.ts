import { useQuery } from "@tanstack/react-query";
import { getUser } from "~/api/AuthAPI";

export function useAuth() {
    const { data, isError, isLoading } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        refetchOnWindowFocus: false,
        retry: 1,
    })
    return { data, isError, isLoading }
}