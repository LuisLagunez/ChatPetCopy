import * as React from 'react';
import {
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Paper,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stack,
  Radio,
  Checkbox,
  InputAdornment,
  Popover
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const steps = ['INFORMACIÓN PERSONAL', 'INFORMACIÓN DE LA MASCOTA', 'PREFERENCIAS DEL SERVICIO', 'CONFIRMAR'];

export default function ClientePersonal() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const ColorButton = styled(Button)(({}) => ({
    backgroundColor: '#5d8c4c',
    '&:hover': {
      backgroundColor: orange[700],
    }
  }))

  const [nombre, setNombre] = React.useState('');
  const [apellidos, setApellidos] = React.useState('');
  const [correo, setCorreo] = React.useState('');
  const [contrasena, setContrasena] = React.useState('');
  const [direccion, setDireccion] = React.useState('');
  const [codigoPostal, setCodigoPostal] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  const [identificacion, setIdentificacion] = React.useState('');
  const [selfie, setSelfie] = useState(null);

  const [nombreMascota, setNombreMascota] = React.useState('');
  const [pesoMascota, setPesoMascota] = React.useState('');

  const [tipoMascota, setTipoMascota] = React.useState('');
  const handleTipoMascotaChange = (event) => {
    setTipoMascota(event.target.value);
  }
  const [tipoServicioPreferente, setTipoServicioPreferente] = React.useState('');
  const handleTipoServicioPreferenteChange = (event) => {
    setTipoServicioPreferente(event.target.value);
  }
  const [frecuenciaUso, setFrecuenciaUso] = React.useState('');
  const handleFrecuenciaUsoChange = (event) => {
    setFrecuenciaUso(event.target.value);
  }
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = React.useState(false);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const [registroConfirmado, setRegistroConfirmado] = useState(false);

const handleFinalizar = async () => {
  if (!registroConfirmado) {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellidos', apellidos);
    formData.append('correo', correo);
    formData.append('contrasena', contrasena);
    formData.append('direccion', direccion);
    formData.append('codigoPostal', codigoPostal);
    formData.append('telefono', telefono);
    formData.append('identificacion', identificacion);
    formData.append('nombreMascota', nombreMascota);
    formData.append('pesoMascota', pesoMascota);
    formData.append('tipoMascota', tipoMascota);
    formData.append('tipoServicioPreferente', tipoServicioPreferente);
    formData.append('frecuenciaUso', frecuenciaUso);
    if (selfie) {
      formData.append('selfie', selfie);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/cliente', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Cliente registrado:', res.data);
      setActiveStep((prev) => prev + 1);
      setRegistroConfirmado(true);
    } catch (error) {
      console.error('Error al registrar cliente:', error);
    }
  } else {
    // login automático
    try {
      const loginRes = await axios.post('http://localhost:5000/api/login', {
        correo,
        contrasena,
      });
      localStorage.setItem('usuario', JSON.stringify(loginRes.data.usuario));
      navigate('/dashboard-cliente');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }
};

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopOverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [correoError, setCorreoError] = useState(false);
  const [correoHelper, setCorreoHelper] = useState('');
  const validarCorreo = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const renderRightPanelContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant='h6' align='center' sx={{color:'black', marginTop:2}}>INFORMACIÓN PERSONAL</Typography>

            <Box sx={{display:'flex', gap:2}}>
              <TextField
                fullWidth
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                margin="normal"
                sx={{ width:'50%' }}
              />
              <TextField
                fullWidth
                label="Apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                margin="normal"
                sx={{ width:'50%' }}
              />
            </Box>
            
            <Box sx={{display:'flex', gap:2}}>
              <TextField
                fullWidth
                label="Identificación"
                value={identificacion}
                onChange={(e) => {
                  setIdentificacion(e.target.value);
                  handlePopoverClose();
                }}
                margin="normal"
                sx={{ width:'50%' }}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopOverOpen}
                onMouseLeave={handlePopoverClose}
                onFocus={handlePopoverClose}
              />
              <Popover
                disablePortal={true}
                id="mouse-over-popover"
                sx={{ pointerEvents: 'none'}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                PaperProps={{
                  sx: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    padding: 0,
                  }
                }}
              >
                <Typography sx={{ color: 'black' }}>Introduzca su clave de lector.</Typography>
              </Popover>
              <Button 
                variant='outlined' 
                startIcon={<PhotoCamera/>} 
                component="label"
                sx={{width:'50%', alignSelf:'center', height:'56px', marginTop:1}}
              >
                Selfie
                <input 
                  hidden 
                  accept="image/*" 
                  type="file" 
                  onChange={(e) => setSelfie(e.target.files[0])}
                />
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Correo electrónico"
                value={correo}
                onChange={(e) => {
                  const valor = e.target.value;
                  setCorreo(e.target.value);
                  if(!validarCorreo(valor)) {
                    setCorreoError(true);
                  } else {
                    setCorreoError(false);
                  }
                }}
                margin="normal"
                sx={{ width: '50%' }}
                error={correoError}
              />
              <TextField
                label="Contraseña"
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                margin="normal"
                sx={{ width: '50%' }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                margin="normal"
              />
            </Box>

            <Box sx={{display:'flex', gap:2}}>
              <TextField
                fullWidth
                label="Código postal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                margin="normal"
                sx={{ width:'50%' }}
              />
              <TextField
                fullWidth
                label="Número telefónico"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                margin="normal"
                sx={{ width:'50%' }}
              />
            </Box>
          </Box>
        );
      case 1:
        return(
            <Box>
                <Typography variant='h6' align='center' sx={{color:'black', marginBottom:3}}>INFORMACIÓN DE SERVICIO</Typography>
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <Typography variant='subtitle1' color='#5c5653'>Foto de mascota</Typography>
                    <Button 
                    variant='outlined' 
                    startIcon={<PhotoCamera/>} 
                    component="label"
                    sx={{width:'100%', alignSelf:'center', height:'75px', marginTop:1}}>
                        Sube una foto
                        <input hidden accept="imagen/*" type="file" onChange={() => {}}/>
                    </Button>
                </Box>
                <Box sx={{display:'flex', gap:2, marginTop:1}}>
                    <FormControl>
                        <Typography variant='subtitle1' color='#5c5653'>Tipo de mascota</Typography>
                        <RadioGroup
                        row
                        aria-labelledby='demo-radio-buttons-group-label'
                        value={tipoMascota}
                        onChange={handleTipoMascotaChange}
                        name="tipo-mascota"
                        >
                        <Paper sx={{width:'163px', p: 0, marginRight:2}}>
                            <Stack align="center" spacing={0.5}>
                                <FormControlLabel value="perro" control={<Radio/>}/>
                                <img
                                    src='/perrito.png'
                                    alt="Perro"
                                    style={{width:'50px', height:'50px', objectFit:'contain', margin:2, marginLeft:'48px'}}
                                />
                                <Typography variant='h7'>PERRO</Typography>
                            </Stack>
                        </Paper>
                        <Paper sx={{width:'162px', p: 0}}>
                            <Stack align="center" spacing={0.5}>
                                <FormControlLabel value="gato" control={<Radio/>}/>
                                <img
                                    src='/gatito.png'
                                    alt="Gato"
                                    style={{width:'50px', height:'50px', objectFit:'contain', margin:2, marginLeft:'48px'}}
                                />
                                <Typography variant='h7'>GATO</Typography>
                            </Stack>
                        </Paper>
                        </RadioGroup>
                    </FormControl>
                </Box>

                {/* contenido condicional basado en el tipo seleccionado */}
                {tipoMascota === 'perro' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop:1}}>
                        <Typography variant="subtitle1" color="#5c5653">Datos de tu perrito</Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                              fullWidth
                              label="Nombre"
                              value={nombreMascota}
                              onChange={(e) => setNombreMascota(e.target.value)}
                              margin="normal"
                              sx={{ width: '50%' }}
                            />
                            <TextField
                              fullWidth
                              label="Peso"
                              value={pesoMascota}
                              onChange={(e) => setPesoMascota(e.target.value)}
                              margin="normal"
                              sx={{ width: '50%' }}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                              }}
                            />
                        </Box>
                    </Box>
                )}
                {tipoMascota === 'gato' && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', marginTop:1}}>
                    <Typography variant="subtitle1" color="#5c5653">Datos de tu gatito</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        value={nombreMascota}
                        onChange={(e) => setNombreMascota(e.target.value)}
                        margin="normal"
                        sx={{ width: '50%' }}
                      />
                      <TextField
                        fullWidth
                        label="Peso"
                        value={pesoMascota}
                        onChange={(e) => setPesoMascota(e.target.value)}
                        margin="normal"
                        sx={{ width: '50%' }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">kg</InputAdornment>
                        }}
                      />
                    </Box>
                  </Box>
                )}
           </Box>
        );
      case 2:
        return(
          <Box>
            <Typography variant='h6' align='center' sx={{color:'black', marginBottom:3}}>PREFERENCIAS DEL SERVICIO</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormLabel>Tipo de servicios que busca:</FormLabel>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby='demo-radio-buttons-group-label'
                            value={tipoServicioPreferente}
                            onChange={handleTipoServicioPreferenteChange}
                            name='tipo-servicio-preferente'
                        >
                            <Paper sx={{width:'150px', p:0, marginRight:2, marginBottom:1}}>
                                <Stack align="center" spacing={0.5}>
                                    <FormControlLabel value="paseos" control={<Radio/>}/>
                                    <Typography sx={{fontSize:'12px'}}>PASEOS</Typography>
                                </Stack>
                            </Paper>
                            <Paper sx={{width:'150px', p:0, marginRight:2, marginBottom:1}}>
                                <Stack align="center" spacing={0.5}>
                                    <FormControlLabel value="cuidado" control={<Radio/>}/>
                                    <Typography sx={{fontSize:'12px'}}>CUIDADO / HOSPEDAJE</Typography>
                                </Stack>
                            </Paper>
                            <Paper sx={{width:'150px', p:0, marginRight:2}}>
                                <Stack align="center" spacing={0.5}>
                                    <FormControlLabel value="entrenamiento" control={<Radio/>}/>
                                    <Typography sx={{fontSize:'12px'}}>ENTRENAMIENTO</Typography>
                                </Stack>
                            </Paper>
                            <Paper sx={{width:'150px', p:0, marginRight:2}}>
                                <Stack align="center" spacing={0.5}>
                                    <FormControlLabel value="transporte" control={<Radio/>}/>
                                    <Typography sx={{fontSize:'12px'}}>TRANSPORTE</Typography>
                                </Stack>
                            </Paper>
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormLabel>Frecuencia de uso:</FormLabel>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby='demo-radio-buttons-group-label'
                            value={frecuenciaUso}
                            onChange={handleFrecuenciaUsoChange}
                            name='tipo-servicio-preferente'
                        >
                            <Paper sx={{width:'150px', p:0, marginRight:2, marginBottom:1}}>
                                <Stack align="center" spacing={0.5}>
                                    <FormControlLabel value="ocasional" control={<Radio/>}/>
                                    <Typography sx={{fontSize:'12px'}}>OCASIONAL</Typography>
                                </Stack>
                            </Paper>
                            <Paper sx={{width:'150px', p:0, marginRight:2, marginBottom:1}}>
                                <Stack align="center" spacing={0.5}>
                                    <FormControlLabel value="semanal" control={<Radio/>}/>
                                    <Typography sx={{fontSize:'12px'}}>SEMANAL</Typography>
                                </Stack>
                            </Paper>
                            <Paper sx={{width:'150px', p:0, marginRight:2}}>
                                <Stack align="center" spacing={0.5}>
                                    <FormControlLabel value="quincenal" control={<Radio/>}/>
                                    <Typography sx={{fontSize:'12px'}}>QUINCENAL</Typography>
                                </Stack>
                            </Paper>
                            <Paper sx={{width:'150px', p:0, marginRight:2}}>
                                <Stack align="center" spacing={0.5}>
                                    <FormControlLabel value="mensual" control={<Radio/>}/>
                                    <Typography sx={{fontSize:'12px'}}>MENSUAL</Typography>
                                </Stack>
                            </Paper>
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
          </Box>
        );
      case 3:
        return(
          <Box>
            <Typography variant='h6' align='center' sx={{color:'black'}}>CONFIRMAR</Typography>
            <Typography variant='body1' align='center' sx={{marginTop:5,color:'black'}}>VERIFICA TU INFORMACIÓN ANTES DE CONTINUAR</Typography>
            <Typography variant='body1' align='center' sx={{marginTop:2,color:'gray', fontSize:'15px'}}>Revisa los datos que ingresaste para asegurarte de que sean correctos. Una vez registrado, podrás editar tu perfil en la configuración.</Typography>
            <Box sx={{marginTop:18}}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={acceptedTerms} 
                    onChange={(e) => setAcceptedTerms(e.target.checked)} 
                  />
                }
                label={
                  <Typography variant="body2" sx={{color:'black'}}>
                    Acepto los <strong>Términos y Condiciones</strong>
                  </Typography>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox 
                    checked={acceptedPrivacy} 
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)} 
                  />
                }
                label={
                  <Typography variant="body2" sx={{color:'black'}}>
                    Acepto la <strong>Política de privacidad</strong>
                  </Typography>
                }
              />
            </Box>
            
          </Box>
        );
      default:
        return(
          <Box>
            <Typography variant='h4' align='center' sx={{color:'black'}}>Bienvenido a la familia de CHAT PET</Typography>
            <Typography variant='body1' align='center' sx={{marginTop:5,color:'black'}}>HEMOS RECIBIDO TU INFORMACIÓN</Typography>
            <Typography variant='body1' align='center' sx={{marginTop:2,color:'gray', fontSize:'15px'}}>Ahora puedes encontrar los mejores servicios para tu mascota en{' '} <span style={{color:'#eb5d1e', fontWeight:'bold'}}>CHAT PET</span>.</Typography>
            <Typography variant='body1' align='center' sx={{marginTop:3,color:'gray', fontSize:'15px'}}>Explora prestadores cerca de ti, reserva servicios y disfruta de la tranquilidad de saber que tu mascota está en buenas manos.</Typography>
            <Typography variant='body1' align='center' sx={{marginTop:3,color:'gray', fontSize:'15px'}}>Presiona el botón de <strong>FINALIZAR</strong> para ir a tu perfil.</Typography>
          </Box>
        );
    }
  };

  return (
    <Grid 
      maxWidth="xlg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {/* Panel izquierdo con stepper */}
      <Grid 
        item 
        xs={12} 
        md={4} 
        sx={{
            position: 'relative',
            height: '529px',
            width: '320px',
            backgroundImage: 'url(/info-perrito.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            color: '#fff',
            p: 3,
            borderTopLeftRadius: '30px',
            borderBottomLeftRadius: '30px',
            overflow: 'hidden'
        }}
      >
        <Box sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(255, 87, 34, 0.82)',
            zIndex: 1,
          }}
        >
          {/* contendio encima de... */}
          <Box sx={{ position:'relative', zIndex:2, p:3 }}>
            <Typography align='center' variant='h4'>CHAT PET</Typography>
            <Typography variant='h6' align='center' sx={{marginBottom:2, color:'#ffc0a4', fontSize:'14px'}}>DUEÑO DE MASCOTA</Typography>
            <Stepper 
              activeStep={activeStep} 
              orientation="vertical"
              sx={{
                '& .MuiStepIcon-root': { color: 'lightgray' }, 
                '& .MuiStepIcon-root.Mui-active': { color: '#5d8c4c' }, 
                '& .MuiStepIcon-root.Mui-completed': { color: '#5d8c4c' }, 
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </Grid>

      {/* Panel derecho con contenido dinámico */}
      <Grid item xs={12} md={8} sx={{ marginLeft: 0, marginTop:0, border:2, borderColor:'#eb5d1e', borderTopRightRadius: '30px',
            borderBottomRightRadius: '30px', overflow: 'hidden'}}>
        <Grid sx={{p:2, backgroundColor:'#e6d7d0', height: '465px', width:'375px'}}>
          {renderRightPanelContent(activeStep)}
        </Grid>
        <Grid sx={{p:2, backgroundColor:'white', height: '60px', width:'350px'}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant='outlined'
              onClick={() => {
                if (activeStep === 0){
                  navigate('/tipo');
                } else {
                  handleBack();
                }
              }}
              sx={{ mr: 17, color:'gray', borderColor:'gray', borderRadius:2 }}
            >
              Atrás
            </Button>
            <ColorButton 
              variant="contained" 
              onClick={() => {
                console.log('Paso actual:', activeStep); // para confirmar
                if (activeStep >= steps.length - 1) {
                  handleFinalizar();
                } else {
                  handleNext();
                }
              }}
              sx={{ borderRadius: 2 }}
              disabled={activeStep === 3 && (!acceptedTerms || !acceptedPrivacy || correoError)}
            >
              {activeStep >= steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </ColorButton>
              {activeStep === steps.length && (
                <Box mt={2}>
                  <Typography>¡Completado!</Typography>
                </Box>
              )}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
