import { slot } from "@/pages/paciente/reservadas";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

//Esta parte de la práctica se haría con cliente ya que sería necesario hacer peticiones
// al cliente a la hora de introducir el año el mes el dia y la hora para eliminar una cita

const Remover = () => {
    const [year,setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [day,setDay] = useState<number>();
    const [hour, setHour] = useState<number>();
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
    mutation($year: Int!, $month: Int!, $day: Int!, $hour: Int!){
        removeSlot(year: $year, month: $month, day: $day, hour: $hour) {
          available,
          day,
          dni,
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
    

    const [mymutation]= useMutation(mutation);
    

    return(
        <>
        <Link href="/medico">Volver a menu medico</Link>
        <div>Hola que cita desea remover?</div>
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
        <button onClick={(e) => {mymutation({variables: {year:year,month:month,hour:hour,day:day}})}}> Eliminar</button>
        <br/>
        <div>Posibles citas a eliminar según datos introducidos: </div>
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
export default Remover;