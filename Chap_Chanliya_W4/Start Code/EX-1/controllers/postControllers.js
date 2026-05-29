// GET /users - List all users

import { users } from '../models/data.js';

const getAllUsers = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: users
    });
}

// GET /users/:id - Get one user
const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = users.find(p => p.id === parseInt(id));
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    return res.status(200).json({
        success: true,
        data: user
    });
}

// POST /users - Create new user
const createUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
}


// PUT /users/:id - Update user
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
}

// DELETE /users/:id - Delete user
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    users.splice(index, 1);
    res.status(204).send();
}



export { getAllUsers, getUserById, createUser, updateUser, deleteUser };