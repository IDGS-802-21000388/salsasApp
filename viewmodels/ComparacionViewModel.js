import { useEffect, useState } from 'react';
import ComparacionService from '../services/ComparacionService';

const ComparacionViewModel = (startDate, endDate, year) => {
    const [salesData, setSalesData] = useState([]);
    const [purchasesData, setPurchasesData] = useState([]);
    const [profitsData, setProfitsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDefaultData = async () => {
        setLoading(true);
        try {
            const sales = await ComparacionService.getMonthlySales(year); 
            const purchases = await ComparacionService.getMonthlyPurchases(year);

            const months = Array.from({ length: 12 }, (_, index) => index + 1); 
            const salesAmounts = Array(12).fill(0);
            const purchasesAmounts = Array(12).fill(0);

            sales.forEach(sale => {
                const monthIndex = sale.month - 1; 
                salesAmounts[monthIndex] = sale.total || 0; 
            });

            purchases.forEach(purchase => {
                const monthIndex = purchase.month - 1; 
                purchasesAmounts[monthIndex] = purchase.total || 0; 
            });

            const profits = salesAmounts.map((sale, index) => sale - purchasesAmounts[index]);

            setSalesData(salesAmounts);
            setPurchasesData(purchasesAmounts);
            setProfitsData(profits);
        } catch (error) {
            console.error('Error fetching default data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const sales = await ComparacionService.getTotalSales(startDate, endDate); 
            const purchases = await ComparacionService.getTotalPurchases(startDate, endDate); 
            setSalesData([sales]); 
            setPurchasesData([purchases]); 
            setProfitsData([sales - purchases]); 
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDefaultData(); 
    }, [year]);

    return { salesData, purchasesData, profitsData, loading, fetchData };
};

export default ComparacionViewModel;
