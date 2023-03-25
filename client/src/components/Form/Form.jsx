import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { validate } from "./validation";
import styles from "./Form.module.css";
import axios from 'axios'
import {
  emptyFilter, getAllDogs
} from "../../redux/actions";

const Form = (props) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    setTemperament([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const navigate = useNavigate()
  const [preview, setPreview] = useState({
    name: "",
    image: "",
    weightMin: 0,
    weightMax: 0,
  });
  const [temperament, setTemperament] = useState([])
  const [form, setForm] = useState({
    name: "",
    image: "",
    heightMin: 0,
    heightMax: 0,
    weightMin: 0,
    weightMax: 0,
    life_spanMin: 0,
    life_spanMax: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    heightMin: null,
    heightMax: null,
    weightMin: null,
    weightMax: null,
    life_spanMin: null,
    life_spanMax: null,
  });
  
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setPreview({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
      );
    };
    
    function toUpperCase(strings){
      try {
        const newarr = strings.trim().split(' ').map(e=>{
          const aux = e[0]
          return aux.toUpperCase() + e.slice(1).toLowerCase()
      })
      return newarr.join(' ')
      } catch (error) {
        // console.log(error.message);
      }
      }
  const submitHandler = (event) => {
    event.preventDefault()
    const {name, image, heightMin, heightMax, weightMin, weightMax, life_spanMin, life_spanMax} = form
    if (!name || !image || !heightMin || !heightMax || !weightMin || !weightMax || !life_spanMin || !life_spanMax || temperament.length < 1){
      return window.alert('Datos incompletos')
    }
    axios.post("/dogs", {
      name: toUpperCase(name),
      image: image,
      height: `${heightMin} - ${heightMax}`,
      weight: `${weightMin} - ${weightMax}`,
      life_span: `${life_spanMin} - ${life_spanMax} years`,
      temperament: temperament
    }).then(response => response.data).then(data=> dispatch(emptyFilter())).then(data=>dispatch(getAllDogs())).then(navigate('/home')).catch(error=> console.log(error.message))
    setForm({
      name: "",
      image: "",
      heightMin: 0,
      heightMax: 0,
      weightMin: 0,
      weightMax: 0,
      life_spanMin: 0,
      life_spanMax: 0,
      temperament: "",
    })
      setTemperament([])
  };
  const mapTemperaments = () => {
    return props.temperaments.filter(e=> !temperament.includes(e.name)).map((e, i) => {
      return (
        <option key={i} value={e.name}>
          {e.name}
        </option>
      );
    });
  };
  const tempHandler = (event) => {
    setTemperament([...temperament, event.target.value])
    event.target.value = 'Default'
  }
  const eliminateTemp = (event) => {
    setTemperament(temperament.filter(e=> e !== event.target.value))
  }
  return (
    <div className={styles.form}>
    <form className={styles.form2} onSubmit={submitHandler}>
      <div className={styles.nameForm}>
      <label className={styles.label}>Name </label>
      <input placeholder="Enter your buddy's name!" className={errors.name && styles.warning} onChange={changeHandler} type="text" value={form.name} name="name" />
      <p className={styles.danger}>{errors.name}</p>
      </div>
      <div className={styles.imageForm}>
      <label className={styles.label}>Image </label>
      <input placeholder="Enter your buddy's image url!" className={errors.image && styles.warning} onChange={changeHandler} type="text" value={form.image} name="image" />
      <p className={styles.danger}>{errors.image}</p>
      </div>
      <div className={styles.heightForm}>
      <label className={styles.label}>height </label>
      <input min='0' className={styles.input && errors.heightMin !== 0 && styles.warning} onChange={changeHandler} type="number" value={form.heightMin ? form.heightMin : ''} name="heightMin" />
      <p className={styles.danger}>{errors.heightMin}</p>
      <label className={styles.label}> - </label>
      <input min='0' className={styles.input && errors.heightMax !== 0 && styles.warning} onChange={changeHandler} type="number" value={form.heightMax ? form.heightMax : ''} name="heightMax" />
      <p className={styles.danger}>{errors.heightMax}</p>
      <label className={styles.label}> Cm.</label>
      </div>
      <div className={styles.weightForm}>
      <label className={styles.label}>weight </label>
      <input min='0' className={styles.input && errors.weightMin !== 0 && styles.warning} onChange={changeHandler} type="number" value={form.weightMin ? form.weightMin : ''} name="weightMin" />
      <p className={styles.danger}>{errors.weightMin}</p>
      <label className={styles.label}> - </label>
      <input min='0' className={styles.input && errors.weightMax !== 0 && styles.warning} onChange={changeHandler} type="number" value={form.weightMax ? form.weightMax : ''} name="weightMax" />
      <p className={styles.danger}>{errors.weightMax}</p>
      <label className={styles.label}> kg.</label>
      </div>
      <div className={styles.lifeSpanForm}>
      <label className={styles.label}>life span </label>
      <input min='0' className={styles.input && errors.life_spanMin !== 0 && styles.warning} onChange={changeHandler} type="number" value={form.life_spanMin ? form.life_spanMin : ''} name="life_spanMin" />
      <p className={styles.danger}>{errors.life_spanMin}</p>
      <label className={styles.label}> - </label>
      <input min='0' className={styles.input && errors.life_spanMax !== 0 && styles.warning} onChange={changeHandler} type="number" value={form.life_spanMax ? form.life_spanMax : ''} name="life_spanMax" />
      <p className={styles.danger}>{errors.life_spanMax}</p>
      <label className={styles.label}> Years</label>
      </div>
      <div className={styles.tempForm}>
      <select defaultValue="Default" onChange={tempHandler}>
        <option disabled value="Default">Select a temperament</option>
        {mapTemperaments()}
      </select>
      </div>
      <div className={styles.submit}>
      <button className={styles.submitButton}>Submit</button>
      </div>
    </form>
    <div className={styles.preview}>
    <div className={styles.card}>
        <div className={styles.image}>
        <img className={styles.img} src={preview.image} alt={props.name} />
        </div>
        <div className={styles.name}>
        <p className={styles.nameString}>{toUpperCase(preview.name)}</p>
        </div>
        <div className={styles.weight}>
        <p className={styles.weightNumber}>{preview.weightMin} - {preview.weightMax} kg.</p>
        <p className={styles.previewText}>Preview</p>
        <div className={styles.tempAdvice}>
        {temperament.length > 0 && <p>Click on a temperament to eliminate it</p>}
        </div>
        </div>
        <div className={styles.temp}>
        {temperament.map((e,i)=> <button className={styles.tempButtons} value={e} onClick={eliminateTemp} key={i}>{e}</button>)}
        </div>
      </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    filteredDogs: state.filteredDogs,
    temperaments: state.temperaments,
  };
}

export default connect(mapStateToProps, null)(Form);
