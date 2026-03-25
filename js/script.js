// ============================================
// TechLearn - Single Page JavaScript
// ============================================

$(document).ready(function() {
    // --- Init AOS ---
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // --- Navbar Scroll Effect ---
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        
        // Show sub-nav if at top
        if (scrollTop < 400) {
            $('.course-detail-nav-wrapper').fadeIn(200);
        }

        if (scrollTop > 50) {
            $('#mainNavbar').addClass('scrolled');
            $('#backToTop').addClass('visible');
        } else {
            $('#mainNavbar').removeClass('scrolled');
            $('#backToTop').removeClass('visible');
        }

        // Active nav link on scroll (Home)
        $('section[id]').each(function() {
            const top = $(this).offset().top - 100;
            const bottom = top + $(this).outerHeight();
            if (scrollTop >= top && scrollTop < bottom) {
                const id = $(this).attr('id');
                $('.navbar-nav .nav-link').removeClass('active');
                $(`.navbar-nav .nav-link[href="#${id}"]`).addClass('active');
            }
        });

        // Active nav link on scroll (Course Detail)
        $('.course-section[id]').each(function() {
            const id = $(this).attr('id');
            const offset = (id === 'section-register') ? 130 : 200;
            const top = $(this).offset().top - offset;
            const bottom = top + $(this).outerHeight();
            
            if (scrollTop >= top && scrollTop < bottom) {
                $('.course-detail-nav-item').removeClass('active');
                $(`.course-detail-nav-item[href="#${id}"]`).addClass('active');
                
                // --- Hide sub-nav specifically on Register section ---
                if (id === 'section-register') {
                    $('.course-detail-nav-wrapper').fadeOut(200);
                } else {
                    $('.course-detail-nav-wrapper').fadeIn(200);
                }
            }
        });
    });

    // --- Smooth Scroll ---
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            let offset = 70;
            if ($(this).hasClass('course-detail-nav-item')) {
                // If register, align with main navbar + small gap (approx 100px) and hide sub-nav immediately
                if (target.attr('id') === 'section-register') {
                    offset = 110;
                    $('.course-detail-nav-wrapper').fadeOut(100);
                } else {
                    offset = 180;
                    $('.course-detail-nav-wrapper').fadeIn(100);
                }
            }
            $('html, body').animate({ scrollTop: target.offset().top - offset }, 400);
        }
    });

    // --- Back to Top ---
    $('#backToTop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    // --- Close mobile nav on link click ---
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('#navbarContent').collapse('hide');
        }
    });

    // --- Render Courses ---
    renderCourses('all');
    initCourseFilters();

    // --- Hero Counter Animation ---
    initHeroCounter();

    // --- Hero Search ---
    initHeroSearch();

    // --- Auth Forms ---
    initAuthForms();

    // --- Toggle Password ---
    initTogglePassword();

    // --- Modal Switch ---
    initModalSwitch();

    // --- Footer Category Links ---
    initFooterCategoryLinks();

    // --- Course Detail Setup ---
    initCourseDetail();
});

