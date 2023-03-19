import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { validate } from "./validation";
import style from "./Form.module.css";
import axios from 'axios'
import {
  emptyFilter
} from "../../redux/actions";

const Form = (props) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    setTemperament([])
    return ()=>{
      dispatch(emptyFilter())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const navigate = useNavigate()
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
    heightMin: 0,
    heightMax: 0,
    weightMin: 0,
    weightMax: 0,
    life_spanMin: 0,
    life_spanMax: 0,
  });
  
  const changeHandler = (event) => {
    setForm({
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
    
  const submitHandler = (event) => {
    event.preventDefault()
    const {name, image, heightMin, heightMax, weightMin, weightMax, life_spanMin, life_spanMax} = form
    if (!name || !image || !heightMin || !heightMax || !weightMin || !weightMax || !life_spanMin || !life_spanMax){
      return window.alert('Datos incompletos')
    }
    axios.post("http://localhost:3001/dogs", {
      name: name,
      image: image,
      height: `${heightMin} - ${heightMax}`,
      weight: `${weightMin} - ${weightMax}`,
      life_span: `${life_spanMin} - ${life_spanMax} years`,
      temperament: temperament
    }).then(response => response.data).then(data=> console.log(data)).catch(error=> console.log(error.message))
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
      dispatch(emptyFilter())
      navigate("/home")
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
    <div>
    <form className={style.form} onSubmit={submitHandler}>
      <label className={style.label}>Name</label>
      <input className={errors.name && style.warning} onChange={changeHandler} type="text" value={form.name} name="name" />
      <p className={style.danger}>{errors.name}</p>
      <label className={style.label}>Image</label>
      <input className={errors.image && style.warning} onChange={changeHandler} type="text" value={form.image} name="image" />
      <p className={style.danger}>{errors.image}</p>
      <label className={style.label}>heightMin</label>
      <input className={errors.heightMin && style.warning} onChange={changeHandler} type="number" value={form.heightMin} name="heightMin" />
      <p className={style.danger}>{errors.heightMin}</p>
      <label className={style.label}>heightMax</label>
      <input className={errors.heightMax && style.warning} onChange={changeHandler} type="number" value={form.heightMax} name="heightMax" />
      <p className={style.danger}>{errors.heightMax}</p>
      <label className={style.label}>weightMin</label>
      <input className={errors.weightMin && style.warning} onChange={changeHandler} type="number" value={form.weightMin} name="weightMin" />
      <p className={style.danger}>{errors.weightMin}</p>
      <label className={style.label}>weightMax</label>
      <input className={errors.weightMax && style.warning} onChange={changeHandler} type="number" value={form.weightMax} name="weightMax" />
      <p className={style.danger}>{errors.weightMax}</p>
      <label className={style.label}>life_spanMin</label>
      <input className={errors.life_spanMin && style.warning} onChange={changeHandler} type="number" value={form.life_spanMin} name="life_spanMin" />
      <p className={style.danger}>{errors.life_spanMin}</p>
      <label className={style.label}>life_spanMax</label>
      <input className={errors.life_spanMax && style.warning} onChange={changeHandler} type="number" value={form.life_spanMax} name="life_spanMax" />
      <p className={style.danger}>{errors.life_spanMax}</p>
      <select defaultValue="Select Temperament" onChange={tempHandler}>
        <option disabled value="Default">Select a temperament</option>
        {mapTemperaments()}
      </select>
      <button>Submit</button>
    </form>
    <ul>{temperament.map(e=>{
    return (<div key={e}>
      <p >{e}</p>
      <button value={e} onClick={eliminateTemp}>x</button>
      </div>
    )
  })}</ul>
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
