# SQL Workshop - School Management System

מיני-פרויקט של בית ספר עם דאטהבייס מתפקד

## התקנה והגדרה

### 1. התקנת תלויות
```bash
npm install
```

### 2. הגדרת מסד הנתונים

צרו מסד נתונים MySQL בשם `school_db` (או שנה את השם ב-`db/connection.js`).

אפשר גם להגדיר משתני סביבה:
```bash
export DB_HOST=localhost
export DB_USER=root
export DB_PASSWORD=your_password
export DB_NAME=school_db
```

### 3. יצירת הטבלאות

הרצת הסקריפט ליצירת הטבלאות:
```bash
node scripts/createTables.js
```

סקריפט זה:
- קורא את כל קבצי ה-JSON מתיקיית `entities/`
- יוצר את הטבלאות במסד הנתונים
- מוסיף foreign keys אוטומטית

### 4. הכנסת מנהלים ראשוניים

לאחר יצירת הטבלאות, הכניסו לפחות שני בתי ספר ידנית, ואז הרצו:
```bash
node scripts/insertAdmins.js
```

או הכניסו ידנית:
```sql
INSERT INTO schools (name, school_code) VALUES 
  ('בית ספר א', 'SCH001'),
  ('בית ספר ב', 'SCH002');

INSERT INTO admins (name, password, school_id) VALUES 
  ('מנהל אחד', 'admin123', 1),
  ('מנהל שני', 'admin456', 2);
```

## הרצת השרת

```bash
npm start
```

השרת ירוץ על פורט 3000 (או הפורט שמוגדר ב-`PORT`).

## API Endpoints

### CRUD Operations

#### Schools
- `POST /schools` - הוספת בית ספר (דורש admin_id ב-body)
  ```json
  {
    "admin_id": 1,
    "name": "בית ספר חדש",
    "school_code": "SCH003"
  }
  ```

#### Teachers
- `POST /teachers` - הוספת מורה
  ```json
  {
    "name": "מורה חדש",
    "password": "password123",
    "email": "teacher@example.com"
  }
  ```
- `PUT /teachers/:id` - עדכון מורה
  ```json
  {
    "name": "שם מעודכן",
    "email": "newemail@example.com"
  }
  ```

#### Classrooms
- `POST /classrooms` - הוספת כיתה
  ```json
  {
    "grade": 5,
    "index": 1,
    "teacher_id": 1
  }
  ```

#### Students
- `POST /students` - הוספת תלמיד
  ```json
  {
    "name": "תלמיד חדש",
    "password": "password123",
    "classroom_id": 1
  }
  ```
- `DELETE /students/:id` - מחיקת תלמיד

### Query Endpoints

- `GET /queries/all-students` - הצגת כל שמות התלמידים
- `GET /queries/schools-with-admins` - הצגת רשימת בתי הספר ושמות המנהלים שלהם
- `GET /queries/students-by-school-classroom?school_code=SCH001&grade=5&index=1` - הצגת כל שמות התלמידים לפי קוד בית ספר וכיתה

## מבנה הטבלאות

### schools
- id (INT PRIMARY KEY AUTO_INCREMENT)
- name (VARCHAR(255))
- school_code (VARCHAR(50) UNIQUE)

### teachers
- id (INT PRIMARY KEY AUTO_INCREMENT)
- name (VARCHAR(255))
- password (VARCHAR(255))
- email (VARCHAR(255) UNIQUE)

### classrooms
- id (INT PRIMARY KEY AUTO_INCREMENT)
- grade (INT)
- index (INT)
- teacher_id (INT) - Foreign Key → teachers(id)

### students
- id (INT PRIMARY KEY AUTO_INCREMENT)
- name (VARCHAR(255))
- password (VARCHAR(255))
- classroom_id (INT) - Foreign Key → classrooms(id)

### admins
- id (INT PRIMARY KEY AUTO_INCREMENT)
- name (VARCHAR(255))
- password (VARCHAR(255))
- school_id (INT) - Foreign Key → schools(id)

## הערות

- כל הטבלאות נוצרות עם foreign keys אוטומטית
- האימות למנהלים מתבצע באמצעות admin_id
- בפרודקשן, יש להצפין סיסמאות (hash passwords)

