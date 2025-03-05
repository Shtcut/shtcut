import { Link, List } from 'lucide-react';
import { PiFilePdfDuotone, PiIdentificationCard } from 'react-icons/pi';

export const tabData = [
    {
        value: 'website',
        label: 'Website URL',
        icon: <Link size={16} />
    },
    {
        value: 'multi-link',
        label: 'Multi links',
        icon: <List size={18} />
    },
    {
        value: 'pdf',
        label: 'PDF',
        icon: <PiFilePdfDuotone size={18} />
    },
    {
        value: 'vcard',
        label: 'vCard ',
        icon: <PiIdentificationCard size={18} />
    }
];
