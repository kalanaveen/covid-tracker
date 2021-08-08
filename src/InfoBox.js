import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
function InfoBox({title,cases,total,active,isRed,...props}){
    return(
        <Card  className={`infoBox ${active && "infoBox--selected"} ${
            isRed && "infoBox--red"
          }`} onClick={props.onClick}>
            <CardContent>
            <Typography className = "info__boxTitle" color="textSecondary">{title}</Typography>
            <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
            <Typography className = "info__boxTotal">Total {total} </Typography>
            </CardContent>
        </Card>
    )
};

export default InfoBox;