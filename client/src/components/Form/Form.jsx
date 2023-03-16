import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { validate } from "./validation";
import style from "./Form.module.css";
import axios from 'axios'

const Form = (props) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    image: "",
    heightMin: 0,
    heightMax: 0,
    weightMin: 0,
    weightMax: 0,
    life_spanMin: 0,
    life_spanMax: 0,
    temperament: "",
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
    temperament: "",
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
    const {name, image, heightMin, heightMax, weightMin, weightMax, life_spanMin, life_spanMax, temperament} = form
    if (!name || !image || !heightMin || !heightMax || !weightMin || !weightMax || !life_spanMin || !life_spanMax || !temperament){
        return window.alert('Datos incompletos')
    }
    axios.post("http://localhost:3001/dogs", {
        name: name,
        image: image,
        height: `${heightMin} - ${heightMax}`,
        weight: `${weightMin} - ${weightMax}`,
        life_span: `${life_spanMin} - ${life_spanMax} years`,
        temperament: temperament.split(',').map(e=>Number(e))
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
    setTimeout(navigate('/home'),3000)
  };
  return (
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
      <label className={style.label}>temperament</label>
      <input className={errors.temperament && style.warning} onChange={changeHandler} type="text" value={form.temperament} name="temperament" />
      <p className={style.danger}>{errors.temperament}</p>
      <button>Submit</button>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    filteredDogs: state.filteredDogs,
    temperaments: state.temperaments,
  };
}

export default connect(mapStateToProps, null)(Form);
