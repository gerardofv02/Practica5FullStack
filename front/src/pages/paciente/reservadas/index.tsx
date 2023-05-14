import getClient from "@/pages/libs/client";
import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";

//Esta parte de la práctica se haría con cliente ya que sería necesario hacer peticiones
// al cliente a la hora de introducir en que mes y año quiere el paciente revisar las citas


export type slot = {
  available: boolean,
  day: number,
  dni: string,
  hour: number,
  month:number,
  year: number
}


 const Reservadas = () => {
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

    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
  const {data,loading,error} = useQuery<{
    availableSlots: slot[],
   } >( 
    query,{
      variables: {
          year ,
          month
      }
    }
  );
  if (loading) return "loading";
  if(error) return "error";
  
  return(
        <>
        
        <Link href="/paciente">Volver a menu paciente</Link>
        <div>Hola Paciente, citas reservadas:</div>
        <br/>
        <div>Introduzca Año: </div> <input type="number" id="anno" onBlur={(e) => setYear(parseInt(e.target.value))}></input>
        <br/>
        <div>Introduzca Mes: </div> <input type="number" id="mes" onBlur={(e) => setMonth(parseInt(e.target.value))}></input>
        <br/>
        <button > Ver datos</button>
       {data!.availableSlots.map((slot:slot ) => { return(<div id={`${slot.hour}`}>
                    <div>Avaible: {slot.available?"Yes manuiel":"No Paco"}</div>
                    <div>day: {slot.day}</div>
                    <div>dni: {slot.dni}</div>
                    <div>hour: {slot.hour}</div>
                    <div>month: {slot.month}</div>
                    <div>year: {slot.year}</div>
       </div>)})}
        
        </>
    
    )

}
export default Reservadas;