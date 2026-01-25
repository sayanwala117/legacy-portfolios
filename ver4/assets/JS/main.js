document.addEventListener('DOMContentLoaded', () => {
            // --- Ensure page starts at top (prevent hash scrolling on load) ---
            // Clear any hash from URL and scroll to top
            if (window.location.hash) {
                history.replaceState("", document.title, window.location.pathname + window.location.search);
            }
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
            
            // --- Loading Animation ---
            const loadingOverlay = document.getElementById('loading-overlay');
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingOverlay.classList.add('fade-out');
                    // Optional: Remove overlay from DOM after transition
                    loadingOverlay.addEventListener('transitionend', () => {
                        loadingOverlay.style.display = 'none';
                    }, { once: true });
                }, 500); // Wait 0.5 seconds before fading out
            });

            // --- Hamburger Menu Toggle ---
            const hamburger = document.querySelector('.hamburger');
            const navDrawer = document.querySelector('.nav-drawer');
            const navLinks = document.querySelectorAll('.nav-drawer a'); // Links inside the drawer

            hamburger.addEventListener('click', () => {
                // Toggle navigation drawer
                navDrawer.classList.toggle('is-open');
                // Toggle hamburger animation
                hamburger.classList.toggle('active');
                // Toggle body scroll lock to prevent scrolling when drawer is open
                document.body.style.overflow = navDrawer.classList.contains('is-open') ? 'hidden' : '';
            });

            // Close drawer when a link is clicked
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navDrawer.classList.remove('is-open');
                    hamburger.classList.remove('active'); // Reset hamburger animation
                    document.body.style.overflow = ''; // Re-enable body scroll
                });
            });

            // --- Smooth Scrolling for Navigation Links ---
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        // Offset for fixed navbar
                        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - document.querySelector('.navbar').offsetHeight;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // --- Scroll-in Animation for Sections ---
            const sections = document.querySelectorAll('section');

            const observerOptions = {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.1 // Trigger when 10% of the section is visible
            };

            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                sectionObserver.observe(section);
            });

            // --- Update Current Year in Footer ---
            const currentYearSpan = document.getElementById('current-year');
            if (currentYearSpan) {
                currentYearSpan.textContent = new Date().getFullYear();
            }

            // --- AI Chat Assistant Logic ---
            const chatMessages = document.getElementById('chat-messages');
            const chatInput = document.getElementById('chat-input');
            const sendButton = document.getElementById('send-button');

            const knowledgeBase = {
            "name": "Jaspreet Singh Jawanda",
            "github": "https://github.com/JaspreetJ117",
            "linkedin": "https://www.linkedin.com/in/jaspreetj117",
            "website": "https://www.jjawanda.me",
            "about_me_summary": "Jaspreet Singh Jawanda is a creative developer and designer with a passion for building user-first applications. He is pursuing a double degree in Computer Science and Business Administration at Wilfrid Laurier University, blending technical skills with business acumen to create innovative solutions.",
            "degree": "Double Degree: Bachelor of Computer Science (BSc) and Bachelor of Business Administration (BBA), Wilfrid Laurier University (2024–2029)",
            "school": "Wilfrid Laurier University",
            "experience_summary": "Jaspreet has professional experience in technical and business-facing roles. At Ringball Corporation, he worked as a Software Engineer Intern (Jun–Sept 2025), delivering production-ready systems including the Fulfillment Imaging System (FIS) — a Python/Flask OCR app reducing packing errors by 35% and raising customer confidence scores by 20% — and Enventory, an inventory dashboard and tablet app that cut stock cycle time from 10 to 4 weeks (60% faster) and improved reporting accuracy by 25%. He also worked as a Warehouse Associate (Jun 2023–Aug 2025), where he developed teamwork, time management, and operational precision. At SS Maintenance, he supported business operations by managing a server system for invoices and customer data while helping optimize the company’s digital presence. Additionally, as a freelance website designer, he built 12+ websites generating over $3000 in revenue.",
            "tech_stack": "Python, Java, JavaScript, SQL; Flask, TensorFlow, Keras, Git, REST APIs, OCR (EasyOCR), Pandas, Numpy; also experienced with business analysis, strategic planning, and pitch deck development.",
            "projects_summary": "NotTurboLearn: AI-powered study assistant that processes videos, PDFs, and articles into summaries, flashcards, and Q&A. Mustang Classifier: TensorFlow/Keras EfficientNet-B2 model classifying Ford Mustang images with ~92% accuracy, including dataset creation and hyperparameter tuning. PC Health App: Live Case Competition Semi-Finalist (Top 50/240+ teams) — proposed a national strategic partnership for PC Health App across 150+ clinics, supported with impact analysis, implementation strategy, and risk mitigation. Additional projects include SStarty (customizable Steam startup video), USecDrive (secure encryption tool), Color-to-Grayscale (image processing app), commercial websites for local businesses, and a self-hosted messaging platform.",
            "background_summary": "Jaspreet’s journey into tech began at age nine, sparked by curiosity about how games and software are built. His entrepreneurial mindset, shaped by freelance design work and early business exposure, led him to pursue a double degree to bridge technology and business. He thrives on building minimal, scalable, and user-first applications that solve real-world problems.",
            "skills_summary": "Full-stack development, UI customization, web security, computer vision, OCR systems, machine learning, business analysis, project planning, case competitions, and strategic presentations. Strong foundation in CS fundamentals paired with business knowledge in economics, accounting, and marketing."
            };
            // Function to add a message to the chat interface
            function addMessage(sender, message) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('chat-message', sender);

                const avatarDiv = document.createElement('div');
                avatarDiv.classList.add('avatar');
                
                if (sender === 'user') {
                    avatarDiv.textContent = 'You';
                } else {
                    // Create robot icon for AI avatar
                    const robotIcon = document.createElement('i');
                    robotIcon.classList.add('fas', 'fa-robot');
                    avatarDiv.appendChild(robotIcon);
                }

                const bubbleDiv = document.createElement('div');
                bubbleDiv.classList.add('chat-bubble');
                bubbleDiv.textContent = message;

                if (sender === 'user') {
                    messageDiv.appendChild(bubbleDiv);
                    messageDiv.appendChild(avatarDiv);
                } else {
                    messageDiv.appendChild(avatarDiv);
                    messageDiv.appendChild(bubbleDiv);
                }
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
            }

            // Function to simulate AI response
            async function getAIResponse(userMessage) {
                userMessage = userMessage.toLowerCase();
                let response = "I'm sorry, I don't have information on that specific topic. Please try asking something else about Jaspreet's portfolio, experience, or skills.";

                // Check predefined knowledge base first
                if (userMessage.includes("name")) {
                    response = `His name is ${knowledgeBase.name}.`;
                } else if (userMessage.includes("study") || userMessage.includes("university") || userMessage.includes("school")) {
                    response = `Jaspreet is studying ${knowledgeBase.degree}.`;
                } else if (userMessage.includes("tech stack") || userMessage.includes("technologies") || userMessage.includes("skills")) {
                    response = `Jaspreet primarily uses ${knowledgeBase.tech_stack}.`;
                } else if (userMessage.includes("projects") || userMessage.includes("worked on")) {
                    response = `Jaspreet has worked on projects such as ${knowledgeBase.projects_summary}. You can find more details on his GitHub.`;
                } else if (userMessage.includes("experience") || userMessage.includes("job")) {
                    response = knowledgeBase.experience_summary;
                } else if (userMessage.includes("about") || userMessage.includes("background")) {
                    response = knowledgeBase.about_me_summary;
                } else {
                    // Fallback to Gemini API for more general queries if no direct match
                    // The AI model used is gemini-2.0-flash, as it's the one available for this API call.
                    const prompt = `Based on the following information about Jaspreet's portfolio:
                    Name: ${knowledgeBase.name}
                    Degree/School: ${knowledgeBase.degree}
                    Experience Summary: ${knowledgeBase.experience_summary}
                    Tech Stack: ${knowledgeBase.tech_stack}
                    Projects Summary: ${knowledgeBase.projects_summary}
                    About Me: ${knowledgeBase.about_me_summary}

                    Answer the user's question: "${userMessage}". Keep the answer concise and directly related to the provided information. If the information is not available, state that. Do not provide any personal contact information.`;

                    // Add typing indicator
                    const typingIndicatorDiv = document.createElement('div');
                    typingIndicatorDiv.classList.add('chat-message', 'ai', 'typing-indicator');
                    typingIndicatorDiv.innerHTML = `<div class="avatar"><i class="fas fa-robot"></i></div><div class="chat-bubble"><span></span><span></span><span></span></div>`;
                    chatMessages.appendChild(typingIndicatorDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    try {
                        let chatHistory = [];
                        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                        const payload = { contents: chatHistory };
                        const apiKey = "AIzaSyB34zFtBl-rsjMdz4v30SAgZ9E_vQMUnwQ"; 
                        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                        const res = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        const result = await res.json();

                        if (result.candidates && result.candidates.length > 0 &&
                            result.candidates[0].content && result.candidates[0].content.parts &&
                            result.candidates[0].content.parts.length > 0) {
                            response = result.candidates[0].content.parts[0].text;
                        } else {
                            response = "I'm having trouble connecting to the AI at the moment. Please try again later!";
                        }
                    } catch (error) {
                        console.error("Error fetching AI response:", error);
                        response = "There was an error processing your request. Please try again.";
                    } finally {
                        // Remove typing indicator
                        if (typingIndicatorDiv.parentNode) {
                            typingIndicatorDiv.parentNode.removeChild(typingIndicatorDiv);
                        }
                    }
                }
                return response;
            }

            // Event listener for sending messages
            async function sendMessage() {
                const userMessage = chatInput.value.trim();
                if (userMessage) {
                    addMessage('user', userMessage);
                    chatInput.value = ''; // Clear input

                    const aiResponse = await getAIResponse(userMessage);
                    addMessage('ai', aiResponse);
                }
            }

            sendButton.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            // --- Starter Button Functionality ---
            const starterButtons = document.querySelectorAll('.starter-btn');
            starterButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const question = button.getAttribute('data-question');
                    if (question) {
                        // Add the question as a user message
                        addMessage('user', question);
                        
                        // Get and display AI response
                        const aiResponse = await getAIResponse(question);
                        addMessage('ai', aiResponse);
                        
                        // Scroll chat container to bottom
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                });
            });
            
        // --- Navbar Scroll Transformation ---
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add class if scrolled more than 50px
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

            new Typed('#typed', {
                strings: [
                    'Welcome To My Website',
                    'A Computer Science Student',
                    'I am a Business Student',
                    'I am a Full-Stack Engineer',
                    'Tech enthusiast & Tinkerer'
                    ],
            typeSpeed: 90,
            backSpeed: 30,
            backDelay: 1700,
            loop: true
            });
        });
