
document.addEventListener('DOMContentLoaded', () =>
    {

  
   const studentForm = document.getElementById('studentForm');
   const studentsTableBody = document.getElementById('studentsTable').querySelector('tbody');
   const topStudent = document.getElementById('topStudent');
   const totalGrades = document.getElementById('totalGrades');
   const averageGrade = document.getElementById('averageGrade');
   const clearAllButton = document.getElementById('clearAll'); 

   let students = JSON.parse(localStorage.getItem('students')) || [];

   const updateLocalStorage = () => {
       localStorage.setItem('students', JSON.stringify(students));
   };

   const renderStudents = () => {
       studentsTableBody.innerHTML = '';
       students.forEach((student, index) => {
           const row = document.createElement('tr');
           row.innerHTML = `
               <td>${student.name}</td>
               <td>${student.age}</td>
               <td>${student.grade}</td>
           `;
           studentsTableBody.appendChild(row);
       });
   };

   const calculateStatistics = () => {
       if (students.length > 0) {
           let topStudentName = students.reduce((max, student) => student.grade > max.grade ? student : max, students[0]).name;
           let totalGradesSum = students.reduce((sum, student) => sum + student.grade, 0);
           let averageGrades = totalGradesSum / students.length;

           topStudent.textContent = `الطالب صاحب أعلى درجة: ${topStudentName}`;
           totalGrades.textContent = `مجموع درجات الطلاب: ${totalGradesSum}`;
           averageGrade.textContent = `متوسط درجات الطلاب: ${averageGrades.toFixed(2)}`;
       } else {
           topStudent.textContent = 'الطالب صاحب أعلى درجة: لا يوجد بيانات';
           totalGrades.textContent = 'مجموع درجات الطلاب: 0';
           averageGrade.textContent = 'متوسط درجات الطلاب: 0';
       }
   };

   studentForm.addEventListener('submit', (e) => {
       e.preventDefault();
       const name = document.getElementById('name').value;
       const age = document.getElementById('age').value;
       const grade = document.getElementById('grade').value;

       students.push({ name, age: parseInt(age), grade: parseInt(grade) });
       updateLocalStorage();
       renderStudents();
       calculateStatistics();
       studentForm.reset();
   });

   clearAllButton.addEventListener('click', () => {
       students = [];
       updateLocalStorage();
       renderStudents();
       calculateStatistics();
   });

   
   renderStudents();
   calculateStatistics();
});