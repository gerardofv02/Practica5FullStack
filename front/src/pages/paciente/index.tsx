import Link from "next/link";

const Paciente = () => {
    return(
        <>
        <Link href="/">Volver a selección paciente/medico</Link>
        <div>Hola Paciente, ¿Que desea hacer?</div>
        <br/>
        <Link href="/paciente/reservadas">Ver citas reservadas</Link>
        <br/>
        <Link href="/paciente/reservar">Reservar una cita</Link>
        </>
    
    )
}
export default Paciente;