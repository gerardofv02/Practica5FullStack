import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import {slot} from "@/pages/paciente/reservadas"
import Link from "next/link";




const Anadir = () => {
    const mutation = gql`
    mutation($year: Int!, $month: Int!, $day: Int!, $hour: Int!){
        addSlot(year: $year, month: $month, day: $day, hour: $hour) {
          available,
          day,
          dni,
          hour,
          month,
          year
        }
      }
    `;

    const [mymutation] = useMutation(mutation);

    const [year,setYear] = useState<number>();
    const [month, setMonth] = useState<number>();
    const [day,setDay] = useState<number>();
    const [hour, setHour] = useState<number>();



    
    return(
        <>
        <Link href="/medico">Volver a menu medico</Link>
        <div>Hola que necesita añadir?</div>
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
        <button onClick={(e) => {mymutation({variables: {year:year,month:month,hour:hour,day:day}})}}> Añadir</button>

        </>
        )
}
export default Anadir;