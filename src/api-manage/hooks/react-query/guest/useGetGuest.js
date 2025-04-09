import React from 'react'
import { useMutation, useQuery } from 'react-query'
import MainApi from '../../../MainApi'
import { onErrorResponse } from '../../../api-error-response/ErrorResponses';
import { guest_ } from '../../../ApiRoutes';

const getGuest = async () => {
    const { data } = await MainApi.post(guest_);
    return data;
}
export default function useGetGuest() {
    return useQuery("guest", getGuest, {
        enabled: false,
        onError: onErrorResponse
    });
}