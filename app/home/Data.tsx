import { useState, useEffect, useCallback, useMemo } from 'react';
import axiosInstance from '../services/axiosService';
import Item from './Item';
import {debounce} from 'lodash';


export interface Company {
    id: number;
    entity: string;
    sector: string;
    email: string;
    incorporation: string;
    address: string;
    revenue: string;
    website: string;
    is_verified: boolean;
}
export default function Data() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({ column: null, direction: 'asc' });

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axiosInstance.get('companies/', config);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const debouncedSearch = useMemo(() => debounce((value: any) => {
        setSearch(value);
        setPage(1); // Reset to the first page whenever the search term changes
    }, 300), []);

    const handleSearch = useCallback((e: any) => {
        debouncedSearch(e.target.value);
    }, [debouncedSearch]);

    useEffect(() => {
        const filterAndSortData = () => {
            const newFilteredData = data.filter((company) =>
                Object.values(company).some((value: any) =>
                    value.toString().toLowerCase().includes(search.toLowerCase())
                )
            );

            if (sort.column) {
                newFilteredData.sort((a, b) => {
                    const aValue = a[sort.column!];
                    const bValue = b[sort.column!];

                    if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
                    if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            setFilteredData(newFilteredData);
        };

        filterAndSortData();
    }, [search, sort, data]);

    const handleSort = useCallback((column: any) => {
        const direction = sort.direction === 'asc' ? 'desc' : 'asc';
        setSort({ column, direction });
    }, [sort]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * 10;
        const end = page * 10;
        return filteredData.slice(start, end);
    }, [page, filteredData]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Company Data</h2>
            <input
                type="text"
                className="border rounded p-2 mb-4 w-full"
                placeholder="Search..."
                onChange={handleSearch}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed bg-white border border-gray-200">
                    <thead>
                        <tr className='grid grid-cols-8'>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('entity')}>Entity</th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('sector')}>Sector</th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('email')}>Email</th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('incorporation')}>Incorporation</th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('address')}>Address</th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('revenue')}>Revenue</th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('website')}>Website</th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('is_verified')}>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((comp: Company) => (
                            <Item key={comp.id} company={comp} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button 
                    className="bg-[#575cee] text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>Page {page} of {Math.ceil(filteredData.length / 10)}</span>
                <button 
                    className="bg-[#575cee] text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={() => setPage(page + 1)} 
                    disabled={page === Math.ceil(filteredData.length / 10)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
