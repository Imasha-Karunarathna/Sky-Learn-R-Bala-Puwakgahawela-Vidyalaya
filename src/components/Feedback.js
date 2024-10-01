// src/components/FeedbackForm.js
import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Rating,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    Switch,
    Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Feedback.css';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(3);
    const [category, setCategory] = useState('');
    const [feedbackList, setFeedbackList] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    // Load feedback from localStorage when the component mounts
    useEffect(() => {
        const storedFeedback = JSON.parse(localStorage.getItem('feedbackList'));
        if (storedFeedback) {
            setFeedbackList(storedFeedback);
        }
    }, []);

    // Save feedback to localStorage whenever feedbackList changes
    useEffect(() => {
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
    }, [feedbackList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && feedback && category) {
            const newFeedback = {
                id: Date.now(),
                name,
                email,
                feedback,
                rating,
                category,
            };
            setFeedbackList([...feedbackList, newFeedback]);
            setName(''); // Clear input fields
            setEmail('');
            setFeedback('');
            setRating(3);
            setCategory('');
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: darkMode ? '#121212' : '#f5f5f5', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar position="static" color={darkMode ? 'default' : 'primary'}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Feedback Form
                    </Typography>
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: darkMode ? '#424242' : '#fff' }}>
                    <Typography variant="h4" component="h2" gutterBottom align="center">
                        Share Your Feedback
                    </Typography>
                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            label="Name"
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                            sx={{ input: { color: darkMode ? '#fff' : '#000' } }}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                            sx={{ input: { color: darkMode ? '#fff' : '#000' } }}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                sx={{ color: darkMode ? '#fff' : '#000' }}
                            >
                                <MenuItem value="Suggestion">Suggestion</MenuItem>
                                <MenuItem value="Bug Report">Bug Report</MenuItem>
                                <MenuItem value="Question">Question</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            required
                            sx={{ textarea: { color: darkMode ? '#fff' : '#000' } }}
                        />
                        <Typography component="legend" sx={{ mt: 2 }}>
                            Rating
                        </Typography>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(e, newValue) => setRating(newValue || 3)} // Ensure rating is always set
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Submit Feedback
                        </Button>
                    </form>
                </Paper>

                <Typography variant="h5" component="h3" sx={{ mt: 5 }}>
                    Feedback Received
                </Typography>
                <ul className="feedback-list">
                    {feedbackList.map((item) => (
                        <li key={item.id} className="feedback-item">
                            <strong>{item.name}</strong> ({item.email}) - {item.category}
                            <Rating value={item.rating} readOnly />
                            <p>{item.feedback}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </Box>
    );
};

export default FeedbackForm;
