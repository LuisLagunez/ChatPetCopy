import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));
export function PagosFacturacion(){
    return (
        <Box sx={{flexGrow: 1, margin: '5vh'}}>
            <Typography
            sx={{mb: 2}}
            variant='h5'
            >
                Pagos y facturación
            </Typography>
            <Grid container spacing={{xs: 2, md: 4}} columns={{ xs: 4, sm: 12, md: 12}}>
                <Grid size={{xs: 12,sm: 12,md:12}}>
                    <Box
                    sx={{
                        width: '100%',
                        height: '75vh',
                        borderRadius: '10px',
                        alignContent: 'center',
                        textAlign: 'center'
                    }}
                    >
                        <Typography
                        variant='h6' 
                        > PRÓXIMAMENTE</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PagosFacturacion