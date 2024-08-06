'use client'
import { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { Box, Modal, Typography, Stack, TextField, Button } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc } from 'firebase/firestore';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch and update inventory
  const updateInventory = async () => {
    try {
      const snapshot = query(collection(firestore, 'inventory'));
      const docs = await getDocs(snapshot);
      const inventoryList = docs.docs.map(doc => ({
        name: doc.id,
        quantity: doc.data().quantity || 0,
      }));
      setInventory(inventoryList);
      setFilteredInventory(inventoryList); // Initialize filtered inventory
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  // Add or update item in inventory
  const addItem = async (item) => {
    if (!item.trim()) return;
    try {
      const docRef = doc(firestore, 'inventory', item);
      const docSnap = await getDoc(docRef);
      const newQuantity = docSnap.exists() ? (docSnap.data().quantity || 0) + 1 : 1;
      await setDoc(docRef, { quantity: newQuantity });
      await updateInventory();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Remove item from inventory
  const removeItem = async (item) => {
    try {
      const docRef = doc(firestore, 'inventory', item);
      const docSnap = await getDoc(docRef);
      const quantity = docSnap.data().quantity || 0;
      if (quantity > 1) {
        await setDoc(docRef, { quantity: quantity - 1 });
      } else {
        await deleteDoc(docRef);
      }
      await updateInventory();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Filter inventory based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = inventory.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      bgcolor="#FCE4EC" // Soft pink background
      padding={2}
    >
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width={350}
          bgcolor="#FFF"
          border="2px solid #FF69B4" // Hot pink border
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography variant="h6" color="#FF69B4">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              sx={{ backgroundColor: '#FFF0F5' }} // Lavender blush background
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: '#FF69B4', color: '#FFF', '&:hover': { backgroundColor: '#FF1493' } }}
              onClick={() => {
                addItem(itemName);
                setItemName('');
                setOpen(false);
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#FF69B4', color: '#FFF', '&:hover': { backgroundColor: '#FF1493' } }}
        onClick={() => setOpen(true)}
      >
        Add New Item
      </Button>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{
          backgroundColor: '#FFF0F5', // Lavender blush background
          marginBottom: 2,
          width: '800px',
        }}
      />
      <Box border="1px solid #FF69B4" width="800px" borderRadius="12px" overflow="hidden">
        <Box
          width="100%"
          height="100px"
          bgcolor="#FFB6C1" // Light pink background
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" color="#FFF">
            Inventory Items
          </Typography>
        </Box>
        <Stack width="100%" height="300px" spacing={2} overflow="auto" padding={2}>
          {filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="94%"
              minHeight="50px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#FFF0F5" // Lavender blush background
              padding={2}
              borderRadius="8px"
              boxShadow="0 4px 6px rgba(0,0,0,0.1)"
            >
              <Typography variant="h3" color="#FF69B4">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#FF69B4">
                {quantity}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#FF69B4', color: '#FFF', '&:hover': { backgroundColor: '#FF1493' } }}
                  onClick={() => addItem(name)}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#FF1493', color: '#FFF', '&:hover': { backgroundColor: '#C71585' } }}
                  onClick={() => removeItem(name)}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
