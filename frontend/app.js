const API_BASE_URL = 'http://localhost:3000';
let userToken = localStorage.getItem('userToken') || '';
let adminToken = localStorage.getItem('adminToken') || '';

const handleResponse = async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        alert(data.message || 'Request failed');
        throw new Error(data.message || 'Request failed');
    }
    return data;
};

// User Signup
const userSignupForm = document.getElementById('userSignupForm');
userSignupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(userSignupForm).entries());
    const res = await fetch(`${API_BASE_URL}/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    const data = await handleResponse(res);
    alert('User created');
    userSignupForm.reset();
});

// User Login
const userLoginForm = document.getElementById('userLoginForm');
userLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(userLoginForm).entries());
    const res = await fetch(`${API_BASE_URL}/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    const data = await handleResponse(res);
    userToken = data.token;
    localStorage.setItem('userToken', userToken);
    alert('User logged in');
    userLoginForm.reset();
});

// Admin Signup
const adminSignupForm = document.getElementById('adminSignupForm');
adminSignupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(adminSignupForm).entries());
    const res = await fetch(`${API_BASE_URL}/admin/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    const data = await handleResponse(res);
    alert('Admin created');
    adminSignupForm.reset();
});

// Admin Login
const adminLoginForm = document.getElementById('adminLoginForm');
adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(adminLoginForm).entries());
    const res = await fetch(`${API_BASE_URL}/admin/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    const data = await handleResponse(res);
    adminToken = data.token;
    localStorage.setItem('adminToken', adminToken);
    alert('Admin logged in');
    adminLoginForm.reset();
});

// Load Courses
const loadCoursesBtn = document.getElementById('loadCourses');
const coursesList = document.getElementById('coursesList');
loadCoursesBtn.addEventListener('click', async () => {
    const res = await fetch(`${API_BASE_URL}/course`);
    const data = await handleResponse(res);
    coursesList.innerHTML = '';
    data.data.forEach(course => {
        const li = document.createElement('li');
        li.textContent = `${course.title} - $${course.price}`;
        const purchaseBtn = document.createElement('button');
        purchaseBtn.textContent = 'Purchase';
        purchaseBtn.onclick = async () => {
            if (!userToken) { alert('Login as user first'); return; }
            const purchaseRes = await fetch(`${API_BASE_URL}/user/courses/${course._id}`, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + userToken }
            });
            await handleResponse(purchaseRes);
            alert('Course purchased');
        };
        li.appendChild(purchaseBtn);
        coursesList.appendChild(li);
    });
});

// Create Course
const createCourseForm = document.getElementById('createCourseForm');
createCourseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!adminToken) { alert('Login as admin first'); return; }
    const formData = Object.fromEntries(new FormData(createCourseForm).entries());
    formData.price = parseFloat(formData.price);
    const res = await fetch(`${API_BASE_URL}/admin/course`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + adminToken
        },
        body: JSON.stringify(formData)
    });
    await handleResponse(res);
    alert('Course created');
    createCourseForm.reset();
});
