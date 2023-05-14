import Link from "next/link";

const Medico = () => {
    return(
        <>
        <Link href="/">Volver a selección paciente/medico</Link>
        <div>Hola medico, ¿Que desea hacer?</div>
        <br/>
        <Link href="/medico/anadir">Añadir cita</Link>
        <br/>
        <Link href="/medico/remover">Remover cita</Link>
        </>
    )
}
export default Medico;