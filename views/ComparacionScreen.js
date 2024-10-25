import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import ComparacionViewModel from '../viewmodels/ComparacionViewModel';

const ComparacionScreen = () => {
    const [year, setYear] = useState('2024');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showDefaultChart, setShowDefaultChart] = useState(true);
    const [hasGenerated, setHasGenerated] = useState(false); 
    const { salesData, purchasesData, profitsData, loading, fetchData } = ComparacionViewModel(startDate, endDate, year);

    const onStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        if (selectedDate && selectedDate <= endDate) { 
            setStartDate(selectedDate);
        } else {
            alert("La fecha de inicio no puede ser después de la fecha de fin");
        }
    };

    const onEndDateChange = (event, selectedDate) => {
        setShowEndDatePicker(false);
        if (selectedDate && selectedDate >= startDate) {  
            setEndDate(selectedDate);
        } else {
            alert("La fecha de fin no puede ser antes de la fecha de inicio");
        }
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const calculateTotal = (data) => {
        return data.reduce((a, b) => a + b, 0);
    };

    const handleGenerate = async () => {
        await fetchData(); 

        const totalSales = calculateTotal(salesData);
        const totalPurchases = calculateTotal(purchasesData);

        if (totalSales === 0 && totalPurchases === 0) {
            Alert.alert("No hay datos", "No se encontraron ventas ni compras para la fecha seleccionada.");
            setShowDefaultChart(true); 
            setHasGenerated(false); 
            return; 
        }

        setShowDefaultChart(false); 
        setHasGenerated(true); 
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Informe de Ventas y Compras</Text>

            <View style={styles.formRow}>
                <Text style={styles.label}>Año:</Text>
                <TextInput
                    style={styles.input}
                    value={year}
                    keyboardType="numeric"
                    onChangeText={setYear}
                />
            </View>

            <View style={styles.formRow}>
                <Text style={styles.label}>Fecha Inicio:</Text>
                <Button
                    title={formatDate(startDate)}
                    onPress={() => setShowStartDatePicker(true)}
                />
                {showStartDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={onStartDateChange}
                        maximumDate={endDate}                    
                    />
                )}
            </View>

            <View style={styles.formRow}>
                <Text style={styles.label}>Fecha Fin:</Text>
                <Button
                    title={formatDate(endDate)}
                    onPress={() => setShowEndDatePicker(true)}
                />
                {showEndDatePicker && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display="default"
                        onChange={onEndDateChange}
                        minimumDate={startDate}  
                        maximumDate={new Date()}  
                    />
                )}
            </View>

            <View style={styles.buttonRow}>
                <Button title="Generar" onPress={handleGenerate} color="#e4007c" />
                <Button title="Limpiar" onPress={() => {
                setYear('2024'); 
                setStartDate(new Date());
                setEndDate(new Date()); 
                setShowDefaultChart(true); 
                setHasGenerated(false); 
            }} color="#c31a23" />
            </View>

            {loading ? (
                <Text>Cargando datos...</Text>
            ) : (
                <>
                    {showDefaultChart ? (
                        <>
                            <Text style={styles.subtitle}>Compras</Text>
                            <BarChart
                                data={{
                                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                                    datasets: [{ data: purchasesData.length ? purchasesData : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
                                }}
                                width={320}
                                height={220}
                                chartConfig={chartConfig}
                                verticalLabelRotation={0}
                            />

                            <Text style={styles.subtitle}>Ventas</Text>
                            <BarChart
                                data={{
                                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                                    datasets: [{ data: salesData.length ? salesData : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
                                }}
                                width={320}
                                height={220}
                                chartConfig={chartConfig}
                                verticalLabelRotation={0}
                            />

                            <Text style={styles.subtitle}>Ganancias</Text>
                            <BarChart
                                data={{
                                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                                    datasets: [{ data: profitsData.length ? profitsData : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
                                }}
                                width={320}
                                height={220}
                                chartConfig={chartConfig}
                                verticalLabelRotation={0}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.subtitle}>Compras</Text>
                            <BarChart
                                data={{
                                    labels: ['Compras'],
                                    datasets: [{ data: [calculateTotal(purchasesData)] }] 
                                }}
                                width={320}
                                height={220}
                                chartConfig={chartConfig}
                                fromZero={true}  
                            />

                            <Text style={styles.subtitle}>Ventas</Text>
                            <BarChart
                                data={{
                                    labels: ['Ventas'],
                                    datasets: [{ data: [calculateTotal(salesData)] }] 
                                }}
                                width={320}
                                height={220}
                                chartConfig={chartConfig}
                                fromZero={true}  
                            />

                            <Text style={styles.subtitle}>Ganancias</Text>
                            <BarChart
                                data={{
                                    labels: ['Ganancias'],
                                    datasets: [{ data: [calculateTotal(profitsData)] }] 
                                }}
                                width={320}
                                height={220}
                                chartConfig={chartConfig}
                                fromZero={true}  
                            />
                        </>
                    )}
                </>
            )}
        </ScrollView>
    );
};

const chartConfig = {
    backgroundColor: '#f7f5f2',
    backgroundGradientFrom: '#f7f5f2',
    backgroundGradientTo: '#f7f5f2',
    color: (opacity = 1) => `rgba(131, 167, 234, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(131, 167, 234, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        flex: 1,
        fontSize: 18,
    },
    input: {
        flex: 2,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginLeft: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#217765',
        marginTop: 16,
    },
});

export default ComparacionScreen;
