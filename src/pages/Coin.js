import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/Coin/CoinInfo/info";
import LineChart from "../components/Coin/LineChart/lineChart";
import PriceToggle from "../components/Coin/PriceToggle/priceToggle";
import SelectDays from "../components/Coin/SelectDays/selectDays";
import Loader from "../components/Common/Loader/loader";
import { coinObject } from "../functions/coinObject";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { settingChartData } from "../functions/settingChartData";
import List from "../components/Dashboard/List";
import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(120);
  const [priceType, setPriceType] = useState("prices");
 /*  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  }); */
  const [chartData,setChartData]=useState({});

  /*useEffect(() => {
    getData();
  }, [id]);

   const getData = async () => {
    setLoading(true);
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoin, data); //For Coin Obj being passed in the List
      const prices = await getCoinPrices(id, days, priceType);
      if (prices) {
        settingChartData(setChartData, prices, data);
        setLoading(false);
      }
    }
  }; */

  useEffect(()=>{
    if(id){
        getData();
    }

},[id]);

async function getData(){
        const data=await getCoinData(id);
    if(data){
        coinObject(setCoin,data);
        const prices=await getCoinPrices(id,days,priceType)
        if(prices.length>0){
            settingChartData(setChartData,prices);
            setLoading(false);
        }
    }

}

  /* const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceType);
    if (prices) {
      settingChartData(setChartData, prices, coin);
      setLoading(false);
    }
  }; */

 /*  const handlePriceTypeChange = async (event) => {
    setLoading(true);
    setPriceType(event.target.value);
    const prices = await getCoinPrices(id, days, event.target.value);
    if (prices) {
      settingChartData(setChartData, prices, coin);
    }
    setLoading(false);
  }; */

  const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event.target.value);
    const prices=await getCoinPrices(id,event.target.value,priceType)
    if(prices.length>0){
        settingChartData(setChartData,prices);
        setLoading(false);
    }
    
  };

  const handlePriceTypeChange =async (event, newType) => {
    setLoading(true);
    setPriceType(newType);
    const prices=await getCoinPrices(id,days,newType)
    if(prices.length>0){
        settingChartData(setChartData,prices);
        setLoading(false);
    }
    
  };

  return (
    <div>
        {/*  <Header/> */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.1} />
          </div>
          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <PriceToggle
              handlePriceTypeChange={handlePriceTypeChange}
              priceType={priceType}
            />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <CoinInfo name={coin.name} desc={coin.desc} />
        </>
      )}
       <Footer />
    </div>
   
  );
}

export default CoinPage;