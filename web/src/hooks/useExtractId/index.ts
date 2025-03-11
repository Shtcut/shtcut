import { useParams } from 'next/navigation';

const useExtractId = () => {
    const params = useParams();
    return Array.isArray(params.id) ? params.id[0] : params.id;
};

export default useExtractId;
