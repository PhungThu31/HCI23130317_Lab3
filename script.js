// Hàm thực hiện tìm kiếm
const performSearch = () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    alert('Bạn đã tìm kiếm: ' + query);
    // Thực hiện logic tìm kiếm nâng cao ở đây (có thể là lọc danh sách môn học hoặc dữ liệu khác)
};

// Lấy tham số từ URL
const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

// Dữ liệu mẫu cho môn học
const subjectsData = {
    monhoc1: {
        name: 'Lập trình cơ bản',
        lectures: [
            { id: 1, title: 'How to Design Program 1', content: 'Giảng viên: Nguyễn Đức Công Song', pdfUrl: '1-How to Design Program.pdf' },
            { id: 2, title: 'Methods for Classes', content: 'Giảng viên: Nguyễn Đức Công Song', pdfUrl: '2-Methods for Classes.pdf' }
        ],
        exercises: [
            { id: 3, title: 'Bài tập 1', content: 'Class & Containment', pdfUrl: 'Excercise1-Class & Containment.pdf' },
            { id: 4, title: 'Bài tập 2', content: 'Class Methods', pdfUrl: 'Excercise2-Class Methods.pdf' }
        ],
        references: [
            { id: 5, title: 'Tài liệu tham khảo 1', content: '', pdfUrl: '' },
            { id: 6, title: 'Tài liệu tham khảo 2', content: '', pdfUrl: '' }
        ],
    },
    monhoc2: {
        name: 'Cấu trúc dữ liệu',
        lectures: [
            { id: 1, title: 'How to Design Program 1', content: 'Giảng viên: Nguyễn Đức Công Song', pdfUrl: 'DS1_Pass_by_value_reference.pdf' },
            { id: 2, title: 'Methods for Classes', content: 'Giảng viên: Nguyễn Đức Công Song', pdfUrl: 'DS2_Recursion.pdf' }
        ],
        exercises: [
            { id: 3, title: 'Bài tập 1', content: 'Class & Containment', pdfUrl: 'DS_Lab 1_1D Arrays.pdf' },
            { id: 4, title: 'Bài tập 2', content: 'Class Methods', pdfUrl: 'DS_Lab 2_Recursion.pdf' }
        ],
        references: [
            { id: 5, title: 'Tài liệu tham khảo 1', content: 'Data Structures and Algorithms in Java6th Edition', pdfUrl: '__Data Structures and Algorithms in Java6th Edition.pdf' },
            { id: 6, title: 'Tài liệu tham khảo 2', content: 'Effective Java', pdfUrl: 'Effective Java (2017, Addison-Wesley).pdf' }
        ],
    },
    // Thêm các môn học khác nếu cần
};

// Hiển thị chi tiết môn học
const displaySubjectDetails = () => {
    const subjectKey = getURLParameter('subject');
    const subject = subjectsData[subjectKey];

    if (subject) {
        document.getElementById('subject-name').textContent = subject.name;

        // Hiển thị danh sách bài giảng
        const lecturesList = document.getElementById('lectures-list');
        lecturesList.innerHTML = '';
        subject.lectures.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" data-type="lecture" data-id="${item.id}">${item.title}</a>`;
            lecturesList.appendChild(li);
        });

        // Hiển thị danh sách bài tập
        const exercisesList = document.getElementById('exercises-list');
        exercisesList.innerHTML = '';
        subject.exercises.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" data-type="exercise" data-id="${item.id}">${item.title}</a>`;
            exercisesList.appendChild(li);
        });

        // Hiển thị danh sách tài liệu tham khảo
        const referencesList = document.getElementById('references-list');
        referencesList.innerHTML = '';
        subject.references.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" data-type="reference" data-id="${item.id}">${item.title}</a>`;
            referencesList.appendChild(li);
        });

        // Thêm sự kiện click cho các liên kết trong cột trái
        const leftColumn = document.querySelector('.left-column');
        leftColumn.addEventListener('click', (e) => {
            if (e.target && e.target.nodeName === 'A') {
                e.preventDefault();
                const type = e.target.getAttribute('data-type');
                const id = e.target.getAttribute('data-id');
                displayContent(subjectKey, type, id);
            }
        });
    } else {
        document.getElementById('subject-name').textContent = 'Môn học không tồn tại.';
    }
};

// Hiển thị nội dung tương ứng
const displayContent = (subjectKey, type, id) => {
    const subject = subjectsData[subjectKey];
    let item = null;

    if (type === 'lecture') {
        item = subject.lectures.find((i) => i.id == id);
    } else if (type === 'exercise') {
        item = subject.exercises.find((i) => i.id == id);
    } else if (type === 'reference') {
        item = subject.references.find((i) => i.id == id);
    }

    if (item) {
        const contentDisplay = document.querySelector('.content-display');
        contentDisplay.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.content}</p>
        `;

        // Hiển thị tệp PDF nếu có đường dẫn PDF
        if (item.pdfUrl) {
            contentDisplay.innerHTML += `
                <embed src="${item.pdfUrl}" type="application/pdf" width="100%" height="600px" />
            `;
        }
    }
};

// Xác nhận hành động
const confirmAction = (message) => {
    return confirm(message);
};

// Hàm xóa (với xác nhận)
const deleteItem = (itemId) => {
    if (confirmAction('Bạn có chắc chắn muốn xóa mục này?')) {
        // Thực hiện logic xóa ở đây
        alert('Mục đã được xóa.');
    }
};

// Xử lý dropdown menu và hiệu ứng hover
document.addEventListener('DOMContentLoaded', () => {
    // Dropdown
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
        dropdown.addEventListener('mouseover', () => {
            this.querySelector('.dropdown-content').style.display = 'block';
        });
        dropdown.addEventListener('mouseout', () => {
            this.querySelector('.dropdown-content').style.display = 'none';
        });
    });

    // Hiển thị chi tiết môn học nếu ở trang subject.html
    if (window.location.pathname.includes('subject.html')) {
        displaySubjectDetails();
    }

    // Thêm sự kiện tìm kiếm
    document.getElementById('search-button').addEventListener('click', performSearch);
});
// Hàm quay lại trang chủ
const goBackToHome = () => {
    window.location.href = 'index.html';
};

// Thêm sự kiện click cho nút quay lại
document.getElementById('back-button').addEventListener('click', goBackToHome);