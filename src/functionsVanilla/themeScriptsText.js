export const themeScriptsText = `

// Function to apply the theme based on localStorage
        function applyTheme() {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark') {
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            } else {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            }
        }

        // Function to toggle the theme
        function toggleTheme() {
            if (document.body.classList.contains('dark')) {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light');
                document.body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        }

        // Initialize the theme on page load
        document.addEventListener('DOMContentLoaded', applyTheme);

        // Add event listener to the theme button
        document.getElementById('theme-button').addEventListener('click', toggleTheme);


`;
