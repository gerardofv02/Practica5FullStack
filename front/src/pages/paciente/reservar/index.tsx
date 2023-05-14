import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import { slot } from "../reservadas";
//Esta parte de la práctica se haría con cliente ya que sería necesario hacer peticiones
// al cliente a la hora de introducir el año el mes el dia  la hora y el dni para reservar una cita disponible

const Reservar = () => {
const [year,setYear] = useState<number>(0);
const [month,setMonth] = useState<number>(0);
const [day,setDay] = useState<number>();
const [hour,setHour] = useState<number>();
const [dni,setDni] = useState<string>("");
    const query = gql`
    query ExampleQuery($year: Int!, $month: Int!) {
        availableSlots(year: $year, month: $month) {
          available,
          day,
          dni,
          hour,
          month,
          year,
        }
      }
    `;
const mutation = gql`
mutation($year: Int!, $month: Int!, $day: Int!, $hour: Int!, $dni: String!){
    bookSlot(year: $year, month: $month, day: $day, hour: $hour, dni: $dni) {
      available,
      day,
      dni
      hour,
     month,
     year 
    }
  }
`;
const {data} = useQuery<{
    availableSlots: slot[],
   } >( 
    query,{
      variables: {
          year ,
          month
      }
    }
  );


const [mymutation] = useMutation(mutation);

    return(
        <>
        <Link href="/paciente">Volver a menu paciente</Link>
        <br/>    
        <div>Hola Paciente, Reservar Citas:</div>
        <br/>
        <div>Cuando desea reservarla?</div>
        <br/>
        <div>
            Año:
        <input type="number" onBlur={(e) => setYear(parseInt(e.target.value))}></input>
        </div>
        <div>
            Mes:
        <input type="number" onBlur={(e) => setMonth(parseInt(e.target.value))}></input>
        </div>
        <div>
            Dia:
        <input type="number" onBlur={(e) => setDay(parseInt(e.target.value))}></input>
        </div>
        <div>
            Hora:
        <input type="number" onBlur={(e) => setHour(parseInt(e.target.value))}></input>
        </div>
        <div>
            DNI:
        <input type="text" onBlur={(e) => setDni(e.target.value)}></input>
        </div>
        
        <button onClick={(e) => {mymutation({variables: {year:year,month:month,hour:hour,day:day,dni:dni}})}}> Reervar</button>
        <br/>
        <div>Posibles citas a reservar según datos introducidos: </div>
       {data?.availableSlots.map((slot:slot ) => { return(<div id={`${slot.hour}`}>
                    <div>Avaible: {slot.available?"Yes manuiel":"No Paco"}</div>
                    <div>day: {slot.day}</div>
                    <div>dni: {slot.dni}</div>
                    <div>hour: {slot.hour}</div>
                    <div>month: {slot.month}</div>
                    <div>year: {slot.year}</div>
                    <br/>
       </div>)})}

        </>

    
    )
}
export default Reservar;