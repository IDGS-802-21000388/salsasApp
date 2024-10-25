import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'http://10.16.22.237:7215/api/Reports';

const ComparacionService = {
  getTotalSales: async (startDate, endDate) => {
    try {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate.toISOString()); 
        if (endDate) params.append('endDate', endDate.toISOString());

        const response = await fetch(`${apiUrl}/total-sales?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching total sales:', error);
        throw error; 
    }
},

getTotalPurchases: async (startDate, endDate) => {
    try {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate.toISOString());
        if (endDate) params.append('endDate', endDate.toISOString());

        const response = await fetch(`${apiUrl}/total-purchases?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching total purchases:', error);
        throw error; 
    }
},

  getMonthlySales: async (year = 2024) => {
    try {
      const params = new URLSearchParams({ year: year.toString() });
      const response = await fetch(`${apiUrl}/monthly-sales?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      await AsyncStorage.setItem(`monthlySales_${year}`, JSON.stringify(data));

      return data || []; 
    } catch (error) {
      console.error('Error fetching monthly sales:', error);
      const cachedData = await AsyncStorage.getItem(`monthlySales_${year}`);
      return cachedData ? JSON.parse(cachedData) : [];
    }
  },

  getMonthlyPurchases: async (year = 2024) => {
    try {
      const params = new URLSearchParams({ year: year.toString() });
      const response = await fetch(`${apiUrl}/monthly-purchases?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      await AsyncStorage.setItem(`monthlyPurchases_${year}`, JSON.stringify(data));

      return data || []; 
    } catch (error) {
      console.error('Error fetching monthly purchases:', error);
      const cachedData = await AsyncStorage.getItem(`monthlyPurchases_${year}`);
      return cachedData ? JSON.parse(cachedData) : []; 
    }
  },

  getTopSellingProductsByYear: async (year = 2024) => {
    try {
      const params = new URLSearchParams({ year: year.toString() });
      const response = await fetch(`${apiUrl}/top-selling-products-year?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data || []; 
    } catch (error) {
      console.error('Error fetching top-selling products by year:', error);
      throw error;
    }
  },

  getTopSellingProductsByMonth: async (year = 2024, month) => {
    try {
      const params = new URLSearchParams({ year: year.toString(), month: month.toString() });
      const response = await fetch(`${apiUrl}/top-selling-products-month?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data || []; 
    } catch (error) {
      console.error('Error fetching top-selling products by month:', error);
      throw error;
    }
  },

  getSalesDistributionByYear: async (year = 2024) => {
    try {
      const params = new URLSearchParams({ year: year.toString() });
      const response = await fetch(`${apiUrl}/sales-distribution?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data || []; 
    } catch (error) {
      console.error('Error fetching sales distribution by year:', error);
      throw error;
    }
  }
};

export default ComparacionService;
