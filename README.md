# نشر موقع مستودع الأكواد إلى خدمة سحابية

## المطلوب
- ملف `app.py` يعمل كخادم Flask
- ملف `requirements.txt` يحتوي على الاعتمادات
- ملف `Procfile` أو `Dockerfile` للنشر السحابي

## نشر إلى Render
1. ارفع المشروع إلى GitHub أو GitLab.
2. سجل دخول إلى https://render.com.
3. أنشئ خدمة جديدة من نوع `Web Service`.
4. اختر المستودع ثم المسار الخاص بالمشروع.
5. حدد أمر البناء:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT`
6. أضف متغير البيئة:
   - `GEMINI_API_KEY` = مفتاح Google AI Studio الخاص بك.

## نشر إلى Railway
1. سجل دخول إلى https://railway.app.
2. أنشئ مشروع جديد وارفع المستودع أو اربطه بالمستودع الموجود.
3. اضبط `Start Command` إلى:
   - `gunicorn app:app --bind 0.0.0.0:$PORT`
4. أضف متغير البيئة `GEMINI_API_KEY`.

## نشر إلى Docker-compatible service
1. استخدم الملف `Dockerfile` المضاف في المشروع.
2. يمكنك نشر إلى خدمات مثل Docker Hub، AWS ECS، أو Azure Container Apps.

## ملاحظات مهمة
- صفحة الدخول `login.html` أصبحت الصفحة الأولى، و`index.html` يعيد التوجيه تلقائياً إلى صفحة الدخول عند عدم وجود مستخدم مسجل.
- صفحة `ai.html` و `login.html` تحتاج إلى خادم باكند موجود لتسجيل الدخول بالـ Google أو اسم المستخدم المحلي.
- لتفعيل تسجيل الدخول بجوجل، اضبط `GOOGLE_CLIENT_ID` في `config.js` بعد إنشاء بيانات اعتماد OAuth في Google Cloud.
- إذا كنت تريد ربط `ai.html` بخادم خارجي بعد النشر، افتح `config.js` واضبط:
  - `const BACKEND_BASE_URL = 'https://your-backend.example.com';`

## نشر الواجهة على GitHub Pages
1. ثبت Git أو استخدم GitHub Desktop إذا لم يكن مثبتاً.
2. افتح المشروع في مجلد `c:\Users\USER10\موقعي`.
3. نفذ هذه الأوامر في PowerShell:
   - `git init`
   - `git add .`
   - `git commit -m "Initial commit for GitHub Pages"
   - `git branch -M main`
   - `git remote add origin https://github.com/<username>/<repo>.git`
   - `git push -u origin main`
4. في GitHub، اذهب إلى إعدادات المستودع → Pages.
5. اختر الفرع `main` والمجلد `root` ثم اضغط Save.
6. انتظر الرابط يظهر ثم زُر الموقع.

## ملاحظة حول GitHub Pages
- يمكن نشر الصفحات الثابتة (HTML/CSS/JS) على GitHub Pages.
- لكن `app.py` لن يعمل على GitHub Pages، لذلك تحتاج خادم باكند خارجي لتشغيل AI وتسجيل الدخول.
- بعد نشر الباكند الخارجي، ضع رابط الباكند في `config.js`.
