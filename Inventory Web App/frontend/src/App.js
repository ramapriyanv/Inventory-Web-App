import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, TextField, Button, IconButton, Box,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider,
    createTheme, CssBaseline
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff4081',
        },
    },
});

function App() {
    const [inventory, setInventory] = useState([]);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchInventory = () => {
        axios.get('http://localhost:5000/api/inventory')
            .then(response => setInventory(response.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const addInventory = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/inventory', { name, quantity: parseInt(quantity) })
            .then(() => {
                fetchInventory();
                setName('');
                setQuantity('');
            })
            .catch(error => console.error('Error adding item:', error));
    };

    const deleteInventory = (id) => {
        axios.delete(`http://localhost:5000/api/inventory/${id}`)
            .then(fetchInventory)
            .catch(error => console.error('Error deleting item:', error));
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setName(item.name);
        setQuantity(item.quantity);
        setOpen(true);
    };

    const handleUpdate = () => {
        axios.post(`http://localhost:5000/api/inventory`, { name, quantity: parseInt(quantity) })
            .then(() => {
                fetchInventory();
                setOpen(false);
                setEditItem(null);
                setName('');
                setQuantity('');
            })
            .catch(error => console.error('Error updating item:', error));
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                <Typography variant="h3" component="h1" align="center" marginTop={4} marginBottom={4}>
                    Inventory Management
                </Typography>
                <Box component="form" onSubmit={addInventory} sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                    <TextField
                        label="Item Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Quantity"
                        variant="outlined"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Add Item
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inventory.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        <IconButton color="secondary" onClick={() => deleteInventory(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <Button variant="outlined" color="primary" onClick={() => handleEdit(item)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Item Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                        <Button onClick={handleUpdate} color="primary">Update</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}

export default App;
