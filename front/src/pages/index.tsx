import Link from "next/link";


export default function Home() {
  return (
    <>
     <Link href="/medico">Soy medico</Link>
     <br/>
     <Link href="/paciente">Soy paciente</Link>
    </>
  )
}
