import { useState, useEffect } from "react";
import './App.css';
import {MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core";
import InfoBox from './InfoBox.js';
import Maps from './Maps.js';
import Table from './Table.js';
import {sortData, prettyPrintStat} from './util.js';
import Linegraph from './Linegraph.js';
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);
 
useEffect(()=>{
  fetch("https://disease.sh/v3/covid-19/all")
  .then((response)=>response.json())
  .then((data)=>{
    setCountryInfo(data);
  })
},[]);

  useEffect(()=>{
    const getCountriesData = async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>({
          name:country.country,
          value: country.countryInfo.iso2,
          flag:country.countryInfo.flag
        }));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      })
    }
    getCountriesData();
  },[]);
  

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    

    const url = countryCode==="worldwide"?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response=>response.json())
    .then((data)=>{
       setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(3);
    });
  };

return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1>COVID Tracker <span className="name"> @naveen kala</span></h1>
       
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}
                  <img className ="app__flagImage" src={country.flag} alt={country.value}/>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__cards">
        <InfoBox
          onClick={(e) => setCasesType("cases")}
          title="Cases"
          cases = {prettyPrintStat(countryInfo.todayCases)}
          isRed
          active={casesType === "cases"}
          total={numeral(countryInfo.cases).format("0.0a")}
        />
        <InfoBox
          onClick={(e) => setCasesType("recovered")}
          title="Recovered"
          cases = {prettyPrintStat(countryInfo.todayRecovered)}
          active={casesType === "recovered"}
          total={numeral(countryInfo.recovered).format("0.0a")}
        />
        <InfoBox
          onClick={(e) => setCasesType("deaths")}
          title="Deaths"
          cases = {prettyPrintStat(countryInfo.todayDeaths)}
          isRed
          active={casesType === "deaths"}
          total={numeral(countryInfo.deaths).format("0.0a")}
        />
        </div>
        <Maps
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
        <div className="app__information">
           <h3>Live Cases by Country</h3>
             <Table countries={tableData}/>
           <h3>Worldwide new {casesType}</h3>
             <Linegraph casesType={casesType}/>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
