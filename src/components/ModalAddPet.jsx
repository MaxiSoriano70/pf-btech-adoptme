import style from '../css/ModalAddPet.module.css';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAdoptMeState } from '../Context';

const ModalAddPet = ({ show, handleClose }) => {

    const { state } = useAdoptMeState();
    const isDark = state.modeDark;

    const themeBody = isDark ? style.bgColorBodyDark : style.bgColorBodyLigth;
    const themeInput = isDark ? style.inputDark : style.inputLigth;

    const [form, setForm] = useState({
        foto: null,
        nombre: '',
        fechaNacimiento: '',
        especie: '',
        sexo: '',
        raza: '',
        esterilizado: '',
        domicilio: '',
        telefono: '',
        descripcion: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setForm({
            ...form,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const validate = () => {
        let err = {};

        if (form.nombre.trim().length < 3) err.nombre = "Mínimo 3 caracteres";
        if (form.raza.trim().length < 3) err.raza = "Mínimo 3 caracteres";
        if (form.domicilio.trim().length < 3) err.domicilio = "Mínimo 3 caracteres";

        if (!form.fechaNacimiento) {
            err.fechaNacimiento = "Requerido";
        } else {
            const hoy = new Date();
            const fecha = new Date(form.fechaNacimiento);
            if (fecha >= hoy) err.fechaNacimiento = "Debe ser menor a hoy";
        }

        if (!form.especie) err.especie = "Seleccionar especie";
        if (!form.sexo) err.sexo = "Seleccionar sexo";
        if (!form.esterilizado) err.esterilizado = "Seleccionar opción";

        if (!form.telefono) err.telefono = "Requerido";

        if (form.descripcion.length < 5) err.descripcion = "Muy corta";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log("DATA:", form);
            handleClose();
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
            contentClassName={themeBody}
        >
            <Modal.Header closeButton className={style.bgColorF}>
                <Modal.Title>Agregar Mascota</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    {/* FOTO */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Subir foto</Form.Label>
                        <Form.Control type="file" name="foto" onChange={handleChange} className={themeInput} />
                    </Form.Group>

                    {/* NOMBRE */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            onChange={handleChange}
                            isInvalid={!!errors.nombre}
                            className={themeInput}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nombre}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* FECHA */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Fecha de nacimiento</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaNacimiento"
                            onChange={handleChange}
                            isInvalid={!!errors.fechaNacimiento}
                            className={themeInput}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.fechaNacimiento}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* ESPECIE */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold w-100">Especie</Form.Label>

                        <Form.Check inline label="🐶 Canino" name="especie" type="radio" value="canino" onChange={handleChange} />
                        <Form.Check inline label="🐱 Felino" name="especie" type="radio" value="felino" onChange={handleChange} />

                        {errors.especie && (
                            <div className="text-danger">{errors.especie}</div>
                        )}
                    </Form.Group>

                    {/* SEXO */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold w-100">Sexo</Form.Label>

                        <Form.Check inline label="♂ Macho" name="sexo" type="radio" value="macho" onChange={handleChange} />
                        <Form.Check inline label="♀ Hembra" name="sexo" type="radio" value="hembra" onChange={handleChange} />

                        {errors.sexo && (
                            <div className="text-danger">{errors.sexo}</div>
                        )}
                    </Form.Group>

                    {/* RAZA */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Raza</Form.Label>
                        <Form.Control
                            name="raza"
                            onChange={handleChange}
                            isInvalid={!!errors.raza}
                            className={themeInput}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.raza}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* ESTERILIZADO */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold w-100">Esterilizado</Form.Label>

                        <Form.Check inline label="Sí" name="esterilizado" type="radio" value="si" onChange={handleChange} />
                        <Form.Check inline label="No" name="esterilizado" type="radio" value="no" onChange={handleChange} />

                        {errors.esterilizado && (
                            <div className="text-danger">{errors.esterilizado}</div>
                        )}
                    </Form.Group>

                    {/* DOMICILIO */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Domicilio</Form.Label>
                        <Form.Control
                            name="domicilio"
                            onChange={handleChange}
                            isInvalid={!!errors.domicilio}
                            className={themeInput}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.domicilio}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* TELEFONO */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Teléfono</Form.Label>
                        <Form.Control
                            name="telefono"
                            onChange={handleChange}
                            isInvalid={!!errors.telefono}
                            className={themeInput}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.telefono}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* DESCRIPCION */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            onChange={handleChange}
                            isInvalid={!!errors.descripcion}
                            className={themeInput}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.descripcion}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* BOTONES */}
                    <div className="d-flex justify-content-center">
                        <Button type="submit" className={style.btnPersonalized1 + " mx-1 fw-bold"}>
                            Agregar
                        </Button>
                        <Button type="button" onClick={handleClose} className={style.btnPersonalized2 + " mx-1 fw-bold"}>
                            Cancelar
                        </Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddPet;