import './Table.css';
import numeral from "numeral";
function Table({countries}){
    return(
         <div className="table">
             {countries.map(({country,cases,countryInfo})=>(
                 <tr>
                     <td className="table__country">{country}</td>
                     <td><img className="table__flagImg" alt={country} src={countryInfo.flag}/></td>
                     <td className="table__cases"><strong>{numeral(cases).format("0,0")}</strong></td>
                 </tr>
             ))}
         </div>
    )
};
export default Table;