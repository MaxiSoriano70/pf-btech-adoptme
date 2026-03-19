import style from '../css/ModalAddPet.module.css';
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAdoptMeState } from '../Context';
import { uploadImage } from '../assets/utils/Cloudinary';
import { updatePet } from '../firebase/service';
import Swal from 'sweetalert2';

const ModalEditPet = ({ show, handleClose, pet }) => {
    const { state, dispatch } = useAdoptMeState();
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
        descripcion: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (pet) {
            setForm({
                foto: null,
                nombre: pet.nombre || '',
                fechaNacimiento: pet.fechaNacimiento || '',
                especie: pet.especie || '',
                sexo: pet.sexo || '',
                raza: pet.raza || '',
                esterilizado: pet.esterilizado || '',
                domicilio: pet.domicilio || '',
                telefono: pet.telefono || '',
                descripcion: pet.descripcion || '',
            });
        }
    }, [pet]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                Swal.fire({ icon: 'error', title: 'Archivo inválido', text: 'Solo se permiten imágenes' });
                return;
            }
            setForm({ ...form, [name]: file });
            return;
        }

        setForm({ ...form, [name]: value });
    };

    const validate = () => {
        let err = {};
        if (form.nombre.trim().length < 3) err.nombre = "Mínimo 3 caracteres*";
        if (form.raza.trim().length < 3) err.raza = "Mínimo 3 caracteres*";
        if (form.domicilio.trim().length < 3) err.domicilio = "Mínimo 3 caracteres*";
        if (!form.fechaNacimiento) {
            err.fechaNacimiento = "Campo obligatorio*";
        } else {
            const fecha = new Date(form.fechaNacimiento);
            if (fecha >= new Date()) err.fechaNacimiento = "Debe ser menor a hoy*";
        }
        if (!form.especie) err.especie = "Seleccionar especie*";
        if (!form.sexo) err.sexo = "Seleccionar sexo*";
        if (!form.esterilizado) err.esterilizado = "Seleccionar opción*";
        if (!form.telefono) err.telefono = "Campo obligatorio*";
        if (form.descripcion.length < 5) err.descripcion = "Mínimo 5 caracteres*";
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            Swal.fire({
                title: 'Guardando cambios...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            let imageUrl = pet.foto;
            if (form.foto) {
                imageUrl = await uploadImage(form.foto);
            }

            const updatedData = { ...form, foto: imageUrl };

            await updatePet(pet.id, updatedData);

            dispatch({
                type: "UPDATE_PET",
                payload: { id: pet.id, ...updatedData }
            });

            Swal.fire({ icon: 'success', title: '✅ Mascota actualizada', text: 'Los cambios se guardaron correctamente' });

            setErrors({});
            handleClose();

        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar la mascota' });
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" contentClassName={themeBody}>
            <Modal.Header closeButton className={style.bgColorF}>
                <Modal.Title>Editar Mascota</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Subir nueva foto (opcional)</Form.Label>
                        <Form.Control type="file" name="foto" onChange={handleChange} className={themeInput} accept="image/png, image/jpeg"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Nombre</Form.Label>
                        <Form.Control value={form.nombre} name="nombre" onChange={handleChange} isInvalid={!!errors.nombre} className={themeInput}/>
                        <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Fecha de nacimiento</Form.Label>
                        <Form.Control type="date" value={form.fechaNacimiento} name="fechaNacimiento" onChange={handleChange} isInvalid={!!errors.fechaNacimiento} className={themeInput}/>
                        <Form.Control.Feedback type="invalid">{errors.fechaNacimiento}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold w-100">Especie</Form.Label>
                        <Form.Check inline label="🐶 Canino" name="especie" type="radio" value="canino" onChange={handleChange} checked={form.especie === 'canino'}/>
                        <Form.Check inline label="🐱 Felino" name="especie" type="radio" value="felino" onChange={handleChange} checked={form.especie === 'felino'}/>
                        {errors.especie && <div className="text-danger">{errors.especie}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold w-100">Sexo</Form.Label>
                        <Form.Check inline label="♂ Macho" name="sexo" type="radio" value="macho" onChange={handleChange} checked={form.sexo === 'macho'}/>
                        <Form.Check inline label="♀ Hembra" name="sexo" type="radio" value="hembra" onChange={handleChange} checked={form.sexo === 'hembra'}/>
                        {errors.sexo && <div className="text-danger">{errors.sexo}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Raza</Form.Label>
                        <Form.Control value={form.raza} name="raza" onChange={handleChange} isInvalid={!!errors.raza} className={themeInput}/>
                        <Form.Control.Feedback type="invalid">{errors.raza}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold w-100">Esterilizado</Form.Label>
                        <Form.Check inline label="Sí" name="esterilizado" type="radio" value="si" onChange={handleChange} checked={form.esterilizado === 'si'}/>
                        <Form.Check inline label="No" name="esterilizado" type="radio" value="no" onChange={handleChange} checked={form.esterilizado === 'no'}/>
                        {errors.esterilizado && <div className="text-danger">{errors.esterilizado}</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Domicilio</Form.Label>
                        <Form.Control value={form.domicilio} name="domicilio" onChange={handleChange} isInvalid={!!errors.domicilio} className={themeInput}/>
                        <Form.Control.Feedback type="invalid">{errors.domicilio}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Teléfono</Form.Label>
                        <Form.Control value={form.telefono} name="telefono" onChange={handleChange} isInvalid={!!errors.telefono} className={themeInput}/>
                        <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Descripción</Form.Label>
                        <Form.Control as="textarea" rows={3} value={form.descripcion} name="descripcion" onChange={handleChange} isInvalid={!!errors.descripcion} className={themeInput}/>
                        <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button type="submit" className={style.btnPersonalized1 + " mx-1 fw-bold"}>Guardar</Button>
                        <Button type="button" onClick={handleClose} className={style.btnPersonalized2 + " mx-1 fw-bold"}>Cancelar</Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalEditPet;