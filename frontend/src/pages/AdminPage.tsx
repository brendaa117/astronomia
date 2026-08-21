import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchObjetos, eliminarObjeto } from '../api/astronomiaApi';
import type { ObjetoAstronomico } from '../types';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from '@mui/material';

const AdminPage: React.FC = () => {
  const [objetos, setObjetos] = useState<ObjetoAstronomico[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchObjetos().then(setObjetos);
  }, []);

  const handleDelete = async (id: number) => {
    await eliminarObjeto(id);
    setObjetos(objetos.filter(o => o.id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objetos.map(obj => (
            <TableRow key={obj.id}>
              <TableCell>{obj.id}</TableCell>
              <TableCell>{obj.nombre}</TableCell>
              <TableCell>{obj.tipo}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/objects/${obj.id}`)}>Ver</Button>
                <Button onClick={() => navigate(`/objects/${obj.id}/edit`)}>Editar</Button>
                <Button color="error" onClick={() => handleDelete(obj.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={() => navigate('/objects/new')}>
        + Nuevo Objeto
      </Button>
    </TableContainer>
  );
};

export default AdminPage;