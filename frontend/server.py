from fileinput import filename
from models import adjust_brightness,black_white,contrast
import os
import urllib.request
from werkzeug.utils import secure_filename
from flask import Flask,flash, redirect,request, render_template, url_for
app = Flask(__name__)
UPLOAD_FOLDER='static/'
app.secret_key="secret key"
app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH']=16*1024*1024

ALLOWED_EXTENSIONS=set(['png','jpg','jpeg','gif'])
def allowed_file(filename):
  return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
  return render_template('home.html')

@app.route('/my-link/')
def my_link():
  return render_template('editor.html')

@app.route('/',methods=['POST'])
def upload_image():
  if 'file' not in request.files:
    flash("No file part")
    return redirect(request.url)
  file=request.files['file']
  if file.filename=='':
    flash('No image selected for uploading')
    return redirect(request.url)
  if file and allowed_file(file.filename):
    filename=secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
    flash('Image successfully uploaded and displayed below')
    return render_template('editor.html',filename=filename)
  else:
    flash('Allowed image types are-png,jpg, jpeg, gif')
    return redirect(request.url)

@app.route('/display/<filename>')
def display_image(filename):
  return redirect(url_for('static',filename='/'+filename),code=301)

@app.route('/bright/<filename>', methods=['GET','POST'])
def bright(filename):
  adjust_brightness.brightness('static/'+ filename,0.5)
  return render_template('editor.html')

@app.route('/bw/<filename>', methods=['GET','POST'])
def bw(filename):
  black_white.black_and_white('static/'+ filename,
        'black_white_'+filename)
  return render_template('editor.html')

@app.route('/contrast/<filename>', methods=['GET','POST'])
def contrast(filename):
  contrast.adjust_contrast('static/'+ filename, 'contrast_'+filename, factor,1.7)
  return render_template('editor.html')

if __name__ == '__main__':
  app.run(debug=True)
