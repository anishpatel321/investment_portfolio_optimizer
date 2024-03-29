import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot,
} from "recharts";

function MEFScatter() {
  // Retrieve datasets from Redux store
  const dfMEF = useSelector(state => state.outputs.df_MEF);
  const dfCAL = useSelector(state => state.outputs.df_CAL);
  const dfCML = useSelector(state => state.outputs.df_CML);
  const dfOptimal = useSelector(state => state.outputs.df_optimal_theoretical);
  const dfGeneratedPortfolios = useSelector(state => state.outputs.df_generated_portfolios);

  // State for formatted data
  const [MEFData, setMEFData] = useState([]);
  const [CALData, setCALData] = useState([]);
  const [CMLData, setCMLData] = useState([]);
  const [OptimalData, setOptimalData] = useState([]);
  const [GeneratedPortfoliosData, setGeneratedPortfoliosData] = useState([]);

  
  const [xDomain, setXDomain] = useState([0, 0]);
  const [yDomain, setYDomain] = useState([0, 0]);


  useEffect(() => {





    
    // Function to format dataset for the chart
    const formatData = (data) => {
      return Object.keys(data.Volatility).map((key) => ({
        x: data.Volatility[key], // x-axis values from 'Volatility'
        y: data.Returns[key],    // y-axis values from 'Returns'
      })); // Sort data based on x-values for line representation
    };

    // Format and set data for each dataset
    if (dfMEF) {
      const mefData = formatData(dfMEF).sort((a, b) => a.x - b.x);
      setMEFData(mefData);
    }

    if (dfCAL) {
      const calData = formatData(dfCAL).sort((a, b) => a.x - b.x);
      setCALData(calData);
    }

    if (dfCML) {
      const cmlData = formatData(dfCML).sort((a, b) => a.x - b.x);
      setCMLData(cmlData);
    }

    if (dfOptimal) {
      const optimalData = formatData(dfOptimal);
      setOptimalData(optimalData);
    }

    if (dfGeneratedPortfolios) {
      const generatedData = formatData(dfGeneratedPortfolios);
    
      // Initialize min and max values
      let minX = generatedData[0].x, maxX = generatedData[0].x;
      let minY = generatedData[0].y, maxY = generatedData[0].y;
    
      // Find min and max values
      generatedData.forEach(d => {
        minX = Math.min(minX, d.x);
        maxX = Math.max(maxX, d.x);
        minY = Math.min(minY, d.y);
        maxY = Math.max(maxY, d.y);
      });
    
      // Update state with new domain values, expanding them slightly for padding
      setXDomain([minX - 0.01, maxX + 0.01]);
      setYDomain([minY - 0.01, maxY + 0.01]);
    
      setGeneratedPortfoliosData(generatedData);
    }

  }, [dfMEF, dfCAL, dfCML, dfOptimal, dfGeneratedPortfolios]); // Dependency array includes all datasets
  
  return (
    <ResponsiveContainer width="100%" height={800}>
      <ComposedChart margin={{ top: 30, right: 30, bottom: 20, left: 70 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Volatility" stroke="white" label={{ value: 'Volatility', position: 'insideBottom', dy: 30, fill: 'white' } } domain={xDomain} tickFormatter={(value) => value.toFixed(2)}/>
        <YAxis type="number" dataKey="y" name="Returns" stroke="white" label={{ value: 'Returns', position: 'outsideLeft', dx: -50, fill: 'white' }} domain={yDomain} tickFormatter={(value) => value.toFixed(2)}/>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend 
          verticalAlign="bottom" 
          align="center" 
             wrapperStyle={{ paddingBottom: '10px', paddingTop: '50px' }} 
           />
        {GeneratedPortfoliosData.length > 0 && <Scatter name="Generated Portfolios" data={GeneratedPortfoliosData} fill="#fa8072" r={20}/>}
        {/* Represent MEF as a Line */}
        {MEFData.length > 0 && <Line type="natural" dot={false} dataKey="y" data={MEFData} name="MEF" stroke="#8884d8" />}
        {/* Represent CAL as a Line */}
        {CALData.length > 0 && <Line type="natural" dot={false} dataKey="y" data={CALData} name="CAL" stroke="#82ca9d" />}
        {/* Represent CML as a Line */}
        {CMLData.length > 0 && <Line type="natural" dot={false} dataKey="y" data={CMLData} name="CML" stroke="#ffc658" />}
        {OptimalData.length > 0 && <Scatter name="Optimal Theoretical" data={OptimalData} fill="#ffffff" />}
        
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default MEFScatter;
