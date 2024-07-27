import React from 'react';

export default function Item({ company }: any) {
    return (
        <tr key={company.id} className='grid grid-cols-8 text-sm'>
            <td className="flex justify-center py-2  px-4 border-b break-words">{company.entity}</td>
            <td className="flex justify-center py-2 px-4 border-b break-words">{company.sector}</td>
            <td className="flex justify-center py-2 px-4 border-b break-words">{company.email}</td>
            <td className="flex justify-center py-2 px-4 border-b break-words">{company.incorporation}</td>
            <td className="flex justify-center py-2 px-4 border-b break-words">{company.address}</td>
            <td className="flex justify-center py-2 px-4 border-b break-words">{company.revenue}</td>
            <td className="flex justify-center py-2 px-4 border-b break-words">{company.website}</td>
            <td className="flex justify-center py-2 px-4 border-b break-words">{company.is_verified ? 'Yes' : 'No'}</td>
        </tr>
    );
}