// ============================================
// COURSE DATA
// ============================================
const courses = [
    // FRONTEND
    { id: 1, title: 'HTML & CSS Từ Cơ Bản Đến Pro', category: 'frontend', icon: 'fab fa-html5', color: 'linear-gradient(135deg, #e44d26, #f16529)', level: 'Cơ bản', lessons: 48, hours: 32, students: 3200, rating: 4.8, reviews: 1300, price: 499000, originalPrice: 999000, instructor: 'Đội Ngũ TechLearn', startDate: '10/04/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '20h - 22h', highlights: ['Xây dựng 5 Project thực tế','Thành thạo Flexbox & Grid','Responsive Design chuyên nghiệp','Tối ưu SEO & Performance'], desc: 'Nắm vững HTML5 & CSS3, Flexbox, Grid, Responsive Design. Xây dựng website hoàn chỉnh từ bản thiết kế Figma.', curriculum: ['Giới thiệu HTML & Semantic Tags','CSS Selectors & Box Model','Flexbox Layout hoàn chỉnh','CSS Grid nâng cao','Responsive Design & Media Queries','CSS Animation & Transition','Dự án: Landing Page thực tế','Dự án: Portfolio Website'], benefits: ['Truy cập trọn đời khóa học','Chứng chỉ hoàn thành','Source code & tài liệu đầy đủ','Hỗ trợ mentor 24/7','Cộng đồng học viên 5000+'] },
    { id: 2, title: 'JavaScript ES6+ Hoàn Chỉnh', category: 'frontend', icon: 'fab fa-js-square', color: 'linear-gradient(135deg, #f7df1e, #e8b708)', level: 'Cơ bản → Nâng cao', lessons: 65, hours: 45, students: 2800, rating: 4.9, reviews: 980, price: 699000, originalPrice: 1299000, instructor: 'Đội Ngũ TechLearn', startDate: '15/04/2026', schedule: 'Thứ 3, Thứ 5, Thứ 7', time: '19h - 21h', highlights: ['3 Project lớn','Async/Await thành thạo','DOM Manipulation nâng cao','100+ bài tập thực hành'], desc: 'Từ biến, hàm đến Async/Await, DOM Manipulation, Fetch API. Xây dựng ứng dụng thực tế.', curriculum: ['Biến, kiểu dữ liệu & Operators','Hàm, Arrow Function, Closure','Array/Object methods nâng cao','ES6+ Destructuring, Spread, Modules','DOM Manipulation & Events','Async/Await, Promises, Fetch API','Dự án: Quiz App','Dự án: Weather App với API'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','100+ bài tập thực hành','Code review cá nhân'] },
    { id: 3, title: 'ReactJS - Xây Dựng Web App Hiện Đại', category: 'frontend', icon: 'fab fa-react', color: 'linear-gradient(135deg, #61dafb, #0ea5e9)', level: 'Trung bình', lessons: 72, hours: 52, students: 4100, rating: 4.9, reviews: 1600, price: 899000, originalPrice: 1699000, instructor: 'Đội Ngũ TechLearn', startDate: '20/04/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '20h - 22h', highlights: ['5 Project thực tế','React Hooks chuyên sâu','Redux & State Management','Deploy lên Vercel/AWS'], desc: 'Thành thạo React Hooks, Redux, React Router. Build các project thực tế chuẩn production.', curriculum: ['React Components & JSX','React Hooks (useState, useEffect,...)','Context API & State Management','React Router v6','Redux Toolkit','Tối ưu performance','Dự án: E-commerce App','Dự án: Social Media Dashboard'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','5 dự án thực tế','Mock interview practice'] },
    { id: 4, title: 'Vue.js 3 Master Class', category: 'frontend', icon: 'fab fa-vuejs', color: 'linear-gradient(135deg, #42b883, #35495e)', level: 'Trung bình', lessons: 52, hours: 38, students: 1900, rating: 4.7, reviews: 720, price: 799000, originalPrice: 1399000, instructor: 'Đội Ngũ TechLearn', startDate: '25/04/2026', schedule: 'Thứ 3, Thứ 5, Thứ 7', time: '19h - 21h', highlights: ['Composition API thuần thục','Pinia State Management','4 Project hoàn chỉnh','Testing với Vitest'], desc: 'Học Vue 3 Composition API, Vuex, Vue Router. Xây dựng SPA chuyên nghiệp.', curriculum: ['Vue 3 Composition API','Reactive Data & Computed','Vue Router & Navigation Guards','Pinia State Management','Component Design Patterns','Testing với Vitest','Dự án: Task Management App','Dự án: Blog Platform'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Source code tất cả dự án'] },
    { id: 5, title: 'Angular - Enterprise Web Development', category: 'frontend', icon: 'fab fa-angular', color: 'linear-gradient(135deg, #dd0031, #c3002f)', level: 'Nâng cao', lessons: 68, hours: 50, students: 1200, rating: 4.6, reviews: 540, price: 999000, originalPrice: 1799000, instructor: 'Đội Ngũ TechLearn', startDate: '01/05/2026', schedule: 'Thứ 2, Thứ 5, Thứ 7', time: '21h - 23h', highlights: ['Enterprise-grade Projects','TypeScript chuyên sâu','RxJS & NgRx','Microservices Architecture'], desc: 'Xây dựng ứng dụng enterprise với Angular, TypeScript, RxJS và Material UI.', curriculum: ['TypeScript fundamentals','Angular Components & Modules','Services & Dependency Injection','RxJS Observables','Angular Material UI','NgRx State Management','Dự án: CRM Dashboard','Dự án: Real-time Chat App'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Enterprise-grade projects'] },

    // BACKEND
    { id: 6, title: 'Lập Trình Backend NodeJS', category: 'backend', icon: 'fab fa-node-js', color: 'linear-gradient(135deg, #68a063, #3c873a)', level: 'Trung bình', lessons: 54, hours: 40, students: 2900, rating: 4.8, reviews: 1100, price: 799000, originalPrice: 1499000, instructor: 'Đội Ngũ TechLearn', startDate: '27/03/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '21h - 23h', highlights: ['2 Project lớn','Kiến thức web Backend','Design hệ thống website','Kiến thức chuyên sâu về thiết kế web phía server'], desc: 'Xây dựng RESTful API chuyên nghiệp với Node.js, Express, MongoDB và JWT Authentication.', curriculum: ['Node.js Core Modules','Express.js Routing & Middleware','MongoDB & Mongoose','REST API Design Best Practices','Authentication với JWT','File Upload & Cloud Storage','Dự án: Blog API','Dự án: E-commerce API'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Postman Collection đầy đủ'] },
    { id: 7, title: 'Python Django - Web Framework', category: 'backend', icon: 'fab fa-python', color: 'linear-gradient(135deg, #3776ab, #ffd43b)', level: 'Trung bình', lessons: 60, hours: 44, students: 2100, rating: 4.7, reviews: 890, price: 849000, originalPrice: 1499000, instructor: 'Đội Ngũ TechLearn', startDate: '05/04/2026', schedule: 'Thứ 3, Thứ 5, Thứ 7', time: '20h - 22h', highlights: ['Django REST Framework','ORM & Database Design','Cloud Deployment','Celery Task Queue'], desc: 'Làm chủ Django framework, ORM, REST Framework. Deploy ứng dụng lên cloud.', curriculum: ['Python Web cơ bản','Django MTV Pattern','Django ORM & Migrations','Django REST Framework','Celery & Task Queue','Docker & Deployment','Dự án: Blog Platform','Dự án: Online Store API'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Deploy guide chi tiết'] },
    { id: 8, title: 'Java Spring Boot Masterclass', category: 'backend', icon: 'fab fa-java', color: 'linear-gradient(135deg, #007396, #f89820)', level: 'Nâng cao', lessons: 75, hours: 55, students: 1800, rating: 4.8, reviews: 760, price: 999000, originalPrice: 1899000, instructor: 'Đội Ngũ TechLearn', startDate: '12/04/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '19h - 21h', highlights: ['Microservices Architecture','Spring Security & OAuth2','Docker & Kubernetes','CI/CD Pipeline'], desc: 'Phát triển microservices với Spring Boot, Spring Security, JPA/Hibernate và Docker.', curriculum: ['Spring Boot Fundamentals','Spring Data JPA & Hibernate','Spring Security & OAuth2','Microservices Architecture','Docker & Kubernetes','CI/CD Pipeline','Dự án: Banking API','Dự án: Microservices E-commerce'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Microservices template'] },
    { id: 23, title: 'Lập Trình Backend Với Go (Golang)', category: 'backend', icon: 'fa-brands fa-golang', color: 'linear-gradient(135deg, #00add8, #007d9c)', level: 'Trung bình', lessons: 52, hours: 38, students: 1400, rating: 4.8, reviews: 520, price: 899000, originalPrice: 1699000, instructor: 'Đội Ngũ TechLearn', startDate: '05/05/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '19h - 21h', highlights: ['Hiệu năng cực cao','Concurrency với Goroutines','Xây dựng Microservices','High Performance System'], desc: 'Làm chủ ngôn ngữ Go, concurrency, microservices và deploy hệ thống hiệu năng cao.', curriculum: ['Go Fundamentals','Concurrency & Goroutines','Standard Library chuyên sâu','REST API với Gin Framework','GORM & Database Management','Microservices với gRPC','Dự án: High-performance API','Dự án: Real-time Chat Service'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Source code đầy đủ'] },
    { id: 9, title: 'Cơ Sở Dữ Liệu Và SQL', category: 'backend', icon: 'fas fa-database', color: 'linear-gradient(135deg, #336791, #4169E1)', level: 'Cơ bản → Nâng cao', lessons: 26, hours: 30, students: 2500, rating: 4.6, reviews: 120, price: 599000, originalPrice: 1099000, instructor: 'Đội Ngũ TechLearn', startDate: '25/04/2026', schedule: 'Thứ 2, Thứ 5, Thứ 7', time: '21h - 23h', highlights: ['150 bài tập SQL','Web chấm bài SQL tự động','3 Project ứng dụng','Database optimization'], desc: 'Master SQL, thiết kế database, optimization, và NoSQL với MongoDB.', curriculum: ['SQL Fundamentals','Joins, Subqueries, CTE','Database Design & Normalization','Indexing & Performance Tuning','Transaction & Concurrency','MongoDB cơ bản đến nâng cao','Dự án: Design Database cho E-commerce','Dự án: Migration & Optimization'], benefits: ['Truy cập trọn đời','100+ bài tập SQL','Database templates'] },

    // FULLSTACK
    { id: 10, title: 'Lập Trình Fullstack Web', category: 'fullstack', icon: 'fas fa-code', color: 'linear-gradient(135deg, #667eea, #764ba2)', level: 'Trung bình → Nâng cao', lessons: 92, hours: 70, students: 3500, rating: 4.9, reviews: 128, price: 1299000, originalPrice: 2499000, instructor: 'Đội Ngũ TechLearn', startDate: '21/03/2026', schedule: 'Thứ 3, Thứ 5, Thứ 7', time: '19h - 21h', highlights: ['7 Project','Kiến thức web Frontend và Backend','Phân tích Thiết kế hệ thống','Kiến thức chuyên sâu về thiết kế web'], desc: 'Full-stack với MongoDB, Express, React, Node.js. Build complete web application.', curriculum: ['Frontend: React + Redux','Backend: Node.js + Express','Database: MongoDB + Mongoose','Authentication & Authorization','Real-time với Socket.io','Deploy lên AWS/Vercel','Dự án: Social Network','Dự án: Project Management Tool'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','2 dự án hoàn chỉnh end-to-end'] },
    { id: 11, title: 'Next.js - React Framework Production', category: 'fullstack', icon: 'fas fa-rocket', color: 'linear-gradient(135deg, #000000, #434343)', level: 'Nâng cao', lessons: 58, hours: 42, students: 1600, rating: 4.8, reviews: 650, price: 999000, originalPrice: 1799000, instructor: 'Đội Ngũ TechLearn', startDate: '01/05/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '20h - 22h', highlights: ['Server Components','App Router chuyên sâu','NextAuth Authentication','Deploy Production'], desc: 'Build production-ready apps với Next.js 14, Server Components, App Router.', curriculum: ['Next.js App Router','Server & Client Components','Data Fetching Strategies','Authentication với NextAuth','Prisma ORM','Deployment & Optimization','Dự án: SaaS Dashboard','Dự án: E-commerce Platform'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Production deployment guide'] },
    { id: 12, title: 'Laravel - PHP Framework Toàn Diện', category: 'fullstack', icon: 'fab fa-laravel', color: 'linear-gradient(135deg, #ff2d20, #e3342f)', level: 'Trung bình', lessons: 62, hours: 45, students: 2200, rating: 4.7, reviews: 880, price: 849000, originalPrice: 1599000, instructor: 'Đội Ngũ TechLearn', startDate: '08/04/2026', schedule: 'Thứ 3, Thứ 5, Thứ 7', time: '19h - 21h', highlights: ['Eloquent ORM','API Resources','Queue & Jobs','Laravel + Vue.js SPA'], desc: 'Xây dựng ứng dụng web hoàn chỉnh với Laravel, MySQL, Vue.js.', curriculum: ['Laravel Routing & Controllers','Eloquent ORM','Blade Templating','Laravel API Resources','Queue & Background Jobs','Laravel + Vue.js SPA','Dự án: CMS Platform','Dự án: Online Learning Platform'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Starter template'] },
    { id: 13, title: 'DevOps & Cloud Engineering', category: 'fullstack', icon: 'fab fa-docker', color: 'linear-gradient(135deg, #2496ed, #0db7ed)', level: 'Nâng cao', lessons: 50, hours: 38, students: 1300, rating: 4.7, reviews: 520, price: 1099000, originalPrice: 1999000, instructor: 'Đội Ngũ TechLearn', startDate: '15/04/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '21h - 23h', highlights: ['Docker & Kubernetes','CI/CD Pipeline','AWS Core Services','Terraform IaC'], desc: 'Docker, Kubernetes, CI/CD, AWS. Triển khai hệ thống production-ready.', curriculum: ['Linux & Shell Scripting','Docker & Docker Compose','Kubernetes Orchestration','CI/CD với GitHub Actions','AWS Core Services','Terraform Infrastructure as Code','Dự án: Microservices Deployment','Dự án: Full Pipeline Setup'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Cloud credits tặng kèm'] },

    // AI
    { id: 14, title: 'Machine Learning Cơ Bản Đến Nâng Cao', category: 'ai', icon: 'fas fa-brain', color: 'linear-gradient(135deg, #4facfe, #00f2fe)', level: 'Trung bình', lessons: 55, hours: 42, students: 1800, rating: 4.8, reviews: 750, price: 999000, originalPrice: 1899000, instructor: 'Đội Ngũ TechLearn', startDate: '10/04/2026', schedule: 'Thứ 2, Thứ 5, Thứ 7', time: '20h - 22h', highlights: ['Regression & Classification','Supervised & Unsupervised','Model Optimization','2 Project thực tế'], desc: 'Từ lý thuyết đến thực hành: Regression, Classification, Clustering, Ensemble Methods.', curriculum: ['Toán cho ML: Linear Algebra, Statistics','Python cho Data Science','Supervised Learning','Unsupervised Learning','Ensemble Methods','Model Evaluation & Tuning','Dự án: House Price Prediction','Dự án: Customer Segmentation'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Jupyter Notebooks đầy đủ'] },
    { id: 15, title: 'Deep Learning Với TensorFlow & PyTorch', category: 'ai', icon: 'fas fa-microchip', color: 'linear-gradient(135deg, #ff6b35, #f7c948)', level: 'Nâng cao', lessons: 48, hours: 38, students: 1100, rating: 4.7, reviews: 430, price: 1099000, originalPrice: 2099000, instructor: 'Đội Ngũ TechLearn', startDate: '20/04/2026', schedule: 'Thứ 3, Thứ 5, Thứ 7', time: '19h - 21h', highlights: ['CNN & RNN chuyên sâu','Transfer Learning','GANs Models','Deploy AI với Flask'], desc: 'Neural Networks, CNN, RNN, Transfer Learning. Build AI models thực tế.', curriculum: ['Neural Network Fundamentals','CNN - Image Classification','RNN/LSTM - Sequence Models','Transfer Learning','GANs - Generative Models','Model Deployment với Flask','Dự án: Image Recognition App','Dự án: Sentiment Analysis'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','GPU cloud credits'] },
    { id: 16, title: 'Natural Language Processing (NLP)', category: 'ai', icon: 'fas fa-language', color: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', level: 'Nâng cao', lessons: 42, hours: 35, students: 900, rating: 4.6, reviews: 380, price: 1199000, originalPrice: 2199000, instructor: 'Đội Ngũ TechLearn', startDate: '25/04/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '20h - 22h', highlights: ['Transformers Architecture','Fine-tuning BERT/GPT','Chatbot Development','Text Processing'], desc: 'Text Processing, Transformers, BERT, GPT. Xây dựng chatbot và hệ thống NLP.', curriculum: ['Text Preprocessing','Word Embeddings','RNN for NLP','Attention Mechanism','Transformer Architecture','Fine-tuning BERT/GPT','Dự án: Chatbot tiếng Việt','Dự án: Text Summarization'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Pre-trained models'] },
    { id: 17, title: 'Data Science & Analytics', category: 'ai', icon: 'fas fa-chart-bar', color: 'linear-gradient(135deg, #43e97b, #38f9d7)', level: 'Cơ bản → Trung bình', lessons: 50, hours: 36, students: 2300, rating: 4.8, reviews: 920, price: 799000, originalPrice: 1499000, instructor: 'Đội Ngũ TechLearn', startDate: '01/04/2026', schedule: 'Thứ 3, Thứ 5, Thứ 7', time: '19h - 21h', highlights: ['Pandas & NumPy','Data Visualization','Statistical Analysis','Dashboard Streamlit'], desc: 'Pandas, NumPy, Matplotlib, Seaborn. Phân tích dữ liệu và visualization chuyên nghiệp.', curriculum: ['Python Pandas cơ bản đến nâng cao','NumPy cho Scientific Computing','Data Visualization','Statistical Analysis','Feature Engineering','Dashboard với Plotly/Streamlit','Dự án: Sales Analytics Dashboard','Dự án: COVID-19 Data Analysis'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','50+ Datasets thực tế'] },

    // BASIC
    { id: 18, title: 'Nhập Môn Lập Trình', category: 'basic', icon: 'fas fa-laptop-code', color: 'linear-gradient(135deg, #667eea, #764ba2)', level: 'Cơ bản', lessons: 35, hours: 25, students: 5200, rating: 4.9, reviews: 2100, price: 0, originalPrice: 499000, instructor: 'Đội Ngũ TechLearn', startDate: '01/04/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '20h - 22h', highlights: ['Tư duy logic lập trình','Thuật toán cơ bản','Miễn phí hoàn toàn','Phù hợp người mới'], desc: 'Khóa học miễn phí cho người mới. Tư duy lập trình, logic, thuật toán cơ bản.', curriculum: ['Tư duy lập trình','Biến, kiểu dữ liệu','Câu lệnh điều kiện','Vòng lặp','Hàm & Tham số','Array & Object cơ bản','Bài tập tổng hợp','Hướng dẫn chọn lộ trình'], benefits: ['Hoàn toàn miễn phí','Chứng chỉ hoàn thành','Mentor hỗ trợ','Cộng đồng học viên'] },
    { id: 19, title: 'Git & GitHub Thực Chiến', category: 'basic', icon: 'fab fa-git-alt', color: 'linear-gradient(135deg, #f05032, #de4c36)', level: 'Cơ bản', lessons: 28, hours: 18, students: 3800, rating: 4.8, reviews: 1500, price: 299000, originalPrice: 599000, instructor: 'Đội Ngũ TechLearn', startDate: '05/04/2026', schedule: 'Thứ 2, Thứ 5, Thứ 7', time: '19h - 21h', highlights: ['Branching & Merging','Pull Request Workflow','GitHub Actions','Resolve Conflicts'], desc: 'Quản lý version control chuyên nghiệp. Branching, merging, pull request workflow.', curriculum: ['Git cơ bản: init, add, commit','Branching & Merging','Remote Repository','Pull Request Workflow','Git Flow Strategy','Resolve Conflicts','GitHub Actions cơ bản','Dự án: Collaborative Project'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Git cheat sheet'] },
    { id: 20, title: 'Cấu Trúc Dữ Liệu & Giải Thuật', category: 'basic', icon: 'fas fa-sitemap', color: 'linear-gradient(135deg, #fa709a, #fee140)', level: 'Trung bình', lessons: 55, hours: 40, students: 2600, rating: 4.7, reviews: 1100, price: 699000, originalPrice: 1299000, instructor: 'Đội Ngũ TechLearn', startDate: '10/04/2026', schedule: 'Thứ 3, Thứ 5, Thứ 7', time: '20h - 22h', highlights: ['200+ bài tập LeetCode','Big-O Notation','Dynamic Programming','Mock Interview Prep'], desc: 'Array, Linked List, Tree, Graph, Sorting, Searching. Chuẩn bị phỏng vấn tại Big Tech.', curriculum: ['Big-O Notation','Array & String Problems','Stack & Queue','Linked List','Tree & Binary Search Tree','Graph Algorithms','Sorting & Searching','Dynamic Programming'], benefits: ['Truy cập trọn đời','200+ bài tập LeetCode','Mock interview prep'] },
    { id: 21, title: 'Linux & Command Line', category: 'basic', icon: 'fab fa-linux', color: 'linear-gradient(135deg, #333333, #666666)', level: 'Cơ bản', lessons: 30, hours: 20, students: 1900, rating: 4.6, reviews: 780, price: 399000, originalPrice: 799000, instructor: 'Đội Ngũ TechLearn', startDate: '15/04/2026', schedule: 'Thứ 2, Thứ 4, Thứ 6', time: '21h - 23h', highlights: ['Shell Scripting','Server Management','User & Permission','Networking cơ bản'], desc: 'Terminal commands, shell scripting, quản lý server Linux cơ bản.', curriculum: ['Terminal Navigation','File Management','User & Permission','Package Management','Shell Scripting','Process Management','Networking cơ bản','Dự án: Server Setup'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Linux cheat sheet'] },
    { id: 22, title: 'Computer Science Fundamentals', category: 'basic', icon: 'fas fa-microchip', color: 'linear-gradient(135deg, #00b4db, #0083b0)', level: 'Cơ bản', lessons: 40, hours: 28, students: 1500, rating: 4.7, reviews: 620, price: 499000, originalPrice: 999000, instructor: 'Đội Ngũ TechLearn', startDate: '20/04/2026', schedule: 'Thứ 3, Thứ 5, Thứ 7', time: '19h - 21h', highlights: ['Networking & HTTP','Operating Systems','Security Fundamentals','Career Guidance'], desc: 'Kiến thức nền tảng: Networking, OS, Security, Software Engineering basics.', curriculum: ['Computer Architecture','Operating System Basics','Networking & HTTP','Database Concepts','Software Engineering','Security Fundamentals','API & Web Services','Career Guidance'], benefits: ['Truy cập trọn đời','Chứng chỉ hoàn thành','Roadmap career cá nhân'] }
];

// ============================================
// COURSE RENDERING & FILTERING
// ============================================
let currentCategory = 'all';
let visibleCount = 9;

function createCourseCard(course) {
    const discount = Math.round((1 - course.price / course.originalPrice) * 100);
    const studentCount = typeof course.students === 'number' ? course.students : parseInt(course.students);
    return `
    <div class="col-lg-4 col-md-6 col-sm-6 course-col" data-category="${course.category}" data-aos="fade-up">
        <div class="course-card-v2" onclick="showCourseDetail(${course.id})">
            <div class="card-v2-thumbnail" style="background: ${course.color};">
                <div class="card-v2-thumb-overlay">
                    <h3 class="card-v2-thumb-title">${course.title.toUpperCase()}</h3>
                    <ul class="card-v2-highlights">
                        ${course.highlights ? course.highlights.map(h => `<li>${h}</li>`).join('') : ''}
                    </ul>
                </div>
                <i class="${course.icon} card-v2-icon"></i>
                ${course.price > 0 ? `<div class="card-v2-discount">Giảm<br>-${discount}%</div>` : `<div class="card-v2-discount free">Miễn<br>phí</div>`}
            </div>
            <div class="card-v2-body">
                <div class="card-v2-rating">
                    <span class="stars">${generateStars(course.rating)}</span>
                    <span class="rating-count">(${course.reviews} Đánh giá)</span>
                </div>
                <h4 class="card-v2-title">${course.title}</h4>
                <div class="card-v2-details">
                    <div class="detail-row"><i class="fas fa-book"></i> ${course.lessons} Bài giảng</div>
                    <div class="detail-row"><i class="fas fa-users"></i> ${studentCount} Học viên</div>
                    <div class="detail-row"><i class="fas fa-calendar-alt"></i> Khai giảng: ${course.startDate}</div>
                    <div class="detail-row"><i class="fas fa-calendar-week"></i> Lịch học: ${course.schedule}</div>
                    <div class="detail-row"><i class="fas fa-clock"></i> Giờ học: ${course.time}</div>
                </div>
                <div class="card-v2-instructor">
                    <div class="instructor-avatar"><i class="fas fa-chalkboard-teacher"></i></div>
                    <span>${course.instructor}</span>
                </div>
                <div class="card-v2-price">
                    <span class="price-current">${course.price === 0 ? 'Miễn phí' : formatPrice(course.price)}</span>
                    ${course.price > 0 ? `<span class="price-original">${formatPrice(course.originalPrice)}</span>` : ''}
                </div>
            </div>
        </div>
    </div>`;
}

function renderCourses(category) {
    currentCategory = category;
    let filtered = category === 'all' ? courses : courses.filter(c => c.category === category);
    const total = filtered.length;
    const showing = filtered.slice(0, visibleCount);

    $('#courseGrid').html(showing.map(c => createCourseCard(c)).join(''));
    $('#loadMoreCourses').toggle(visibleCount < total);
    AOS.refresh();
}

function initCourseFilters() {
    // Category filter buttons
    $(document).on('click', '.category-filter .filter-btn[data-category]', function() {
        $('.category-filter .filter-btn[data-category]').removeClass('active');
        $(this).addClass('active');
        currentCategory = $(this).data('category');
        visibleCount = 9;
        renderCourses(currentCategory);
    });

    // Load more button
    $('#loadMoreCourses').on('click', function() {
        visibleCount += 4;
        renderCourses(currentCategory);
    });
}

// ============================================
// COURSE DETAIL MODAL
// ============================================
window.showCourseDetail = function(id) {
    // Check if we are currently in the /pages/ directory
    const isPagesDir = window.location.pathname.includes('/pages/');
    const baseUrl = isPagesDir ? '' : 'pages/';
    window.location.href = `${baseUrl}chi-tiet-khoa-hoc.html?id=${id}`;
};

// ============================================
// HERO COUNTER
// ============================================
function initHeroCounter() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const suffix = target >= 1000 ? '+' : (target === 98 ? '%' : '+');
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = (target >= 1000 ? Math.floor(current).toLocaleString() : Math.floor(current)) + suffix;
    }, 16);
}

// ============================================
// HERO SEARCH
// ============================================
function initHeroSearch() {
    $('#btnHeroSearch, #heroSearch').on('click keypress', function(e) {
        if (e.type === 'keypress' && e.which !== 13) return;
        const query = $('#heroSearch').val().trim().toLowerCase();
        if (!query) return;

        // Filter and scroll to courses
        const results = courses.filter(c => c.title.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query));
        if (results.length > 0) {
            $('#courseGrid').html(results.map(c => createCourseCard(c)).join(''));
            $('#loadMoreCourses').hide();
            // Remove active from all filter buttons
            $('.category-filter .filter-btn').removeClass('active');
            $('html, body').animate({ scrollTop: $('#courses').offset().top - 70 }, 600);
            AOS.refresh();
            showToast(`Tìm thấy ${results.length} khóa học`, 'success');
        } else {
            showToast('Không tìm thấy khóa học phù hợp', 'warning');
        }
    });
}

// ============================================
// AUTH FORMS
// ============================================
function initAuthForms() {
    $(document).on('submit', '#loginForm', function(e) {
        e.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        if (!email || !password) { showToast('Vui lòng điền đầy đủ thông tin!', 'warning'); return; }
        if (password.length < 6) { showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'warning'); return; }
        showToast('Đăng nhập thành công! 🎉', 'success');
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        this.reset();
    });

    $(document).on('submit', '#registerForm', function(e) {
        e.preventDefault();
        const name = $('#registerName').val();
        const email = $('#registerEmail').val();
        const phone = $('#registerPhone').val();
        const password = $('#registerPassword').val();
        const confirmPassword = $('#registerConfirmPassword').val();
        if (!name || !email || !phone || !password) { showToast('Vui lòng điền đầy đủ thông tin!', 'warning'); return; }
        if (password.length < 6) { showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'warning'); return; }
        if (password !== confirmPassword) { showToast('Mật khẩu xác nhận không khớp!', 'warning'); return; }
        if (!$('#agreeTerms').is(':checked')) { showToast('Vui lòng đồng ý với điều khoản sử dụng!', 'warning'); return; }
        showToast('Đăng ký thành công! Chào mừng bạn! 🎉', 'success');
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        this.reset();
    });

    $(document).on('submit', '#courseRegisterForm', function(e) {
        e.preventDefault();
        showToast('Đăng ký khóa học thành công! TechLearn sẽ liên hệ với bạn sớm nhất. 🚀', 'success');
        this.reset();
    });
}

// ============================================
// TOGGLE PASSWORD
// ============================================
function initTogglePassword() {
    $(document).on('click', '.toggle-password', function() {
        const input = $(this).siblings('input');
        const icon = $(this).find('i');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
}

// ============================================
// MODAL SWITCH
// ============================================
function initModalSwitch() {
    $(document).on('click', '#switchToRegister', function(e) {
        e.preventDefault();
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        setTimeout(() => new bootstrap.Modal(document.getElementById('registerModal')).show(), 300);
    });
    $(document).on('click', '#switchToLogin', function(e) {
        e.preventDefault();
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        setTimeout(() => new bootstrap.Modal(document.getElementById('loginModal')).show(), 300);
    });
}

// ============================================
// FOOTER CATEGORY LINKS
// ============================================
function initFooterCategoryLinks() {
    $(document).on('click', '.footer-category', function(e) {
        e.preventDefault();
        const cat = $(this).data('category');
        // Activate the filter button
        $(`.category-filter .filter-btn[data-category="${cat}"]`).click();
        // Scroll to courses
        $('html, body').animate({ scrollTop: $('#courses').offset().top - 70 }, 600);
    });
}

// ============================================
// UTILITIES
// ============================================
function capitalize(str) {
    const map = { frontend: 'Frontend', backend: 'Backend', fullstack: 'Fullstack', ai: 'AI / ML', basic: 'Nền tảng' };
    return map[str] || str.charAt(0).toUpperCase() + str.slice(1);
}

function formatPrice(price) {
    return price === 0 ? 'Miễn phí' : price.toLocaleString('vi-VN') + 'đ';
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= Math.floor(rating) ? '<i class="fas fa-star"></i>' : (i - rating < 1 ? '<i class="fas fa-star-half-alt"></i>' : '<i class="far fa-star"></i>');
    }
    return stars;
}

function showToast(message, type) {
    // Remove existing toast
    $('.custom-toast').remove();
    
    const icons = { success: 'fa-check-circle', warning: 'fa-exclamation-triangle', error: 'fa-times-circle', info: 'fa-info-circle' };
    const colors = { success: '#43e97b', warning: '#f7c948', error: '#f5576c', info: '#4facfe' };
    
    const toast = $(`
        <div class="custom-toast" style="position:fixed;bottom:30px;right:30px;z-index:99999;background:rgba(15,20,50,0.95);border:1px solid ${colors[type] || colors.info};border-radius:12px;padding:16px 24px;color:#fff;display:flex;align-items:center;gap:12px;animation:slideInRight .3s ease;backdrop-filter:blur(10px);box-shadow:0 8px 32px rgba(0,0,0,0.3);max-width:400px;">
            <i class="fas ${icons[type] || icons.info}" style="color:${colors[type] || colors.info};font-size:1.2rem;"></i>
            <span>${message}</span>
        </div>
    `);
    
    $('body').append(toast);
    setTimeout(() => toast.fadeOut(300, function() { $(this).remove(); }), 3000);
}

// Add slide-in animation
if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = '@keyframes slideInRight{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}';
    document.head.appendChild(style);
}

// ============================================
// COURSE DETAIL PAGE INIT
// ============================================
function initCourseDetail() {
    if (!$('#courseTitle').length) return; // Only run on course detail page

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get("id"));

    if (!courseId) {
        window.location.href = "khoa-hoc.html";
        return;
    }

    const course = courses.find((c) => c.id === courseId);
    if (!course) {
        $("#courseTitle").html("Không tìm thấy khóa học");
        return;
    }

    document.title = course.title + " - TechLearn";
    $("#breadcrumbTitle").text(course.title);
    $("#courseTitle").text(course.title);
    const categoryMap = {
        frontend: { role: "Frontend Developer", field: "Frontend" },
        backend: { role: "Backend Developer", field: "Backend" },
        fullstack: { role: "Fullstack Developer", field: "Fullstack" },
        ai: { role: "AI/ML Engineer", field: "AI/Data Science" },
        basic: { role: "Lập trình viên", field: "Lập trình cơ bản" }
    };
    const { role: roleName, field: fieldName } = categoryMap[course.category] || categoryMap.basic;

    let heroDescHtml = `
        Bạn đang tìm kiếm lộ trình để trở thành <strong>${roleName} chuyên nghiệp</strong>? Khóa học <strong>${course.title}</strong> được thiết kế bám sát nhu cầu tuyển dụng hiện tại, giúp bạn không chỉ biết code mà còn làm được việc.<br><br>
        <span>🎯 <strong>Yêu cầu đầu vào:</strong> Khóa học đi từ ${course.level.toLowerCase()}. Bạn không cần nền tảng trước &ndash; chỉ cần chăm chỉ, chủ động học hỏi và sẵn sàng đặt câu hỏi trong quá trình học.</span><br>
        <span class="mt-2 d-inline-block">🤖 <strong>Học ${fieldName} kết hợp AI đúng cách:</strong> Bạn sẽ được hướng dẫn cách sử dụng AI để hỗ trợ lập trình (Phân tích yêu cầu, sinh code nhanh, debug và tối ưu) nhưng vẫn đảm bảo hiểu rõ logic và kiểm soát hoàn toàn code, không phụ thuộc vào AI.</span>
    `;
    $("#courseDesc").html(heroDescHtml);
    $("#courseRating").text(course.rating);
    $("#courseReviews").text(course.reviews);
    $("#courseStudents").text(course.students);
    if (course.rating < 4.8) {
        $("#courseBestseller").hide();
    }

    $("#sidebarTitle").text(course.title.toUpperCase());
    $("#sidebarIcon").attr("class", course.icon + " sidebar-icon");
    $("#sidebarImageBg").css("background", course.color);
    $("#dynamicHeaderBg").addClass("course-detail-light-hero");

    $("#coursePrice").text(formatPrice(course.price));
    $("#courseOriginalPrice").text(formatPrice(course.originalPrice));

    if (course.price === 0) {
        $("#coursePrice").text("Miễn Phí");
        $("#courseOriginalPrice").hide();
        $("#courseDiscount").hide();
    } else {
        const discount = Math.round((1 - course.price / course.originalPrice) * 100);
        $("#courseDiscount").text("-" + discount + "%");
    }

    $("#courseStartDate").text(course.startDate || "Đang cập nhật");
    $("#courseSchedule").text(course.schedule || "Đang cập nhật");
    $("#courseTime").text(course.time || "Đang cập nhật");
    $("#courseLessons").text(course.lessons || "0");
    $("#courseInstructor").text(course.instructor || "TechLearn Team");

    let overviewHtml = `<div id="overviewTextContainer" style="max-height: 250px; overflow: hidden; position: relative; transition: max-height 0.4s ease-in-out;">
            <h5 class="fw-bold mb-3 d-flex align-items-center gap-2" style="color: #0b1c3b;">🔥 Khóa Học ${course.title} – Từ Zero đến Hero 🔥</h5>
            <p class="text-secondary" style="font-size: 1rem; line-height: 1.6; margin-bottom: 20px;">Bạn đang tìm kiếm lộ trình để trở thành <strong style="color: #334155;">Backend Developer chuyên nghiệp</strong>? Khóa học <strong style="color: #334155;">Backend NodeJS 2026</strong> được thiết kế giúp bạn đi từ nền tảng đến thực chiến, sẵn sàng tham gia vào các dự án thực tế.</p>
            
            <p class="text-secondary mb-2" style="line-height: 1.6;">🎯 <strong style="color: #334155;">Yêu cầu đầu vào:</strong> Khóa học bắt đầu từ cơ bản đến nâng cao. Bạn không cần nền tảng trước – chỉ cần chăm chỉ, chủ động học hỏi và không ngại đặt câu hỏi trong suốt quá trình học.</p>
            
            <p class="text-secondary mb-2" style="line-height: 1.6;">🤖 <strong style="color: #334155;">Học Backend kết hợp AI đúng cách:</strong> Không chỉ học code, bạn còn được hướng dẫn cách tận dụng AI trong lập trình:</p>
            <ul class="text-secondary" style="line-height: 1.8; margin-bottom: 25px;">
                <li>Phân tích yêu cầu và thiết kế API nhanh hơn</li>
                <li>Sinh code, debug và tối ưu hiệu quả</li>
                <li>Tăng tốc quá trình phát triển nhưng vẫn kiểm soát logic</li>
                <li>👉 Làm chủ AI như một công cụ hỗ trợ, không phụ thuộc vào AI</li>
            </ul>
            
            <p class="text-secondary mb-2" style="line-height: 1.6;">📌 <strong style="color: #334155;">Thông tin khóa học:</strong></p>
            <ul class="text-secondary" style="line-height: 1.8; margin-bottom: 25px;">
                <li>📚 <strong style="color: #334155;">Số lượng bài học:</strong> 54 bài (25% lý thuyết - 75% thực hành)</li>
                <li>⏳ <strong style="color: #334155;">Thời gian học:</strong> 5 tháng</li>
                <li>🛠️ <strong style="color: #334155;">Số lượng dự án:</strong> 2 dự án lớn (sát thực tế)</li>
                <li>💻 <strong style="color: #334155;">Hình thức học:</strong> Online qua Zoom (tương tác trực tiếp)</li>
                <li>🗓️ <strong style="color: #334155;">Lịch học:</strong> 3 buổi / tuần (2 giờ / buổi)</li>
            </ul>
            
            <p class="text-secondary mb-2" style="line-height: 1.6;">🚀 <strong style="color: #334155;">Sau khóa học, bạn có thể:</strong></p>
            <ul class="text-secondary" style="line-height: 1.8; margin-bottom: 25px;">
                <li>Xây dựng API và xử lý dữ liệu backend</li>
                <li>Tham gia dự án thực tế</li>
                <li>Sử dụng AI để tăng tốc công việc nhưng vẫn kiểm soát code</li>
                <li>Tự tin ứng tuyển vị trí <strong style="color: #334155;">Fresher Backend Developer</strong></li>
            </ul>
            
            <p class="mb-0 text-secondary" style="line-height: 1.6;">👉 <strong style="color: #334155;">Đăng ký ngay để làm chủ Backend NodeJS và bắt kịp xu hướng lập trình với AI! 🚀</strong></p>
            
            <div id="overviewGradient" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 90px; background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 90%);"></div>
        </div>
        <div class="mt-3 text-start">
            <a href="javascript:void(0)" id="toggleOverviewBtn" class="text-decoration-none fw-bold d-flex justify-content-between align-items-center" style="color: #0b1c3b; font-size: 1.05rem;">
                <span>Xem Thêm</span> <i class="fas fa-chevron-down text-primary"></i>
            </a>
        </div>`;

    $("#overviewContent").html(overviewHtml);

    $(document)
        .off("click", "#toggleOverviewBtn")
        .on("click", "#toggleOverviewBtn", function (e) {
            e.preventDefault();
            const container = $("#overviewTextContainer");
            const gradient = $("#overviewGradient");
            if (container.hasClass("expanded")) {
                container
                    .removeClass("expanded")
                    .css("max-height", "250px");
                gradient.fadeIn(300);
                $(this).html('<span>Xem Thêm</span> <i class="fas fa-chevron-down text-primary"></i>');
                $("html, body").animate({ scrollTop: $("#section-overview").offset().top - 120 }, 300);
            } else {
                container
                    .addClass("expanded")
                    .css("max-height", container[0].scrollHeight + 50 + "px");
                gradient.fadeOut(300);
                $(this).html('<span>Ẩn Bớt</span> <i class="fas fa-chevron-up text-primary"></i>');
            }
        });
        
    let curriculumHtml = "";
    const emojis = ["🧱", "🧩", "⚙️", "👾", "📱", "🧠", "🔨", "💼"];
    course.curriculum.forEach((item, index) => {
        const emoji = emojis[index % emojis.length];
        curriculumHtml += `
        <div class="accordion-item bg-white border-0 border-bottom" style="border-radius: 0 !important; border-bottom-color: #f1f5f9 !important;">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed px-3 py-4 fw-bold bg-white shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" style="color: #0f172a; font-size: 1.05rem;" onmousedown="this.style.outline='none'">
                    ${emoji} Giai đoạn ${index + 1}: ${item}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#curriculumAccordion">
                <div class="accordion-body px-4 py-3 bg-white border-0">
                    <div style="border: 1px dashed #bae6fd; border-radius: 8px; padding: 14px 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; color: #0284c7; font-weight: 600; font-size: 0.95rem; background-color: #f0f9ff;">
                        <i class="far fa-play-circle fs-5"></i> Bài giảng chi tiết nền tảng ${item}
                    </div>
                    <div style="border: 1px dashed #bae6fd; border-radius: 8px; padding: 14px 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; color: #0284c7; font-weight: 600; font-size: 0.95rem; background-color: #f0f9ff;">
                        <i class="far fa-play-circle fs-5"></i> Thực hành bài tập nhóm bài ${index + 1}
                    </div>
                </div>
            </div>
        </div>`;
    });
    $("#curriculumAccordion").html(curriculumHtml);
    
    function buildGridData(cat, role, field) {
        const gridMap = {
            frontend: {
                reasons: [
                    { i: "📊", t: "📈 Nhu cầu tuyển dụng Frontend Developer cực cao", desc: `Doanh nghiệp luôn cần ${role} có khả năng xây dựng giao diện chuyên nghiệp, responsive và tối ưu trải nghiệm người dùng.` },
                    { i: "👨‍🏫", t: "👨‍💻 Học đúng xu hướng Frontend 2026", desc: `Nắm bắt công nghệ ${field} hiện đại, component-based architecture và các best practices mới nhất trong ngành.` },
                    { i: "🧠", t: "🤖 Kết hợp AI để tăng tốc phát triển UI", desc: "Sử dụng AI để sinh code nhanh, debug layout, tối ưu CSS và tạo component hiệu quả hơn gấp nhiều lần." },
                    { i: "📖", t: "🎨 Tư duy thiết kế UI/UX chuyên nghiệp", desc: "Hiểu nguyên tắc thiết kế, responsive design, accessibility và cách biến bản Figma thành code pixel-perfect." }
                ],
                goals: [
                    { i: "💻", t: `🚀 Trở thành ${role} – Junior Ready`, desc: `Tự tin xây dựng giao diện web hoàn chỉnh, responsive và tối ưu. Sẵn sàng tham gia dự án thực tế ngay sau khóa học.` },
                    { i: "🧱", t: `🧱 Nền tảng ${field} vững chắc`, desc: `Hiểu sâu HTML, CSS, JavaScript và framework ${field}. Dễ dàng tiếp cận công nghệ mới và phát triển lên Mid-level.` },
                    { i: "🧠", t: "🧠 Tư duy component & state management", desc: "Thiết kế component tái sử dụng, quản lý state hiệu quả, tối ưu performance cho ứng dụng web hiện đại." },
                    { i: "🤖", t: "🤖 Thành thạo AI & Vibe Coding", desc: "Viết prompt hiệu quả để sinh UI nhanh, debug layout, tối ưu code. Làm chủ AI như công cụ hỗ trợ." }
                ],
                audience: [
                    { i: "👨‍🎓", t: "🎓 Sinh viên CNTT muốn đi làm sớm", desc: `Học đúng trọng tâm ${field}, có portfolio thực tế để tự tin ứng tuyển vị trí ${role}.` },
                    { i: "🔄", t: "♻️ Người trái ngành chuyển sang IT", desc: `Frontend là điểm khởi đầu lý tưởng – nhìn thấy kết quả trực quan, dễ motivation và có lộ trình rõ ràng.` },
                    { i: "💻", t: "👩‍💻 Người muốn nâng cấp kỹ năng Frontend", desc: `Đã biết HTML/CSS cơ bản, muốn học thêm framework hiện đại và cách làm việc chuẩn doanh nghiệp.` },
                    { i: "🤔", t: "🧭 Người muốn xây dựng sản phẩm cá nhân", desc: "Muốn tự tay code landing page, portfolio, hoặc web app cá nhân mà không cần phụ thuộc ai." }
                ]
            },
            backend: {
                reasons: [
                    { i: "📊", t: "📈 Nhu cầu thực tế – doanh nghiệp cần người làm được việc", desc: `Junior ${role} cần có khả năng thiết kế API, xử lý dữ liệu và tham gia dự án ngay.` },
                    { i: "👨‍🏫", t: "👨‍💻 Học đúng xu hướng Backend 2026", desc: `Cập nhật công nghệ ${field} hiện đại: RESTful API, Authentication, Database Design và Cloud Deployment.` },
                    { i: "🧠", t: "🤖 Biết dùng AI để code nhanh & hiệu quả", desc: "Kết hợp AI vào lập trình: phân tích yêu cầu, sinh code, debug và tối ưu. Đây là kỹ năng bắt buộc của lập trình viên hiện đại." },
                    { i: "📖", t: "🧩 Tư duy hệ thống – làm được dự án thực tế", desc: "Biết chia module, thiết kế luồng dữ liệu, xử lý lỗi và tối ưu logic như trong dự án thật." }
                ],
                goals: [
                    { i: "💻", t: `🚀 Trở thành ${role} – Junior Ready`, desc: `Sẵn sàng tham gia dự án thực tế ngay, không cần intern. Hiểu rõ vai trò trong team và tự tin khi nhận task từ Leader.` },
                    { i: "🧱", t: `🧱 Nền tảng Backend vững chắc – học một lần, dùng lâu dài`, desc: `Hiểu rõ bản chất ${field}. Dễ dàng phát triển lên Mid-level. Không bị phụ thuộc khi framework thay đổi.` },
                    { i: "🧠", t: "🧠 Tư duy & quy trình làm việc chuẩn doanh nghiệp", desc: "Xây dựng code theo module rõ ràng. Thành thạo debug, xử lý lỗi và tối ưu code. Làm việc hiệu quả với Git, teamwork." },
                    { i: "🤖", t: "🤖 Thành thạo AI & Vibe Coding", desc: "Viết prompt hiệu quả. Biết tận dụng AI để phân tích yêu cầu, sinh code nhanh, debug và tối ưu." }
                ],
                audience: [
                    { i: "👨‍🎓", t: "🎓 Sinh viên CNTT muốn đi làm sớm", desc: `Học đúng trọng tâm, có nền tảng thực chiến để tự tin ứng tuyển vị trí ${role}.` },
                    { i: "🔄", t: "♻️ Người trái ngành chuyển sang IT", desc: `Nghiêm túc theo đuổi lập trình ${field}, cần lộ trình rõ ràng từ nền tảng đến khi làm được việc.` },
                    { i: "💻", t: "👩‍💻 Người có định hướng trở thành Fullstack Developer", desc: `Đã có kiến thức Frontend, muốn hoàn thiện kỹ năng ${field} để tham gia dự án thực tế.` },
                    { i: "🤔", t: "🧭 Người học IT nhưng chưa rõ định hướng", desc: "Cần hiểu rõ thị trường, phân biệt Frontend – Backend – Fullstack để lựa chọn lộ trình phù hợp." }
                ]
            },
            fullstack: {
                reasons: [
                    { i: "📊", t: "📈 Fullstack Developer – vị trí được săn đón nhất", desc: `${role} có thể đảm nhận cả Frontend lẫn Backend, giúp doanh nghiệp tiết kiệm chi phí và tăng tốc phát triển.` },
                    { i: "👨‍🏫", t: "👨‍💻 Nắm trọn bộ kỹ năng Web 2026", desc: `Học ${field} từ giao diện đến server, database, deployment – đủ để tự xây dựng sản phẩm hoàn chỉnh.` },
                    { i: "🧠", t: "🤖 AI giúp bạn code nhanh hơn x10", desc: "Kết hợp AI để sinh code cả Frontend và Backend, debug nhanh chóng và tối ưu toàn bộ hệ thống." },
                    { i: "📖", t: "🧩 Tư duy kiến trúc hệ thống end-to-end", desc: "Hiểu cách các thành phần kết nối: Client ↔ API ↔ Database ↔ Cloud. Thiết kế hệ thống đúng chuẩn." }
                ],
                goals: [
                    { i: "💻", t: `🚀 Trở thành ${role} – tự xây dựng sản phẩm hoàn chỉnh`, desc: "Từ thiết kế UI, xây dựng API, quản lý database đến deploy lên cloud – bạn làm được tất cả." },
                    { i: "🧱", t: "🧱 Kiến thức toàn diện Frontend + Backend", desc: `Hiểu sâu cả hai phía. Dễ dàng đảm nhận bất kỳ task nào trong dự án và phát triển sự nghiệp linh hoạt.` },
                    { i: "🧠", t: "🧠 Tư duy DevOps & triển khai sản phẩm", desc: "Biết cách deploy, monitor và scale ứng dụng. Làm việc với Docker, CI/CD và cloud services." },
                    { i: "🤖", t: "🤖 Thành thạo AI & Vibe Coding", desc: "Dùng AI để tăng tốc phát triển cả Frontend và Backend. Viết prompt hiệu quả, kiểm soát chất lượng code." }
                ],
                audience: [
                    { i: "👨‍🎓", t: "🎓 Sinh viên muốn trở thành Fullstack Developer", desc: `Muốn có bộ kỹ năng toàn diện để ứng tuyển vị trí ${role} với mức lương hấp dẫn.` },
                    { i: "🔄", t: "♻️ Frontend/Backend Developer muốn nâng cấp", desc: "Đã thành thạo một phía, muốn mở rộng kỹ năng để trở thành Fullstack và tăng giá trị bản thân." },
                    { i: "💻", t: "👩‍💻 Người muốn tự làm sản phẩm riêng", desc: "Startup, freelance hoặc side project – Fullstack giúp bạn tự tay xây dựng mọi thứ từ A đến Z." },
                    { i: "🤔", t: "🧭 Người muốn tối ưu career path", desc: "Fullstack Developer có cơ hội thăng tiến lên Tech Lead, Solution Architect hoặc CTO." }
                ]
            },
            ai: {
                reasons: [
                    { i: "📊", t: "📈 AI/ML – lĩnh vực có mức lương cao nhất ngành IT", desc: `${role} đang được trả lương top đầu thị trường. Nhu cầu tuyển dụng tăng trưởng mạnh mỗi năm.` },
                    { i: "👨‍🏫", t: "👨‍💻 Nắm bắt xu hướng AI 2026", desc: `Học ${field} với các mô hình và công cụ mới nhất: Transformers, LLMs, RAG và AI Agents.` },
                    { i: "🧠", t: "🧬 Tư duy phân tích dữ liệu chuyên sâu", desc: "Biết cách thu thập, xử lý, phân tích dữ liệu và rút ra insights có giá trị cho doanh nghiệp." },
                    { i: "📖", t: "🧩 Ứng dụng AI vào bài toán thực tế", desc: "Không chỉ học lý thuyết – bạn sẽ xây dựng các mô hình AI giải quyết vấn đề kinh doanh thực tế." }
                ],
                goals: [
                    { i: "💻", t: `🚀 Trở thành ${role} – sẵn sàng đi làm`, desc: "Xây dựng, huấn luyện và triển khai mô hình AI/ML. Tự tin tham gia dự án Data Science thực tế." },
                    { i: "🧱", t: `🧱 Nền tảng ${field} vững chắc`, desc: "Hiểu rõ toán học, thống kê và thuật toán đằng sau các mô hình. Không chỉ biết dùng mà hiểu bản chất." },
                    { i: "🧠", t: "🧠 Tư duy giải quyết vấn đề bằng dữ liệu", desc: "Biết chọn mô hình phù hợp, đánh giá kết quả và tối ưu performance cho từng bài toán cụ thể." },
                    { i: "🤖", t: "🤖 Thành thạo công cụ AI hiện đại", desc: "Sử dụng Python, TensorFlow/PyTorch, Jupyter và các thư viện Data Science phổ biến nhất." }
                ],
                audience: [
                    { i: "👨‍🎓", t: "🎓 Sinh viên CNTT/Toán muốn vào ngành AI", desc: `Có nền tảng logic, muốn phát triển sự nghiệp trong lĩnh vực ${field} đầy tiềm năng.` },
                    { i: "🔄", t: "♻️ Developer muốn chuyển sang AI/Data", desc: "Đã có kỹ năng lập trình, muốn mở rộng sang AI/ML để tăng giá trị và mức lương." },
                    { i: "💻", t: "👩‍💻 Người làm phân tích dữ liệu", desc: "Muốn nâng cấp từ phân tích truyền thống lên Machine Learning và AI để tạo ra dự đoán chính xác hơn." },
                    { i: "🤔", t: "🧭 Người đam mê công nghệ AI", desc: "Muốn hiểu AI hoạt động như thế nào và tự tay xây dựng các ứng dụng AI thông minh." }
                ]
            },
            basic: {
                reasons: [
                    { i: "📊", t: "📈 Nền tảng quyết định tốc độ phát triển", desc: "Hiểu đúng kiến thức cơ bản giúp bạn học nhanh hơn, debug hiệu quả hơn và viết code chất lượng hơn." },
                    { i: "👨‍🏫", t: "👨‍💻 Lộ trình rõ ràng cho người mới", desc: "Không cần biết gì trước – khóa học dẫn dắt bạn từng bước từ zero đến khi tự tin viết code." },
                    { i: "🧠", t: "🤖 Tư duy lập trình – kỹ năng cốt lõi", desc: "Học cách phân tích vấn đề, chia nhỏ task và giải quyết bằng code. Đây là kỹ năng dùng cả đời." },
                    { i: "📖", t: "🧩 Chuẩn bị sẵn sàng cho mọi lộ trình", desc: "Dù bạn chọn Frontend, Backend, Fullstack hay AI – nền tảng vững sẽ giúp bạn tiến nhanh hơn." }
                ],
                goals: [
                    { i: "💻", t: "🚀 Tự tin viết code và giải bài tập", desc: "Hiểu rõ biến, hàm, vòng lặp, mảng và các cấu trúc dữ liệu cơ bản. Tự giải được các bài tập lập trình." },
                    { i: "🧱", t: "🧱 Nền tảng tư duy logic vững chắc", desc: "Rèn luyện tư duy phân tích, algorithmic thinking – kỹ năng quan trọng nhất của lập trình viên." },
                    { i: "🧠", t: "🧠 Hiểu cách máy tính hoạt động", desc: "Nắm được kiến thức Computer Science cơ bản: bộ nhớ, xử lý dữ liệu, networking để code hiệu quả hơn." },
                    { i: "🤖", t: "🤖 Biết cách sử dụng AI hỗ trợ học tập", desc: "Học cách dùng AI để hỗ trợ giải bài tập, hiểu concept mới và tăng tốc quá trình học lập trình." }
                ],
                audience: [
                    { i: "👨‍🎓", t: "🎓 Sinh viên năm nhất CNTT", desc: "Cần một khóa học nền tảng vững chắc để bắt kịp chương trình đại học và có lợi thế ngay từ đầu." },
                    { i: "🔄", t: "♻️ Người hoàn toàn mới bắt đầu", desc: "Chưa biết gì về lập trình nhưng muốn tìm hiểu nghiêm túc. Khóa học đi từ zero, không bỏ sót ai." },
                    { i: "💻", t: "👩‍💻 Người muốn thử sức với lập trình", desc: "Tò mò về code, muốn trải nghiệm xem lập trình có phù hợp với mình không trước khi đầu tư sâu." },
                    { i: "🤔", t: "🧭 Người cần định hướng nghề nghiệp IT", desc: "Muốn hiểu tổng quan ngành IT, các vai trò Developer và chọn lộ trình phù hợp với bản thân." }
                ]
            }
        };

        const data = gridMap[cat] || gridMap.basic;
        return [
            { t: "Lý do bạn nên học", d: data.reasons },
            { t: "Mục tiêu khóa học", mt: "mt-5", d: data.goals },
            { t: "Đối tượng tham gia", mt: "mt-5", d: data.audience }
        ];
    }

    const gridData = buildGridData(course.category, roleName, fieldName);

    let benefitsHtml = "";
    gridData.forEach((section) => {
        benefitsHtml += `<div class="${section.mt || "mb-5"}">
                <h4 class="fw-bold mb-4 pb-3" style="color: #0f172a; border-bottom: 1px solid #f1f5f9;">${section.t}</h4>
                <div class="row g-4">`;

        section.d.forEach((item, idx) => {
            benefitsHtml += `
                <div class="col-md-6">
                    <div class="p-4 bg-white h-100 position-relative overflow-hidden shadow-sm" style="border: 1px solid #e2e8f0; border-radius: 12px; transition: transform 0.3s ease;">
                        <div style="position: absolute; top: 10px; right: 20px; font-size: 80px; font-weight: 800; color: #f8fafc; line-height: 1; z-index: 0; user-select: none;">${idx + 1}</div>
                        <div class="position-relative z-1">
                            <div class="mb-3" style="font-size: 2.5rem; line-height: 1; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">${item.i}</div>
                            <h6 class="fw-bold mb-3" style="color: #1e293b; font-size: 1.1rem; line-height: 1.5;">${item.t}</h6>
                            <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">${item.desc}</p>
                        </div>
                    </div>
                </div>`;
        });
        benefitsHtml += `</div></div>`;
    });
    $("#benefitsContent").html(benefitsHtml);

    // Initialize Countdown Timer
    (function () {
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const COUNTDOWN_MS = 17 * 24 * 60 * 60 * 1000
            + 6 * 60 * 60 * 1000
            + 20 * 60 * 1000
            + 6 * 1000;
        const target = new Date().getTime() + COUNTDOWN_MS;

        function update() {
            const distance = target - new Date().getTime();

            if (distance <= 0) {
                daysEl.textContent = "00";
                hoursEl.textContent = "00";
                minutesEl.textContent = "00";
                secondsEl.textContent = "00";
                clearInterval(timer);
                return;
            }

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = String(d).padStart(2, "0");
            hoursEl.textContent = String(h).padStart(2, "0");
            minutesEl.textContent = String(m).padStart(2, "0");
            secondsEl.textContent = String(s).padStart(2, "0");
        }

        update();
        const timer = setInterval(update, 1000);
    })();
}

