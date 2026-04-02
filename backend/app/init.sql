CREATE TABLE IF NOT EXISTS wishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(100) NOT NULL,
    message VARCHAR(500) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO wishes (author, message) VALUES
    ('Manu', 'Joyeux anniversaire ma belle ! 🎉'),
    ('Test', 'Ce site est trop bien fait 😎');