import styles from './About.module.css'
import foto from '../../utils/foto henry.jpg'

const About = () => {
    return (
        <div className={styles.about}>
            <h2>Acerca de mi</h2>
            <p>mi nombre es Valentin Dealbera, soy musico y programador.
                vengo de un pequeño pueblo llamado Monte Caseros, en la provinica de corrientes
                en Argentina, toda mi vida me han apasionado el gaming, la programacion y la musica.
                me he dedicado a la musica hasta el año 2023 cuando gracias a recomendaciones de amigos
                comence a hacer la carrera de fullstack development en Soyhenry, lo cual ha traido
                muchas cosas buenas en mi vida, la programacion es algo en lo que siempre he sido curioso
                pero nunca tuve el coraje para hacerlo, hasta hoy, y gracias a los conocimientos
                que Soyhenry me esta dando, he sido capaz de construir esta aplicacion.
            </p>
            <img className={styles.img} src={foto} alt="Valentin Dealbera" />
        </div>
    )
}

export default About